import { useState } from 'react';

import ActivityFilters from './ActivityFilters';
import ActivityLog from './ActivityLog';

import IndexWrapper from '@/components/IndexWrapper';
import { FilterOrder } from '@/types';

const Activity = () => {
  const [filterOrder, setFilterOrder] = useState<FilterOrder>('desc');
  return (
    <IndexWrapper>
      <ActivityFilters filterOrder={filterOrder} setFilterOrder={setFilterOrder} />
      <ActivityLog />
    </IndexWrapper>
  );
};

export default Activity;
