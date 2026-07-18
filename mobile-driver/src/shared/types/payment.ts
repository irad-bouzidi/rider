export interface Wallet { balance: number; currency: string; pendingWithdrawal: number; }
export interface WalletTransaction {
  id: string; type: 'earnings' | 'withdrawal' | 'refund' | 'bonus';
  amount: number; description: string; rideId?: string; createdAt: string;
}
export interface PaymentMethod {
  id: string; type: 'bank' | 'card'; label: string; isDefault: boolean;
  bankAccount?: { bankName: string; last4: string; holderName: string; };
}
