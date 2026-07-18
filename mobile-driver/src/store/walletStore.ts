import { create } from 'zustand';
import { Wallet, WalletTransaction } from '../shared/types/payment';

interface WalletState {
  wallet: Wallet | null; transactions: WalletTransaction[];
  setWallet: (wallet: Wallet) => void;
  setTransactions: (txns: WalletTransaction[]) => void;
  addTransaction: (txn: WalletTransaction) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  wallet: null, transactions: [],
  setWallet: (wallet) => set({ wallet }),
  setTransactions: (txns) => set({ transactions: txns }),
  addTransaction: (txn) => set((s) => ({ transactions: [txn, ...s.transactions] })),
}));
