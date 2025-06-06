// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import { checkFirstLaunch } from '@/utils/firstLaunch';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      console.log('Index: still loading auth state…');
      return;
    }

    const decideRoute = async () => {
      const isFirstLaunch = await checkFirstLaunch();

      if (isFirstLaunch) {
        router.replace('/signup');
      } else {
        router.replace(isLoggedIn ? '/dashboard' : '/login');
      }
    };
    decideRoute();
  }, [loading, isLoggedIn, router]);

  return null;
}
