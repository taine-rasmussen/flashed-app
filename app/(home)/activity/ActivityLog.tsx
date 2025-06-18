import { ScrollView, Text } from 'react-native';

import ActivityLogCard from './ActivityLogCard';

import { Climb, FilterOrder } from '@/types';

interface IActivityLog {
  climbData: Climb[];
  filterOrder: FilterOrder;
}

const ActivityLog = (props: IActivityLog) => {
  const { climbData, filterOrder } = props;

  const sortedData = [...climbData].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();

    if (filterOrder === 'asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  return (
    <ScrollView>
      {sortedData?.length ? (
        sortedData.map((climb, i) => (
          <ActivityLogCard key={`${climb.created_at}_${i}`} climb={climb} />
        ))
      ) : (
        <Text>No climbs found.</Text>
      )}
    </ScrollView>
  );
};

export default ActivityLog;
