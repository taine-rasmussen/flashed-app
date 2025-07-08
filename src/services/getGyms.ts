import axios from 'axios';

import { getFromSecureStore } from '@/utils/secureStore';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const getGyms = async (): Promise<string[]> => {
  const accessToken = await getFromSecureStore('access_token');
  if (!accessToken) throw new Error('No access token found');

  const response = await axios.get(`${API_URL}get_gyms/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.map((gym: any) => gym.name);
};
