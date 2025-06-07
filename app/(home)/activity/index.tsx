import { Text } from 'react-native';

import ActivityLog from './ActivityLog';

import IndexWrapper from '@/components/IndexWrapper';

const Activity = () => {
  return (
    <IndexWrapper>
      <ActivityLog />
      <Text style={{ color: 'red' }}>test</Text>
    </IndexWrapper>
  );
};

export default Activity;
