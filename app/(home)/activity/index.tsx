import { useState, useEffect } from 'react';
import axios from 'axios';
import { Text } from 'react-native';

import ActivityFilters from './ActivityFilters';
import ActivityLog from './ActivityLog';

import IndexWrapper from '@/components/IndexWrapper';
import { FilterOrder } from '@/types';
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
  const [calendarValue, setCalendarValue] = useState();
  const [gradeRangeValue, setGradeRangeValue] = useState([]);

  console.log(calendarValue, gradeRangeValue);

  const getClimbData = async () => {
    setLoading(true);
    const accessToken = await getFromSecureStore('access_token');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const url = `${API_URL}get_climbs/?user_id=${user.id}`;
      const response = await axios.post<Climb[]>(
        url,
        {
          // filters go here
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setClimbData(response.data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClimbData();
  }, []);

  if (loading) return <Text>Loading…</Text>;

  return (
    <IndexWrapper>
      <ActivityFilters
        filterOrder={filterOrder}
        openCalendar={openCalendar}
        openGradeRange={openGradeRange}
        setFilterOrder={setFilterOrder}
        setOpenCalendar={setOpenCalendar}
        setCalendarValue={setCalendarValue}
        setOpenGradeRange={setOpenGradeRange}
        setGradeRangeValue={setGradeRangeValue}
      />
      <ActivityLog climbData={climbData} filterOrder={filterOrder} />
    </IndexWrapper>
  );
};

export default Activity;
