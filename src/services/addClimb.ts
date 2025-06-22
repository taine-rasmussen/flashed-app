import axios from 'axios';
import dayjs from 'dayjs';

import { IStagedClimb } from '@/types';
import { getFromSecureStore } from '@/utils/secureStore';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const addClimb = async (stagedClimb: IStagedClimb, userId: number) => {
  const accessToken = await getFromSecureStore('access_token');
  if (!accessToken) throw new Error('No access token found');

  const endpoint = `${API_URL}add_climb/?user_id=${userId}`;

  const payload = {
    grade: stagedClimb.grade[0],
    attempts: parseInt(stagedClimb.attempts),
    date: dayjs(stagedClimb.date).toISOString(),
    home_gym: stagedClimb.homeGym,
  };

  const response = await axios.post(endpoint, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
