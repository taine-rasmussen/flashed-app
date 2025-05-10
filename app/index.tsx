import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

import { checkFirstLaunch } from '@/utils/firstLaunch';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Index() {
  const [route, setRoute] = useState<string | null>(null);

  useEffect(() => {
    const decideInitialRoute = async () => {
      const isFirstLaunch = await checkFirstLaunch();

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
      <View style={styles.container}>
        <Text>Redirecting...</Text>
      </View>
    );
  }

  return <Redirect href={route} />;
}
