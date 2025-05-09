import { useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useThemeContext } from '@/theme';

export default function RootLayout() {
  const { theme } = useThemeContext();
  const appReady = true;

  const onLayoutRootView = useCallback(() => {
    if (appReady) {
      //  use rm -rf ios to reset cached bg colour on splash image
      SplashScreen.hide();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <Slot />
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
