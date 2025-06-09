import { ScrollView, Text } from 'react-native';

import ActivityLogCard from './ActivityLogCard';

import { Climb } from '@/types';

interface IActivityLog {
  climbData: Climb[];
}

const ActivityLog = (props: IActivityLog) => {
  const { climbData } = props;
  return (
    <ScrollView>
      {climbData?.length ? (
        climbData.map((climb, i) => <ActivityLogCard climb={climb} index={i} />)
      ) : (
        <Text>No climbs found.</Text>
      )}
    </ScrollView>
  );
};

export default ActivityLog;
