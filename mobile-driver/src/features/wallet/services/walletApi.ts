import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { Wallet, WalletTransaction } from '../../../shared/types/payment';
export const walletApi = {
  getWallet: async () => { const { data } = await apiClient.get(ENDPOINTS.payment.wallet); return data.data as Wallet; },
  getTransactions: async () => { const { data } = await apiClient.get(ENDPOINTS.payment.walletTransactions); return data.data as WalletTransaction[]; },
  requestWithdrawal: async (amount: number, method: string) => { const { data } = await apiClient.post(ENDPOINTS.payment.withdrawal, { amount, method }); return data.data; },
};
