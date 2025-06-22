import axios from 'axios';

import { Climb, IDateRange } from '@/types';
import { getFromSecureStore } from '@/utils/secureStore';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const getClimbs = async (
  userId: number,
  dateRange: IDateRange,
  gradeRangeValue: string[],
): Promise<Climb[]> => {
  const accessToken = await getFromSecureStore('access_token');
  if (!accessToken) throw new Error('No access token found');

  const filters: Record<string, any> = {};
  if (dateRange.startDate) filters.start_date = dateRange.startDate;
  if (dateRange.endDate) filters.end_date = dateRange.endDate;
  if (gradeRangeValue.length > 0) filters.grade_range = gradeRangeValue;

  const response = await axios.post<Climb[]>(`${API_URL}get_climbs/?user_id=${userId}`, filters, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
