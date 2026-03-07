'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { sendLaunchOtp, verifyLaunchOtp } from '@/services/notify';

type NotifyChannel = 'email' | 'phone';

interface NotifyScheme {
  id: string;
  name: string;
}

interface NotifyLaunchModalProps {
  open: boolean;
  scheme: NotifyScheme | null;
  onClose: () => void;
}

export function NotifyLaunchModal({ open, scheme, onClose }: NotifyLaunchModalProps) {
  const [channel, setChannel] = useState<NotifyChannel>('email');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [demoOtp, setDemoOtp] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const showOtpStep = Boolean(sessionId) && !successMessage;

  const channelLabel = useMemo(
    () => (channel === 'email' ? 'Email ID' : 'Phone Number'),
    [channel]
  );

  const resetState = () => {
    setChannel('email');
    setContact('');
    setOtp('');
    setSessionId('');
    setDemoOtp('');
    setInfo('');
    setError('');
    setSuccessMessage('');
    setSending(false);
    setVerifying(false);
  };

  useEffect(() => {
    if (open) {
      resetState();
    }
  }, [open, scheme?.id]);

  if (!open || !scheme) {
    return null;
  }

  const handleSendOtp = async () => {
    setError('');
    setInfo('');
    setSending(true);

    try {
      const response = await sendLaunchOtp({
        channel,
        contact: contact.trim(),
        schemeId: scheme.id,
        schemeName: scheme.name,
      });

      setSessionId(response.sessionId || '');
      setDemoOtp(response.demoOtp || '');
      setInfo(response.message || `OTP sent to your ${channel}.`);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Could not send OTP.');
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setInfo('');
    setVerifying(true);

    try {
      const response = await verifyLaunchOtp({
        sessionId,
        otp: otp.trim(),
      });
      setSuccessMessage(
        response.notificationMessage ||
          `You will be notified about ${scheme.name} on your ${channel}.`
      );
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : 'OTP verification failed.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
        aria-label="Close notification dialog"
      />

      <Card className="relative w-full max-w-md bg-white border-none shadow-2xl shadow-black/20 rounded-3xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold">Notify Me on Launch</CardTitle>
          <p className="text-sm text-muted-foreground">
            {scheme.name}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {!showOtpStep && !successMessage ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={channel === 'email' ? 'default' : 'outline'}
                  className="rounded-xl font-semibold"
                  onClick={() => setChannel('email')}
                  disabled={sending}
                >
                  Email
                </Button>
                <Button
                  type="button"
                  variant={channel === 'phone' ? 'default' : 'outline'}
                  className="rounded-xl font-semibold"
                  onClick={() => setChannel('phone')}
                  disabled={sending}
                >
                  Phone
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{channelLabel}</label>
                <Input
                  type={channel === 'email' ? 'email' : 'tel'}
                  placeholder={channel === 'email' ? 'name@example.com' : 'Enter phone number'}
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  className="h-11 rounded-xl border-primary/10"
                  disabled={sending}
                />
              </div>

              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={sending || !contact.trim()}
                className="w-full h-11 rounded-xl font-bold"
              >
                {sending ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </>
          ) : null}

          {showOtpStep && !successMessage ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Enter OTP</label>
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-11 rounded-xl border-primary/10"
                  disabled={verifying}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl font-semibold"
                  onClick={handleSendOtp}
                  disabled={sending}
                >
                  {sending ? 'Resending...' : 'Resend OTP'}
                </Button>
                <Button
                  type="button"
                  className="h-11 rounded-xl font-bold"
                  onClick={handleVerifyOtp}
                  disabled={verifying || otp.length !== 6}
                >
                  {verifying ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </div>
            </>
          ) : null}

          {info ? (
            <div className="rounded-xl border border-primary/10 bg-primary/5 px-3 py-2 text-sm text-primary">
              {info}
              {demoOtp ? <span className="block mt-1">Demo OTP: {demoOtp}</span> : null}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {successMessage ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          ) : null}

          <Button
            type="button"
            variant={successMessage ? 'default' : 'ghost'}
            className="w-full h-11 rounded-xl"
            onClick={onClose}
          >
            {successMessage ? 'Done' : 'Cancel'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
