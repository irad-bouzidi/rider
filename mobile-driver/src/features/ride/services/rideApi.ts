import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { Ride } from '../../../shared/types/ride';
export const rideApi = {
  accept: async (id: string) => { const { data } = await apiClient.post(`/rides/${id}/accept`); return data.data as Ride; },
  reject: async (id: string) => { await apiClient.post(`/rides/${id}/reject`); },
  start: async (id: string) => { const { data } = await apiClient.post(`/rides/${id}/start`); return data.data as Ride; },
  complete: async (id: string) => { const { data } = await apiClient.post(`/rides/${id}/complete`); return data.data as Ride; },
  getCurrent: async () => { const { data } = await apiClient.get(ENDPOINTS.rides.current); return data.data as Ride | null; },
  getDetail: async (id: string) => { const { data } = await apiClient.get(ENDPOINTS.rides.detail(id)); return data.data as Ride; },
};
