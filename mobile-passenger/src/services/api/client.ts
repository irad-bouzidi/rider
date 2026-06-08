import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const API_BASE_URL = __DEV__
  ? 'http://localhost:8080/api/v1'
  : 'https://api.ridesharing.com/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = useAuthStore.getState().refreshToken;
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          useAuthStore.getState().setTokens(
            data.data.accessToken,
            data.data.refreshToken
          );
          error.config.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return apiClient.request(error.config);
        } catch {
          useAuthStore.getState().logout();
        }
      }
    }
    return Promise.reject(error);
  }
);
