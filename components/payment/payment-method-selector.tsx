import { CreditCard, Wallet, Smartphone } from 'lucide-react';
import type { PaymentPlatform } from '@/lib/types';

interface PaymentMethodSelectorProps {
  selectedPlatform: PaymentPlatform;
  onSelect: (platform: PaymentPlatform) => void;
}

export function PaymentMethodSelector({
  selectedPlatform,
  onSelect,
}: PaymentMethodSelectorProps) {
  const isLocalPayment = ['EVC', 'ZAAD', 'SAHAL', 'EBIR', 'LOCAL'].includes(selectedPlatform);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        onClick={() => onSelect('STRIPE')}
        className={`rounded-lg border-2 p-4 text-left transition-all ${
          selectedPlatform === 'STRIPE'
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50'
        }`}
      >
        <div className="flex items-center gap-3">
          <CreditCard className="h-6 w-6 text-primary" />
          <div>
            <h4 className="font-semibold text-foreground">Card Payment</h4>
            <p className="text-sm text-muted-foreground">Credit/Debit Card - Instant</p>
          </div>
        </div>
      </button>

      <button
        onClick={() => onSelect('EVC')}
        className={`rounded-lg border-2 p-4 text-left transition-all ${
          isLocalPayment
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50'
        }`}
      >
        <div className="flex items-center gap-3">
          <Smartphone className="h-6 w-6 text-primary" />
          <div>
            <h4 className="font-semibold text-foreground">Mobile Money</h4>
            <p className="text-sm text-muted-foreground">EVC, ZAAD, SAHAL, EBIR & More</p>
          </div>
        </div>
      </button>
    </div>
  );
}
