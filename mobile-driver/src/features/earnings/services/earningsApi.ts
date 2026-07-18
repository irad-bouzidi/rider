import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { DriverEarnings } from '../../../shared/types/driver';
export const earningsApi = {
  getEarnings: async () => { const { data } = await apiClient.get(ENDPOINTS.driver.earnings); return data.data as DriverEarnings; },
};
