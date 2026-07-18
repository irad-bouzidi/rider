import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import { socketClient } from '../../services/websocket/socketClient';

const AuthContext = createContext({ isAuthenticated: false, user: null as any });

export function AuthProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);

  React.useEffect(() => {
    if (isAuthenticated && accessToken) socketClient.connect(accessToken);
    else socketClient.disconnect();
  }, [isAuthenticated, accessToken]);

  return <AuthContext.Provider value={{ isAuthenticated, user }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() { return useContext(AuthContext); }
