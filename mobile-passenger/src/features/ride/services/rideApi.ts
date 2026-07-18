import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { Ride, RideRating } from '../../../shared/types/ride';

export const rideApi = {
  getRideDetail: async (rideId: string) => {
    const { data } = await apiClient.get(ENDPOINTS.rides.detail(rideId));
    return data.data as Ride;
  },

  cancelRide: async (rideId: string, reason?: string) => {
    const { data } = await apiClient.post(ENDPOINTS.rides.cancel(rideId), {
      reason,
    });
    return data.data;
  },

  rateRide: async (rideId: string, rating: RideRating) => {
    const { data } = await apiClient.post(ENDPOINTS.rides.rate(rideId), rating);
    return data.data;
  },

  getCurrentRide: async () => {
    const { data } = await apiClient.get(ENDPOINTS.rides.current);
    return data.data as Ride | null;
  },
};
