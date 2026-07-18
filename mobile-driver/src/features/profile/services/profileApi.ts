import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { DriverProfile } from '../../../shared/types/driver';
export const profileApi = {
  getProfile: async () => { const { data } = await apiClient.get(ENDPOINTS.driver.profile); return data.data as DriverProfile; },
  updateProfile: async (p: Partial<DriverProfile>) => { const { data } = await apiClient.put(ENDPOINTS.driver.profile, p); return data.data as DriverProfile; },
};
