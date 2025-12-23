"use client";
import {
  CreditPackageCard,
  CreditsHeader,
  LocalPaymentForm,
  PaymentHistory,
  PaymentMethodSelector,
  StripeCheckoutSection
} from "@/components/payment";
import { useUser } from "@/lib/context/user-context";
import {
  useGetCreditPackages,

  useGetPaymentHistory,

  useProcessPayment,
} from "@/lib/hooks";
import { PaymentPlatform } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

const CreditsPage = () => {
  const { user } = useUser();

  // State
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );
  const [selectedPlatform, setSelectedPlatform] =
    useState<PaymentPlatform>("STRIPE");
  const [showLocalForm, setShowLocalForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const { data: packages, isLoading: isLoadingCreditPackages } =
    useGetCreditPackages();

  const { mutate: processPayment, isPending: isVerifying } =
    useProcessPayment();

  //  TODO : Payment history

  const { data: paymentHistory, isLoading: isLoadingPaymentHistory } =
    useGetPaymentHistory(10);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
    setShowLocalForm(false);
  };

  const handleSelectPlatform = (platform: PaymentPlatform) => {
    setSelectedPlatform(platform);
    // Show local form for all mobile wallet and local payments
    const isLocalPayment = ["EVC", "ZAAD", "SAHAL", "EBIR", "LOCAL"].includes(
      platform
    );
    setShowLocalForm(isLocalPayment);
  };

  const handleProcessStripePayment = () => {
    if (!selectedPackageId) {
      toast.error("Please select a package");
      return;
    }

    const frontendUrl = window.location.origin;

    processPayment({
      packageId: selectedPackageId,
      platform: "STRIPE",
      successUrl: `${frontendUrl}/verify-payment`,
      cancelUrl: `${frontendUrl}/dashboard/user/credits?status=cancel`,
    });
  };

  const handleProcessLocalPayment = (phone: string, platform?: string) => {
    if (!selectedPackageId) {
      toast.error("Please select a package");
      return;
    }

    const paymentPlatform = (platform || selectedPlatform) as PaymentPlatform;

    processPayment({
      packageId: selectedPackageId,
      platform: paymentPlatform,
      phone: phone,
    });
  };

  const selectedPackage = packages?.find(
    (pkg) => pkg._id === selectedPackageId
  );

  // console.log("user", user);

  return (
    <div className="space-y-8">
      {/* Credits Header */}
      <CreditsHeader
        credits={user?.credits || 0}
        showHistory={showHistory}
        onToggleHistory={() => setShowHistory(!showHistory)}
      />

      {/* Credits Packages */}

      {showHistory ? (
        //  Payment history component
        <PaymentHistory orders={paymentHistory || []} isLoading={isLoadingPaymentHistory} />
      ) : (
        <>
          {/* Credit Packages */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Select a Package
            </h2>
            {isLoadingCreditPackages ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-80 animate-pulse rounded-lg bg-muted"
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {packages?.map((pkg) => (
                  <CreditPackageCard
                    key={pkg._id}
                    package={pkg}
                    onSelect={handleSelectPackage}
                    isSelected={selectedPackageId === pkg._id}
                    isLoading={isLoadingCreditPackages}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Payment method selection */}

      {selectedPackage && (
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Select Payment Method
          </h2>

          <div className="space-y-4">
            {/* Payment Selector */}
            <PaymentMethodSelector
              selectedPlatform={selectedPlatform}
              onSelect={handleSelectPlatform}
            />

            <div className="border-t pt-4">
              {selectedPlatform === "STRIPE" && selectedPackage && (
                <StripeCheckoutSection
                  package={selectedPackage}
                  onCheckout={handleProcessStripePayment}
                  isLoading={isVerifying}
                />
              )}

              {showLocalForm && (
                <LocalPaymentForm
                  packageId={selectedPackageId || ""}
                  onSubmit={handleProcessLocalPayment}
                  isLoading={isVerifying}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditsPage;
