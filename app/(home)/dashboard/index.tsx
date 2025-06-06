import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileCard from './cards/ProfileCard';

import { useAppTheme } from '@/theme';
import { useUser } from '@/contexts/UserContext';

export default function DashboardScreen() {
  const { colors } = useAppTheme();
  const { user } = useUser();
  console.log(user);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ProfileCard />
      <Text style={[styles.text, { color: colors.text }]}>Dashboard</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
  },
});
