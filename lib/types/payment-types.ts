/**
 * Payment Types
 * TypeScript interfaces for payment and credit features
 */

export type PaymentPlatform =
  | "STRIPE"
  | "EVC"
  | "ZAAD"
  | "SAHAL"
  | "EBIR"
  | "LOCAL";

export enum PaymentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

/**
 * Credit Package (tier pricing)
 */
export interface CreditPackage {
  _id: string;
  name: string;
  credits: number;
  price: number;
  description?: string;
  bonus?: number;
  popular?: boolean;
  isActive: boolean;
  stripePriceId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Order/Transaction
 */
export interface Order {
  _id: string;
  user: string;
  package: CreditPackage;
  amount: number;
  credits: number;
  platform: PaymentPlatform;
  phone?: string;
  status: PaymentStatus;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  transactionId?: string;
  paymentDetails?: any;
  creditsAdded?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * API Request/Response Types
 */
export interface ProcessPaymentParams {
  packageId: string;
  platform: PaymentPlatform;
  phone?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface ProcessPaymentResponse {
  success: boolean;
  message: string;
  orderId: string;
  sessionId?: string;
  redirectUrl?: string;
  amount: number;
  credits: number;
  status: PaymentStatus;
}

export interface VerifyPaymentParams {
  sessionId: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  status: PaymentStatus;
  orderId: string;
  credits: number;
  data?: {
    paymentIntentId: string;
    amountTotal: number;
    currency: string;
    customerEmail?: string;
    metadata?: any;
  };
}

export interface GetPaymentHistoryParams {
  limit?: number;
}

export interface GetPaymentHistoryResponse {
  success: boolean;
  message: string;
  data: Order[];
}

export interface GetCreditPackagesResponse {
  packages: CreditPackage[];
}

/**
 * Component Props
 */
export interface CreditPackageCardProps {
  package: CreditPackage;
  onSelect: (packageId: string) => void;
  isSelected?: boolean;
  isLoading?: boolean;
}

export interface PaymentHistoryProps {
  orders: Order[];
  isLoading?: boolean;
}

export interface LocalPaymentFormProps {
  packageId: string;
  onSubmit: (phone: string, platform?: string) => void;
  isLoading?: boolean;
}
