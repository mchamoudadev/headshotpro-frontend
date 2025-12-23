/**
 * Local Payment Form Component
 * Form for local payment methods with phone number
 * Supports: EVC, ZAAD, SAHAL, EBIR, and LOCAL (cash)
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Wallet, DollarSign, Smartphone } from 'lucide-react';
import type { LocalPaymentFormProps } from '@/lib/types';

// Payment methods configuration
const PAYMENT_METHODS = [
  {
    id: 'EVC',
    name: 'EVC Plus',
    icon: Phone,
    description: 'Pay with EVC Plus mobile money',
  },
  {
    id: 'ZAAD',
    name: 'ZAAD Service',
    icon: Wallet,
    description: 'Pay with ZAAD Service',
  },
  {
    id: 'SAHAL',
    name: 'Sahal',
    icon: Smartphone,
    description: 'Pay with Sahal mobile money',
  },
  {
    id: 'EBIR',
    name: 'EBIR',
    icon: Phone,
    description: 'Pay with EBIR mobile money (ETB)',
  },
  {
    id: 'LOCAL',
    name: 'Cash Payment',
    icon: DollarSign,
    description: 'Request manual payment approval',
  },
];

export function LocalPaymentForm({
  packageId,
  onSubmit,
  isLoading = false,
}: LocalPaymentFormProps) {
  const [phone, setPhone] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('EVC');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      onSubmit(phone, selectedMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Choose Payment Method
        </h3>

        {/* Payment Method Selection */}
        <div className="mb-6 space-y-2">
          <Label>Payment Method</Label>
          <div className="grid gap-2">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  disabled={isLoading}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30 hover:bg-muted'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      selectedMethod === method.id
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{method.name}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  <div
                    className={`h-4 w-4 rounded-full border transition-all ${
                      selectedMethod === method.id
                        ? 'border-[6px] border-primary'
                        : 'border-2 border-muted-foreground/30'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="252XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={isLoading}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedMethod === 'LOCAL'
                ? "We'll contact you to confirm payment"
                : 'Enter your mobile wallet number'}
            </p>
          </div>

          {/* Payment Instructions */}
          <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Payment Instructions:</p>
            {selectedMethod === 'LOCAL' ? (
            <ol className="mt-2 list-inside list-decimal space-y-1">
              <li>Submit your payment request with your phone number</li>
              <li>Our team will contact you for payment confirmation</li>
              <li>Once verified, credits will be added to your account</li>
            </ol>
            ) : (
              <ol className="mt-2 list-inside list-decimal space-y-1">
                <li>Ensure you have sufficient balance in your mobile wallet</li>
                <li>Enter your {PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.name} number</li>
                <li>Approve the payment request on your phone</li>
                <li>Credits will be added automatically after confirmation</li>
              </ol>
            )}
          </div>

          {/* EBIR Currency Notice */}
          {selectedMethod === 'EBIR' && (
            <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-4 text-sm">
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                💱 Currency Conversion
              </p>
              <p className="mt-1 text-yellow-700 dark:text-yellow-300">
                Payment will be processed in Ethiopian Birr (ETB) using current exchange rate
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading || !phone.trim()}>
            {isLoading ? 'Processing...' : 'Complete Payment'}
          </Button>
        </div>
      </div>
    </form>
  );
}

