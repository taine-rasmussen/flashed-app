import { useCallback, useEffect, useState } from 'react';
import { InteractionManager, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Slot, useRouter, usePathname } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useThemeContext } from '@/theme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { UserProvider } from '@/contexts/UserContext';

function AppLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(false);
  const publicRoutes = ['/login', '/signup'];

  const appReady = true;

  const onLayoutRootView = useCallback(() => {
    if (appReady) {
      SplashScreen.hide();
    }
  }, [appReady]);

  useEffect(() => {
    const runRedirect = async () => {
      if (!isAuthenticated && !publicRoutes.includes(pathname)) {
        setRedirecting(true);
        await InteractionManager.runAfterInteractions(() => {
          router.replace('/login');
        });
      } else {
        setRedirecting(false);
      }
    };

    runRedirect();
  }, [isAuthenticated, pathname]);

  if (!appReady || redirecting) return null;

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}

export default function RootLayout() {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <UserProvider>
              <AppLayout />
            </UserProvider>
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
