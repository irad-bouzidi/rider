import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';

export const supportApi = {
  createTicket: async (subject: string, message: string) => {
    const { data } = await apiClient.post(ENDPOINTS.support.tickets, {
      subject,
      message,
    });
    return data.data;
  },

  getTickets: async () => {
    const { data } = await apiClient.get(ENDPOINTS.support.tickets);
    return data.data;
  },

  sendMessage: async (ticketId: string, message: string) => {
    const { data } = await apiClient.post(
      ENDPOINTS.support.messages(ticketId),
      { message },
    );
    return data.data;
  },
};
