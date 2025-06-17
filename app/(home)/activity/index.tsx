import { useState, useEffect } from 'react';
import axios from 'axios';
import { Text } from 'react-native';

import ActivityFilters from './ActivityFilters';
import ActivityLog from './ActivityLog';

import IndexWrapper from '@/components/IndexWrapper';
import { FilterOrder, IDateRange } from '@/types';
import { useUser } from '@/contexts/UserContext';
import { Climb } from '@/types';
import { getFromSecureStore } from '@/utils/secureStore';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

const Activity = () => {
  const [filterOrder, setFilterOrder] = useState<FilterOrder>('desc');
  const { user } = useUser();
  const [climbData, setClimbData] = useState<Climb[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [openGradeRange, setOpenGradeRange] = useState<boolean>(false);
  const [gradeRangeValue, setGradeRangeValue] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: null,
    endDate: null,
  });

  const getClimbData = async () => {
    setLoading(true);
    const accessToken = await getFromSecureStore('access_token');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const filters = {
      start_date: dateRange.startDate || null,
      end_date: dateRange.endDate || null,
      grade_range: gradeRangeValue.length > 0 ? gradeRangeValue : null,
    };

    try {
      const url = `${API_URL}get_climbs/?user_id=${user.id}`;
      const response = await axios.post<Climb[]>(url, JSON.stringify(filters), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setClimbData(response.data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClimbData();
  }, [dateRange, gradeRangeValue]);

  if (loading)
    return (
      <IndexWrapper>
        <Text>Loading…</Text>
      </IndexWrapper>
    );

  return (
    <IndexWrapper>
      <ActivityFilters
        dateRange={dateRange}
        filterOrder={filterOrder}
        openCalendar={openCalendar}
        setDateRange={setDateRange}
        openGradeRange={openGradeRange}
        setFilterOrder={setFilterOrder}
        gradeRangeValue={gradeRangeValue}
        setOpenCalendar={setOpenCalendar}
        setOpenGradeRange={setOpenGradeRange}
        setGradeRangeValue={setGradeRangeValue}
      />
      <ActivityLog climbData={climbData} filterOrder={filterOrder} />
    </IndexWrapper>
  );
};

export default Activity;
