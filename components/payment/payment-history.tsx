/**
 * Payment History Component
 * Displays user's payment transaction history
 */

'use client';

import { CreditCard, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { PaymentHistoryProps, PaymentStatus } from '@/lib/types';

const statusConfig: Record<
  PaymentStatus,
  { label: string; icon: React.ComponentType<any>; className: string }
> = {
  PENDING: {
    label: 'Pending',
    icon: Clock,
    className: 'text-yellow-600 bg-yellow-50',
  },
  PROCESSING: {
    label: 'Processing',
    icon: AlertCircle,
    className: 'text-blue-600 bg-blue-50',
  },
  COMPLETED: {
    label: 'Completed',
    icon: CheckCircle2,
    className: 'text-green-600 bg-green-50',
  },
  FAILED: {
    label: 'Failed',
    icon: XCircle,
    className: 'text-red-600 bg-red-50',
  },
  REFUNDED: {
    label: 'Refunded',
    icon: AlertCircle,
    className: 'text-gray-600 bg-gray-50',
  },
};

export function PaymentHistory({ orders, isLoading }: PaymentHistoryProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  console.log(orders);
  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">
        <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">No payment history</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your payment transactions will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const status = statusConfig[order.status];
        const StatusIcon = status.icon;
        const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        return (
          <div
            key={order._id}
            className="rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-foreground">
                    {order.package.name} Package
                  </h4>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                  >
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {status.label}
                  </span>
                </div>

                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p>{order.credits} credits purchased</p>
                  <p>Payment method: {order.platform}</p>
                  <p>{formattedDate}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  ${order.amount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

