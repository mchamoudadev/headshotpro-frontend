import { CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CreditPackage } from '@/lib/types';

interface StripeCheckoutSectionProps {
  package: CreditPackage;
  onCheckout: () => void;
  isLoading: boolean;
}

export function StripeCheckoutSection({
  package: pkg,
  onCheckout,
  isLoading,
}: StripeCheckoutSectionProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md bg-muted p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Package</span>
          <span className="font-semibold text-foreground">{pkg.name}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Credits</span>
          <span className="font-semibold text-foreground">
            {pkg.credits + (pkg.bonus || 0)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t pt-2">
          <span className="font-medium text-foreground">Amount</span>
          <span className="text-xl font-bold text-foreground">${pkg.price}</span>
        </div>
      </div>

      <Button onClick={onCheckout} disabled={isLoading} className="w-full" size="lg">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </>
        )}
      </Button>
    </div>
  );
}
