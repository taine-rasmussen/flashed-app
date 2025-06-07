import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import ProfileCard from './cards/ProfileCard';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

export default function DashboardScreen() {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <LinearGradient
      colors={theme.custom.gradient.colours as [string, string, ...string[]]}
      start={theme.custom.gradient.start}
      end={theme.custom.gradient.end}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ProfileCard />
      </SafeAreaView>
    </LinearGradient>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      padding: theme.custom.spacing.sm,
    },
    text: {
      fontSize: 22,
      fontWeight: '500',
    },
  });
