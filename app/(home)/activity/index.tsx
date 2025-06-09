import ActivityFilters from './ActivityFilters';
import ActivityLog from './ActivityLog';

import IndexWrapper from '@/components/IndexWrapper';

const Activity = () => {
  return (
    <IndexWrapper>
      <ActivityFilters />
      <ActivityLog />
    </IndexWrapper>
  );
};

export default Activity;
