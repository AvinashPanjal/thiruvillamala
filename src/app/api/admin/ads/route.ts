import { NextRequest, NextResponse } from 'next/server';
import { getAds, addAd, updateAd, deleteAd } from '@/lib/data-store';
import { revalidatePath } from 'next/cache';

export async function GET(req: NextRequest) {
  const placement = req.nextUrl.searchParams.get('placement') as any;
  const ads = await getAds(placement || undefined);
  return NextResponse.json(ads, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newAd = await addAd(body);

    // Revalidate Next.js page cache on Vercel
    revalidatePath('/');
    revalidatePath('/bus-search');
    revalidatePath('/admin');

    return NextResponse.json({ success: true, ad: newAd });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create ad' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: 'Ad ID required' }, { status: 400 });
    }

    const updated = await updateAd(id, data);

    // Revalidate Next.js page cache on Vercel
    revalidatePath('/');
    revalidatePath('/bus-search');
    revalidatePath('/admin');

    return NextResponse.json({ success: true, ad: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update ad' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Ad ID required' }, { status: 400 });
    }

    await deleteAd(id);

    // Revalidate Next.js page cache on Vercel
    revalidatePath('/');
    revalidatePath('/bus-search');
    revalidatePath('/admin');

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete ad' }, { status: 500 });
  }
}
