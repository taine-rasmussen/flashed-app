import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { useAppTheme } from '@/theme';

type Props = {
  totalSteps: number;
  currentStep: number;
};

const SignupProgressBar = ({ totalSteps, currentStep }: Props) => {
  const theme = useAppTheme();
  const animations = useRef(
    Array.from({ length: totalSteps }, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    animations.forEach((anim, index) => {
      const shouldBeActive = index < currentStep;
      Animated.timing(anim, {
        toValue: shouldBeActive ? 1 : 0.3,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentStep]);

  return (
    <View style={styles.container}>
      {animations.map((animValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.step,
            {
              backgroundColor: theme.colors.primary,
              opacity: animValue,
              transform: [
                {
                  scale: animValue.interpolate({
                    inputRange: [0.3, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

export default SignupProgressBar;

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
    backgroundColor: '#ddd',
  },
});
