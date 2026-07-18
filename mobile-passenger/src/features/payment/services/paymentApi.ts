import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { PaymentMethod, AddCardRequest, Wallet } from '../../../shared/types/payment';

export const paymentApi = {
  getMethods: async () => {
    const { data } = await apiClient.get(ENDPOINTS.payment.methods);
    return data.data as PaymentMethod[];
  },

  addCard: async (card: AddCardRequest) => {
    const { data } = await apiClient.post(ENDPOINTS.payment.addCard, card);
    return data.data as PaymentMethod;
  },

  removeMethod: async (id: string) => {
    await apiClient.delete(`${ENDPOINTS.payment.methods}/${id}`);
  },

  setDefault: async (id: string) => {
    const { data } = await apiClient.put(`${ENDPOINTS.payment.methods}/${id}/default`);
    return data.data;
  },

  getWallet: async () => {
    const { data } = await apiClient.get(ENDPOINTS.payment.wallet);
    return data.data as Wallet;
  },

  validatePromo: async (code: string) => {
    const { data } = await apiClient.post(ENDPOINTS.payment.promo, { code });
    return data.data;
  },
};
