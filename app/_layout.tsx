import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, router } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useThemeContext } from '@/theme';

const HAS_LAUNCHED_KEY = 'hasLaunchedBefore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function RootLayout() {
  const { theme } = useThemeContext();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED_KEY);
        if (!hasLaunched) {
          await AsyncStorage.setItem(HAS_LAUNCHED_KEY, 'true');
          router.replace('/(auth)/signup');
        } else {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        router.replace('/(auth)/login');
      } finally {
        setAppReady(true);
      }
    };

    init();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appReady) {
      //  use rm -rf ios to reset cached bg colour on splash image
      SplashScreen.hide();
    }
  }, [appReady]);

  if (!appReady) return null;

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <View onLayout={onLayoutRootView} style={styles.container}>
            <Slot />
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
