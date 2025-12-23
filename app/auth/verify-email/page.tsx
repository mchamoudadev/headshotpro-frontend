"use client";
import { Button } from "@/components/ui/button";
import { useVerifyemail } from "@/lib/hooks";
import { AlertCircle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";

function VerifyEmailContent () {
  const { mutate, isPending, isSuccess, isError, error } = useVerifyemail();

  const router = useRouter();
  // Get token from the url
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  // No token provided


  useEffect(()=> {

    if(!token){
        return;
    }

    mutate(token, {
        onSuccess: () => {

            toast.success("Email Verified", {
                description : "Your email has been successfully verfied . Redirecting to login..."
            });

            setTimeout(()=>  router.push('/auth/login'), 2000)
        },
        onError: (error) => {
            toast.error("Verification failed", {
                description: error?.message || "The verification link may have expired . please request a new one."
            })

        }
    })


  }, [token, mutate, router])



  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-card p-8 shadow-lg border border-border">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Invalid Link
            </h1>
            <p className="mt-2 text-muted-foreground">
              Invalid verification link. No token provided.
            </p>
            <div className="mt-6">
              <Link href="/resend-verification">
                <Button className="w-full">Resend Verification Email</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-card p-8 shadow-lg border border-border">
        {/* Loading State */}
        {isPending && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Verifying your email
            </h1>
            <p className="mt-2 text-muted-foreground">
              Please wait while we verify your email address...
            </p>
          </div>
        )}

        {/* Success State */}
        {isSuccess && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Email Verified!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your email has been verified successfully. Redirecting to login...
            </p>
            <div className="mt-6">
              <Link href="/auth/login">
                <Button className="w-full">Continue to Login</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-6 w-6 text-destructive" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Verification Failed
            </h1>
            <p className="mt-2 text-muted-foreground">
              {error?.message ||
                "Failed to verify email. The link may have expired."}
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <Link href="/resend-verification">
                <Button className="w-full">Resend Verification Email</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="w-full">
                  Back to Register
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



function LoadingFallback() {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-card p-8 shadow-lg border border-border">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Loading...
            </h1>
          </div>
        </div>
      </div>
    );
  }

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<LoadingFallback/>}>
            <VerifyEmailContent/>
        </Suspense>
    )
}


