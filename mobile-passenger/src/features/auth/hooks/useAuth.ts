import { useState, useCallback } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { authApi } from '../services/authApi';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { login: storeLogin, logout: storeLogout } = useAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await authApi.login(email, password);
        storeLogin(
          {
            id: response.userId,
            email,
            phone: '',
            fullName: response.fullName,
            role: response.role,
          },
          response.accessToken,
          response.refreshToken,
        );
      } finally {
        setIsLoading(false);
      }
    },
    [storeLogin],
  );

  const register = useCallback(
    async (data: {
      email: string;
      phone: string;
      password: string;
      fullName: string;
    }) => {
      setIsLoading(true);
      try {
        const response = await authApi.register(data);
        storeLogin(
          {
            id: response.userId,
            email: data.email,
            phone: data.phone,
            fullName: response.fullName,
            role: response.role,
          },
          response.accessToken,
          response.refreshToken,
        );
      } finally {
        setIsLoading(false);
      }
    },
    [storeLogin],
  );

  const sendOtp = useCallback(
    async (phone: string, purpose: string) => {
      setIsLoading(true);
      try {
        return await authApi.sendOtp(phone, purpose);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const verifyOtp = useCallback(
    async (otpId: string, code: string) => {
      setIsLoading(true);
      try {
        return await authApi.verifyOtp(otpId, code);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    } finally {
      storeLogout();
    }
  }, [storeLogout]);

  return {
    login,
    register,
    sendOtp,
    verifyOtp,
    logout,
    isLoading,
  };
}
