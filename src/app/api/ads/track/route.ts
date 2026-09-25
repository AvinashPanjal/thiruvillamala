import { NextRequest, NextResponse } from 'next/server';
import { trackAdImpression, trackAdClick } from '@/lib/data-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { adId, type } = body;

    if (!adId || !type) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    if (type === 'impression') {
      await trackAdImpression(adId);
    } else if (type === 'click') {
      await trackAdClick(adId);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to record ad event' }, { status: 500 });
  }
}
