import { apiClient } from '../../../services/api/client';

interface LoginResponse {
  userId: string;
  fullName: string;
  email: string;
  role: 'passenger' | 'driver';
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

interface RegisterRequest {
  email: string;
  phone: string;
  password: string;
  fullName: string;
}

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { email, password });
    return data.data as LoginResponse;
  },

  register: async (req: RegisterRequest) => {
    const { data } = await apiClient.post('/auth/register', req);
    return data.data as LoginResponse;
  },

  sendOtp: async (phone: string, purpose: string) => {
    const { data } = await apiClient.post('/auth/otp/send', { phone, purpose });
    return data.data as { otpId: string; expiresInSeconds: number };
  },

  verifyOtp: async (otpId: string, code: string) => {
    const { data } = await apiClient.post('/auth/otp/verify', { otpId, code });
    return data.data as { verified: boolean };
  },

  refreshToken: async (refreshToken: string) => {
    const { data } = await apiClient.post('/auth/refresh', { refreshToken });
    return data.data as LoginResponse;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },
};
