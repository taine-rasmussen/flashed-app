import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

import { lightTheme } from './Light';
import { darkTheme } from './Dark';

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  theme: lightTheme,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  const toggleTheme = () => setIsDark(prev => !prev);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>{children}</ThemeContext.Provider>
  );
};
