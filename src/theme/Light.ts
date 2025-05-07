import { Platform } from 'react-native';
import { MD3LightTheme as DefaultLightTheme } from 'react-native-paper';

import { spacing, typography } from './Util';

export const lightTheme = {
  ...DefaultLightTheme,
  custom: {
    spacing: spacing,
    typography: typography,
  },
  colors: {
    ...DefaultLightTheme.colors,
    primary: '#007aff',
    background: '#ffffff',
    surface: '#f9f9f9',
    text: '#1c1c1e',
    border: '#d1d1d6',
  },
  fonts: {
    ...DefaultLightTheme.fonts,
    bodyLarge: {
      ...DefaultLightTheme.fonts.bodyLarge,
      fontFamily: Platform.select({
        ios: undefined, // IOS default is SF Pro
        android: 'SF-Pro',
      }),
    },
    titleLarge: {
      ...DefaultLightTheme.fonts.titleLarge,
      fontFamily: Platform.select({
        ios: undefined,
        android: 'SF-Pro',
      }),
    },
    labelMedium: {
      ...DefaultLightTheme.fonts.labelMedium,
      fontFamily: Platform.select({
        ios: undefined,
        android: 'SF-Pro',
      }),
    },
  },
};
