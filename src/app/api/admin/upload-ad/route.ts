import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert small to medium files (< 8MB) to Data URL for 100% Vercel Serverless compatibility
    if (file.size <= 8 * 1024 * 1024) {
      const mimeType = file.type || (file.name.endsWith('.mp4') ? 'video/mp4' : 'image/png');
      const base64Data = buffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        fileName: file.name,
        size: file.size,
        isBase64: true
      });
    }

    // For larger files, attempt filesystem write if available
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'ads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const ext = path.extname(file.name) || '.png';
      const safeBaseName = file.name.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 20);
      const fileName = `ad-${Date.now()}-${safeBaseName}${ext}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({
        success: true,
        url: `/uploads/ads/${fileName}`,
        fileName
      });
    } catch (fsErr) {
      // Fallback to Data URL if filesystem write is restricted on Vercel
      const mimeType = file.type || 'image/png';
      const base64Data = buffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        fileName: file.name,
        size: file.size,
        isBase64: true
      });
    }
  } catch (error: any) {
    console.error('Vercel Ad Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
