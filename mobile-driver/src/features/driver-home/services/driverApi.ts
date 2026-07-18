import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { DriverProfile, DriverEarnings } from '../../../shared/types/driver';
export const driverApi = {
  getProfile: async () => { const { data } = await apiClient.get(ENDPOINTS.driver.profile); return data.data as DriverProfile; },
  updateStatus: async (status: 'online' | 'offline' | 'busy') => { const { data } = await apiClient.put(ENDPOINTS.driver.status, { status }); return data.data; },
  updateLocation: async (lat: number, lng: number) => { await apiClient.put(ENDPOINTS.driver.location, { latitude: lat, longitude: lng }); },
  getEarnings: async () => { const { data } = await apiClient.get(ENDPOINTS.driver.earnings); return data.data as DriverEarnings; },
};
