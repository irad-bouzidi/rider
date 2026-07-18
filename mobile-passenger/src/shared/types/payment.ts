export interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet' | 'cash';
  label: string;
  isDefault: boolean;
  card?: CardInfo;
}

export interface CardInfo {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  holderName: string;
}

export interface AddCardRequest {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: string;
  holderName: string;
}

export interface Wallet {
  balance: number;
  currency: string;
  points: number;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'refund';
  amount: number;
  description: string;
  rideId?: string;
  createdAt: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minAmount?: number;
  expiresAt: string;
  description: string;
}
