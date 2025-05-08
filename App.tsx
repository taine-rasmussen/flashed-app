import * as SplashScreen from 'expo-splash-screen';
export { default } from 'expo-router';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 3000,
  fade: true,
});
