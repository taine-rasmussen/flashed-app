import { Slot } from 'expo-router';

import IndexWrapper from '@/components/IndexWrapper';

export default function AuthLayout() {
  return (
    <IndexWrapper>
      <Slot />
    </IndexWrapper>
  );
}
