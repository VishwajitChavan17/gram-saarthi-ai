import { NextResponse } from 'next/server';
import { verifyOtpSession } from '@/lib/notify-store';

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

  const sessionId = String(payload?.sessionId || '').trim();
  const otp = String(payload?.otp || '').trim();

  if (!sessionId || !otp) {
    return NextResponse.json(
      { status: 'error', message: 'sessionId and otp are required.' },
      { status: 400 }
    );
  }

  const verification = verifyOtpSession(sessionId, otp);
  if (!verification.ok) {
    return NextResponse.json(
      { status: 'error', message: verification.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: 'success',
    message: 'OTP verified successfully.',
    notificationMessage: verification.defaultMessage,
    subscription: verification.record,
  });
}
