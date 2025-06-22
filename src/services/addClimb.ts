import axios from 'axios';

import { IStagedClimb } from '@/types';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const addClimb = async (stagedClimb: IStagedClimb, userId: number) => {
  const payload = {
    climb: {
      grade: stagedClimb.grade,
      attempts: parseInt(stagedClimb.attempts),
      date: stagedClimb.date?.toString(),
      home_gym: stagedClimb.homeGym,
    },
    user_id: userId,
  };

  const response = await axios.post(`${API_URL}add_climb/`, payload);
  return response.data;
};
