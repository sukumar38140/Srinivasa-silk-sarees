import { NextResponse } from 'next/server';
import { getTestimonials, saveTestimonials } from '@/lib/db';

function verifyAuth(request: Request) {
  const passcodeHeader = request.headers.get('x-admin-passcode');
  const adminPasscode = process.env.ADMIN_PASSCODE || 'SrinivasaAdmin2026';
  return passcodeHeader === adminPasscode;
}

export async function POST(request: Request) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, role, review, rating } = await request.json();

    if (!name || !role || !review || !rating) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const testimonials = await getTestimonials();
    const newTestimonial = {
      id: 'test_' + Math.random().toString(36).substr(2, 9),
      name,
      role,
      review,
      rating: Number(rating),
      date: new Date().toISOString().split('T')[0]
    };

    testimonials.unshift(newTestimonial);
    await saveTestimonials(testimonials);

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error('Admin Testimonial POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });
    }

    const testimonials = await getTestimonials();
    const filteredTestimonials = testimonials.filter(t => t.id !== id);

    if (testimonials.length === filteredTestimonials.length) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    await saveTestimonials(filteredTestimonials);
    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Admin Testimonial DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
