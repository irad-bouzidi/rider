import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { Ride } from '../../../shared/types/ride';

export const historyApi = {
  getRideHistory: async (page: number = 1, pageSize: number = 20) => {
    const { data } = await apiClient.get(ENDPOINTS.rides.history, {
      params: { page, pageSize },
    });
    return data;
  },

  getRideDetail: async (rideId: string) => {
    const { data } = await apiClient.get(ENDPOINTS.rides.detail(rideId));
    return data.data as Ride;
  },
};
