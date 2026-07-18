import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
import { SearchResult } from '../../../shared/types/location';

export const locationApi = {
  search: async (query: string) => {
    const { data } = await apiClient.get(ENDPOINTS.locations.search, {
      params: { q: query },
    });
    return data.data as SearchResult[];
  },

  reverseGeocode: async (latitude: number, longitude: number) => {
    const { data } = await apiClient.get(ENDPOINTS.locations.reverse, {
      params: { latitude, longitude },
    });
    return data.data as SearchResult;
  },

  autocomplete: async (query: string) => {
    const { data } = await apiClient.get(ENDPOINTS.locations.autocomplete, {
      params: { q: query },
    });
    return data.data as SearchResult[];
  },
};
