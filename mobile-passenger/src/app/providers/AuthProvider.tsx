import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import { socketClient } from '../../services/websocket/socketClient';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  React.useEffect(() => {
    if (isAuthenticated && accessToken) {
      socketClient.connect(accessToken);
    } else {
      socketClient.disconnect();
    }
  }, [isAuthenticated, accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
