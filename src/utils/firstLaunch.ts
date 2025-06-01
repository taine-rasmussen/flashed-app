import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_LAUNCHED_KEY = 'hasLaunchedBefore';
const DEV_FORCE_FIRST_LAUNCH = __DEV__ && false;

export const checkFirstLaunch = async (): Promise<boolean> => {
  try {
    if (DEV_FORCE_FIRST_LAUNCH) {
      await AsyncStorage.removeItem(HAS_LAUNCHED_KEY);
    }

    const value = await AsyncStorage.getItem(HAS_LAUNCHED_KEY);

    if (value === null) {
      await AsyncStorage.setItem(HAS_LAUNCHED_KEY, 'true');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Failed to check first launch:', error);
    return false;
  }
};
