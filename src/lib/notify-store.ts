import { randomInt, randomUUID } from 'crypto';

export type NotifyChannel = 'email' | 'phone';

interface OtpSessionInput {
  channel: NotifyChannel;
  contact: string;
  schemeId: string;
  schemeName: string;
}

interface OtpSession extends OtpSessionInput {
  id: string;
  otp: string;
  expiresAt: number;
  attempts: number;
}

interface SubscriptionRecord {
  channel: NotifyChannel;
  contact: string;
  schemeId: string;
  schemeName: string;
  subscribedAt: string;
}

const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const otpSessions = new Map<string, OtpSession>();
const subscriptions = new Map<string, SubscriptionRecord>();

function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [sessionId, session] of otpSessions.entries()) {
    if (session.expiresAt <= now) {
      otpSessions.delete(sessionId);
    }
  }
}

function makeSubscriptionKey(schemeId: string, channel: NotifyChannel, contact: string) {
  return `${schemeId}:${channel}:${contact.toLowerCase()}`;
}

export function validateContact(channel: NotifyChannel, contact: string) {
  const normalized = String(contact || '').trim();

  if (channel === 'email') {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
    return isEmail;
  }

  const digitsOnly = normalized.replace(/\D/g, '');
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

export function createOtpSession(input: OtpSessionInput) {
  cleanupExpiredSessions();

  const sessionId = randomUUID();
  const otp = String(randomInt(100000, 1000000));

  const session: OtpSession = {
    id: sessionId,
    channel: input.channel,
    contact: input.contact.trim(),
    schemeId: input.schemeId,
    schemeName: input.schemeName,
    otp,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  };

  otpSessions.set(sessionId, session);

  return {
    sessionId,
    otp,
    expiresInSeconds: Math.floor(OTP_TTL_MS / 1000),
  };
}

export function verifyOtpSession(sessionId: string, otp: string) {
  cleanupExpiredSessions();

  const session = otpSessions.get(sessionId);
  if (!session) {
    return { ok: false, message: 'OTP session expired or not found.' };
  }

  if (session.expiresAt <= Date.now()) {
    otpSessions.delete(sessionId);
    return { ok: false, message: 'OTP expired. Please request a new one.' };
  }

  session.attempts += 1;
  if (session.attempts > MAX_ATTEMPTS) {
    otpSessions.delete(sessionId);
    return { ok: false, message: 'Too many incorrect attempts. Request OTP again.' };
  }

  if (session.otp !== String(otp || '').trim()) {
    otpSessions.set(sessionId, session);
    return { ok: false, message: 'Invalid OTP. Please try again.' };
  }

  otpSessions.delete(sessionId);

  const record: SubscriptionRecord = {
    channel: session.channel,
    contact: session.contact,
    schemeId: session.schemeId,
    schemeName: session.schemeName,
    subscribedAt: new Date().toISOString(),
  };

  const subscriptionKey = makeSubscriptionKey(session.schemeId, session.channel, session.contact);
  subscriptions.set(subscriptionKey, record);

  return {
    ok: true,
    record,
    defaultMessage: `You will be notified about ${session.schemeName} on your ${session.channel}.`,
  };
}
