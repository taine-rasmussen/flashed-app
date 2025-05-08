import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_LAUNCHED_KEY = 'hasLaunchedBefore';

export const checkFirstLaunch = async (): Promise<boolean> => {
  try {
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
