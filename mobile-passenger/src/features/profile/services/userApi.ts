import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { UserProfile } from '../../../shared/types/user';
import { SavedLocation } from '../../../shared/types/location';

export const userApi = {
  getProfile: async () => {
    const { data } = await apiClient.get(ENDPOINTS.user.profile);
    return data.data as UserProfile;
  },

  updateProfile: async (profile: Partial<UserProfile>) => {
    const { data } = await apiClient.put(ENDPOINTS.user.updateProfile, profile);
    return data.data as UserProfile;
  },

  getFavoriteLocations: async () => {
    const { data } = await apiClient.get(ENDPOINTS.user.favoriteLocations);
    return data.data as SavedLocation[];
  },

  getSettings: async () => {
    const { data } = await apiClient.get(ENDPOINTS.user.settings);
    return data.data;
  },

  updateSettings: async (settings: any) => {
    const { data } = await apiClient.put(ENDPOINTS.user.settings, settings);
    return data.data;
  },
};
