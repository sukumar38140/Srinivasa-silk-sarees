import { NextResponse } from 'next/server';
import { getSarees, saveSarees } from '@/lib/db';

// Simple authentication verification helper
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

    const { name, description, categorySlug, tags, imageUrl } = await request.json();

    if (!name || !description || !categorySlug || !imageUrl) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const sarees = await getSarees();
    const newSaree = {
      id: 'sar_' + Math.random().toString(36).substr(2, 9),
      name,
      description,
      imageUrl,
      categorySlug,
      tags: Array.isArray(tags) ? tags : [tags]
    };

    sarees.unshift(newSaree);
    await saveSarees(sarees);

    return NextResponse.json({ success: true, saree: newSaree });
  } catch (error) {
    console.error('Admin Saree POST error:', error);
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
      return NextResponse.json({ error: 'Missing saree ID' }, { status: 400 });
    }

    const sarees = await getSarees();
    const filteredSarees = sarees.filter(s => s.id !== id);
    
    if (sarees.length === filteredSarees.length) {
      return NextResponse.json({ error: 'Saree not found' }, { status: 404 });
    }

    await saveSarees(filteredSarees);
    return NextResponse.json({ success: true, message: 'Saree deleted successfully' });
  } catch (error) {
    console.error('Admin Saree DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
