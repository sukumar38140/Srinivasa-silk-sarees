import { NextResponse } from 'next/server';
import { updateInquiryStatus, deleteInquiry } from '@/lib/db';

function verifyAuth(request: Request) {
  const passcodeHeader = request.headers.get('x-admin-passcode');
  const adminPasscode = process.env.ADMIN_PASSCODE || 'SrinivasaAdmin2026';
  return passcodeHeader === adminPasscode;
}

export async function PATCH(request: Request) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    await updateInquiryStatus(id, status);
    return NextResponse.json({ success: true, message: 'Inquiry status updated successfully' });
  } catch (error) {
    console.error('Admin Inquiry PATCH error:', error);
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
      return NextResponse.json({ error: 'Missing inquiry ID' }, { status: 400 });
    }

    await deleteInquiry(id);
    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Admin Inquiry DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
