import { NextResponse } from 'next/server';
import { addInquiry } from '@/lib/db';
import { sanitizeString, isValidIndianMobile, validateLength } from '@/lib/sanitize';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, city, requirement, message } = body;

    // 1. Presence check
    if (!name || !mobile || !requirement) {
      return NextResponse.json(
        { error: 'Name, Mobile Number, and Requirement are required.' },
        { status: 400 }
      );
    }

    // 2. Length restrictions check (Defending against payload bloating/DoS)
    if (!validateLength(name, 1, 100)) {
      return NextResponse.json({ error: 'Name must be under 100 characters.' }, { status: 400 });
    }
    if (!validateLength(mobile, 5, 20)) {
      return NextResponse.json({ error: 'Mobile number must be between 5 and 20 characters.' }, { status: 400 });
    }
    if (city && !validateLength(city, 0, 100)) {
      return NextResponse.json({ error: 'City name must be under 100 characters.' }, { status: 400 });
    }
    if (!validateLength(requirement, 1, 100)) {
      return NextResponse.json({ error: 'Requirement selection is invalid.' }, { status: 400 });
    }
    if (message && !validateLength(message, 0, 1000)) {
      return NextResponse.json({ error: 'Message must be under 1000 characters.' }, { status: 400 });
    }

    // 3. Pattern check (Valid Indian Mobile Format check)
    if (!isValidIndianMobile(mobile)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.' },
        { status: 400 }
      );
    }

    // 4. Sanitize inputs to mitigate Stored XSS
    const sanitizedName = sanitizeString(name);
    const sanitizedMobile = mobile.replace(/[\s-+]/g, ''); // strip visual separators
    const sanitizedCity = city ? sanitizeString(city) : 'Not Specified';
    const sanitizedRequirement = sanitizeString(requirement);
    const sanitizedMessage = message ? sanitizeString(message) : '';

    // Save to Database (Local Fallback or Supabase)
    const inquiry = await addInquiry({
      name: sanitizedName,
      mobile: sanitizedMobile,
      city: sanitizedCity,
      requirement: sanitizedRequirement,
      message: sanitizedMessage,
    });

    // Simulate sending email notification
    console.log(`[EMAIL SIMULATION] New inquiry received!
From: ${sanitizedName}
Mobile: ${sanitizedMobile}
City: ${sanitizedCity}
Requirement: ${sanitizedRequirement}
Message: ${sanitizedMessage}
Sent to: info@srisrinivasasilksarees.com
`);

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully. We will contact you shortly.',
      inquiry,
    });
  } catch (error: any) {
    console.error('Inquiry API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error. Please try again later.' },
      { status: 500 }
    );
  }
}
