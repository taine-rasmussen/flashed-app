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
    border: '#333',
  },
};
