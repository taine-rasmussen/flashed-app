import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';

import { checkFirstLaunch } from '@/utils/firstLaunch';

export default function Index() {
  const [route, setRoute] = useState<string | null>(null);

  useEffect(() => {
    const decideInitialRoute = async () => {
      const isFirstLaunch = await checkFirstLaunch();
      console.log('🧪 First Launch:', isFirstLaunch);

      if (isFirstLaunch) {
        setRoute('/(auth)/signup');
      } else {
        const isAuthenticated = false;
        setRoute(isAuthenticated ? '/(home)' : '/(auth)/login');
      }
    };

    decideInitialRoute();
  }, []);

  if (!route) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Redirecting...</Text>
      </View>
    );
  }

  return <Redirect href={route} />;
}
