import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';

interface IndexWrapperProps {
  children: ReactNode;
}

const IndexWrapper: React.FC<IndexWrapperProps> = ({ children }) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <LinearGradient
      colors={theme.custom.gradient.colours as [string, string, ...string[]]}
      start={theme.custom.gradient.start}
      end={theme.custom.gradient.end}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default IndexWrapper;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      position: 'relative',
      alignItems: 'center',
      padding: theme.custom.spacing.sm,
    },
    safeArea: {
      flex: 1,
      width: '100%',
    },
  });
