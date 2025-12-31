"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function VerifyPaymentContent() {
  const router = useRouter();

  useEffect(() => {
    // wait for 5 seconds

    const timer = setTimeout(() => {
      router.push("/dashboard/user/credits");
    }, 5000);

    // cleanup the timer
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <h2 className="text-xl font-semibold">Payment Successful!</h2>
          <p className="text-sm text-muted-foreground">
            Processing your credits...
          </p>
        </div>
      </div>
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-semibold">Payment Successful!</h2>
        <p className="text-sm text-muted-foreground">
          Processing your credits...
        </p>
      </div>
    </div>
  );
}
