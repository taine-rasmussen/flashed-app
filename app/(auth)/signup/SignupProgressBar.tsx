import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useAppTheme } from '@/theme';

type Props = {
  totalSteps: number;
  currentStep: number;
};

export const SignupProgressBar = ({ totalSteps, currentStep }: Props) => {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index < currentStep;
        return (
          <View
            key={index}
            style={[
              styles.step,
              { backgroundColor: isActive ? theme.colors.primary : theme.colors.secondary },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  step: {
    flex: 1,
    height: 8,
    borderRadius: 100,
  },
});
