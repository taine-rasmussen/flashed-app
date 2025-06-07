import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileCard from './cards/ProfileCard';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

export default function DashboardScreen() {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileCard />
      <Text style={[styles.text, { color: theme.colors.text }]}>Dashboard</Text>
    </SafeAreaView>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      padding: theme.custom.spacing.sm,
      backgroundColor: theme.colors.secondary,
    },
    text: {
      fontSize: 22,
      fontWeight: '500',
    },
  });
