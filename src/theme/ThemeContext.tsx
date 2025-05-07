import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

import { lightTheme } from './Light';
import { darkTheme } from './Dark';
import type { AppTheme } from './types';

type ThemeContextType = {
  isDark: boolean;
  theme: AppTheme;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  theme: darkTheme,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const system = useColorScheme();
  const isDark = system === 'dark';
  const theme = isDark ? darkTheme : lightTheme;

  return <ThemeContext.Provider value={{ isDark, theme }}>{children}</ThemeContext.Provider>;
};
