import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { Coordinates } from '../../../shared/types/location';
import { FareEstimate, Ride, RideRequest } from '../../../shared/types/ride';

export const rideApi = {
  getFareEstimate: async (
    pickup: Coordinates,
    destination: Coordinates,
    rideType?: string,
  ) => {
    const { data } = await apiClient.post(ENDPOINTS.rides.estimate, {
      pickup,
      destination,
      rideType,
    });
    return data.data as FareEstimate[];
  },

  requestRide: async (request: RideRequest) => {
    const { data } = await apiClient.post(ENDPOINTS.rides.request, request);
    return data.data as Ride;
  },

  cancelRide: async (rideId: string) => {
    const { data } = await apiClient.post(ENDPOINTS.rides.cancel(rideId));
    return data.data;
  },

  getCurrentRide: async () => {
    const { data } = await apiClient.get(ENDPOINTS.rides.current);
    return data.data as Ride | null;
  },

  rateRide: async (rideId: string, rating: number, feedback?: string) => {
    const { data } = await apiClient.post(ENDPOINTS.rides.rate(rideId), {
      rating,
      feedback,
    });
    return data.data;
  },
};
