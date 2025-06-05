import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import { checkFirstLaunch } from '@/utils/firstLaunch';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const decideInitialRoute = async () => {
      const isFirstLaunch = await checkFirstLaunch();

      if (isFirstLaunch) {
        router.replace('/(auth)/signup');
      } else {
        router.replace(isAuthenticated ? '/(home)' : '/(auth)/login');
      }
    };

    decideInitialRoute();
  }, [router, isAuthenticated]);

  return null;
}
