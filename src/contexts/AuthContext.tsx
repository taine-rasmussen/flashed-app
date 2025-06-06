import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

import { getFromSecureStore, saveToSecureStore, deleteFromSecureStore } from '@/utils/secureStore';
import { DecodedToken } from '@/types';

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  checkAuthStatus: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}refresh-token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (response.ok) {
        const data = await response.json();
        await saveToSecureStore('access_token', data.access_token);
        await saveToSecureStore('refresh_token', data.refresh_token);
        return true;
      } else {
        console.error('Failed to refresh token.');
        return false;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  };

  // Check SecureStore for tokens, set isLoggedIn accordingly, then toggle loading → false
  const checkAuthStatus = async () => {
    setLoading(true);

    try {
      const accessToken = await getFromSecureStore('access_token');
      const refreshToken = await getFromSecureStore('refresh_token');

      if (accessToken) {
        const decoded: DecodedToken = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime) {
          // Access token still valid
          setIsLoggedIn(true);
        } else if (refreshToken) {
          // Access token expired but we have a refresh token
          const didRefresh = await refreshAccessToken(refreshToken);
          setIsLoggedIn(didRefresh);
        } else {
          // Neither valid access nor refresh
          setIsLoggedIn(false);
        }
      } else {
        // No access token at all
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  // Remove tokens from SecureStore and mark logged out
  const signOut = async () => {
    await deleteFromSecureStore('access_token');
    await deleteFromSecureStore('refresh_token');
    setIsLoggedIn(false);
    // After sign‐out, redirect the user to the auth screens
    router.replace('/login');
  };

  // On mount, do one initial check
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        checkAuthStatus,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
