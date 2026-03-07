import { NextResponse } from 'next/server';
import { createOtpSession, type NotifyChannel, validateContact } from '@/lib/notify-store';

export async function POST(request: Request) {
  let payload: any = null;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const channel = String(payload?.channel || '') as NotifyChannel;
  const contact = String(payload?.contact || '').trim();
  const schemeId = String(payload?.schemeId || '').trim();
  const schemeName = String(payload?.schemeName || '').trim();

  if (!channel || !contact || !schemeId || !schemeName) {
    return NextResponse.json(
      { status: 'error', message: 'channel, contact, schemeId and schemeName are required.' },
      { status: 400 }
    );
  }

  if (channel !== 'email' && channel !== 'phone') {
    return NextResponse.json(
      { status: 'error', message: 'Invalid channel. Use email or phone.' },
      { status: 400 }
    );
  }

  if (!validateContact(channel, contact)) {
    return NextResponse.json(
      { status: 'error', message: `Please enter a valid ${channel === 'email' ? 'email' : 'phone number'}.` },
      { status: 400 }
    );
  }

  const otpSession = createOtpSession({
    channel,
    contact,
    schemeId,
    schemeName,
  });

  const responseBody: any = {
    status: 'success',
    message: `OTP sent to your ${channel}.`,
    sessionId: otpSession.sessionId,
    expiresInSeconds: otpSession.expiresInSeconds,
  };

  // Demo mode visibility for hackathon/testing.
  if (process.env.NODE_ENV !== 'production') {
    responseBody.demoOtp = otpSession.otp;
  }

  return NextResponse.json(responseBody);
}
