import { Platform } from 'react-native';
import { MD3DarkTheme as DefaultDarkTheme } from 'react-native-paper';

import { spacing, typography } from './Util';

export const darkTheme = {
  ...DefaultDarkTheme,
  custom: {
    spacing: spacing,
    typography: typography,
  },
  colors: {
    ...DefaultDarkTheme.colors,
    primary: '#90caf9',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    border: '#333333',
  },
  fonts: {
    ...DefaultDarkTheme.fonts,
    bodyLarge: {
      ...DefaultDarkTheme.fonts.bodyLarge,
      fontFamily: Platform.select({
        ios: undefined, // IOS default is SF Pro
        android: 'SF-Pro',
      }),
    },
    titleLarge: {
      ...DefaultDarkTheme.fonts.titleLarge,
      fontFamily: Platform.select({
        ios: undefined,
        android: 'SF-Pro',
      }),
    },
    labelMedium: {
      ...DefaultDarkTheme.fonts.labelMedium,
      fontFamily: Platform.select({
        ios: undefined,
        android: 'SF-Pro',
      }),
    },
  },
};
