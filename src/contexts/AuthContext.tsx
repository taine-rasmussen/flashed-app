import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

import { saveToSecureStore, getFromSecureStore, deleteFromSecureStore } from '@/utils/secureStore';

interface DecodedToken {
  sub: string;
  id: string;
  exp: number;
  [key: string]: any;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  decodedToken: DecodedToken | null;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const loadTokens = async () => {
      const storedAccess = await getFromSecureStore('access_token');
      const storedRefresh = await getFromSecureStore('refresh_token');
      if (storedAccess && storedRefresh) {
        const decoded = jwtDecode<DecodedToken>(storedAccess);
        if (decoded.exp * 1000 > Date.now()) {
          setAccessToken(storedAccess);
          setRefreshToken(storedRefresh);
          setDecodedToken(decoded);
        } else {
          await logout();
        }
      }
    };
    loadTokens();
  }, []);

  const login = async (access: string, refresh: string) => {
    await saveToSecureStore('access_token', access);
    await saveToSecureStore('refresh_token', refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
    setDecodedToken(jwtDecode<DecodedToken>(access));
  };

  const logout = async () => {
    await deleteFromSecureStore('access_token');
    await deleteFromSecureStore('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
    setDecodedToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken,
        decodedToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
