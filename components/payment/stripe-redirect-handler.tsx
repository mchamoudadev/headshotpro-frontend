'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

interface StripeRedirectHandlerProps {
  onVerify: (sessionId: string) => void;
  isVerifying: boolean;
}

export function StripeRedirectHandler({
  onVerify,
  isVerifying,
}: StripeRedirectHandlerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const status = searchParams.get('status');

    if (sessionId && !isVerifying) {
      onVerify(sessionId);
      router.replace('/dashboard/user/credits');
    } else if (status === 'pending') {
      toast.success('Payment request submitted. Awaiting admin approval.');
    } else if (status === 'canceled') {
      toast.info('Payment was canceled');
    }
  }, [searchParams, onVerify, isVerifying, router]);

  return null;
}
