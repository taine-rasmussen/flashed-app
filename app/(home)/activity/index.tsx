import { useState, useEffect } from 'react';
import { Text } from 'react-native';

import ActivityFilters from './ActivityFilters';
import ActivityLog from './ActivityLog';

import IndexWrapper from '@/components/IndexWrapper';
import { FilterOrder, IDateRange } from '@/types';
import { useUser } from '@/contexts/UserContext';
import { Climb } from '@/types';
import { getClimbs } from '@/services/getClimbs';

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

    try {
      const climbs = await getClimbs(user.id, dateRange, gradeRangeValue);
      setClimbData(climbs);
    } catch (err) {
      console.error('Failed to fetch climbs', err);
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
