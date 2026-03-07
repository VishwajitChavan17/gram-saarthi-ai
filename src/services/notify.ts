type NotifyChannel = 'email' | 'phone';

interface SendOtpPayload {
  channel: NotifyChannel;
  contact: string;
  schemeId: string;
  schemeName: string;
}

interface VerifyOtpPayload {
  sessionId: string;
  otp: string;
}

async function postJson(url: string, body: unknown) {
  let response: Response;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Network issue. Please try again.');
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed.');
  }

  return data;
}

export async function sendLaunchOtp(payload: SendOtpPayload) {
  return postJson('/api/notify/send-otp', payload);
}

export async function verifyLaunchOtp(payload: VerifyOtpPayload) {
  return postJson('/api/notify/verify-otp', payload);
}
