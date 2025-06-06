import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { useAuth } from './AuthContext';

import { getFromSecureStore } from '@/utils/secureStore';
import { DecodedToken, User } from '@/types';

interface UserContextType {
  user: User;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const [rawUser, setRawUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const accessToken = await getFromSecureStore('access_token');
      if (!accessToken) {
        setRawUser(null);
        return;
      }
      const decoded: DecodedToken = jwtDecode(accessToken);
      if (!decoded?.id) {
        setRawUser(null);
        return;
      }
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}get_user/`, {
        params: { id: decoded.id },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRawUser(response.data as User);
    } catch {
      setRawUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isLoggedIn]);

  if (loading) {
    return null;
  }

  if (!rawUser) {
    return <>{children}</>;
  }

  return (
    <UserContext.Provider
      value={{
        user: rawUser,
        loading: false,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
