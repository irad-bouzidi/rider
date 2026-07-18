import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { DriverVehicle } from '../../../shared/types/driver';
export const vehicleApi = {
  getMyVehicle: async () => { const { data } = await apiClient.get(ENDPOINTS.vehicle.myVehicle); return data.data as DriverVehicle; },
  register: async (v: Partial<DriverVehicle>) => { const { data } = await apiClient.post(ENDPOINTS.vehicle.register, v); return data.data as DriverVehicle; },
  update: async (v: Partial<DriverVehicle>) => { const { data } = await apiClient.put(ENDPOINTS.vehicle.myVehicle, v); return data.data as DriverVehicle; },
};
