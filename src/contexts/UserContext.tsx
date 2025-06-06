import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { useAuth } from './AuthContext';

import { getFromSecureStore } from '@/utils/secureStore';
import { DecodedToken } from '@/types';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    setLoading(true);

    try {
      const accessToken = await getFromSecureStore('access_token');
      if (!accessToken) {
        setUser(null);
        return;
      }

      const decoded: DecodedToken = jwtDecode(accessToken);
      if (!decoded?.id) {
        setUser(null);
        return;
      }

      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}get_user/`, {
        params: { id: decoded.id },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setUser(response.data as User);
    } catch (error) {
      console.error('UserContext: Failed to fetch user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
