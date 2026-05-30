import { NextResponse } from 'next/server';
import { getBanners, getCollections, getSarees, getTestimonials, getInquiries } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json();
    const adminPasscode = process.env.ADMIN_PASSCODE || 'SrinivasaAdmin2026';

    if (passcode !== adminPasscode) {
      return NextResponse.json({ error: 'Invalid admin passcode.' }, { status: 401 });
    }

    const [banners, collections, sarees, testimonials, inquiries] = await Promise.all([
      getBanners(),
      getCollections(),
      getSarees(),
      getTestimonials(),
      getInquiries(),
    ]);

    return NextResponse.json({
      success: true,
      data: { banners, collections, sarees, testimonials, inquiries }
    });
  } catch (error) {
    console.error('Admin Data Read Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
