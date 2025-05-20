import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TextStyle, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useAppTheme } from '@/theme';

type Props = {
  totalSteps: number;
  currentStep: number;
  completedSteps?: number[];
};

const stepLabels = ['Basic Info', 'Climbing Info', 'Security'];

const SignupProgressBar = ({ totalSteps, currentStep, completedSteps = [] }: Props) => {
  const theme = useAppTheme();
  const router = useRouter();

  const previousStepRoute = () => {
    switch (currentStep) {
      case 2:
        return '/signup';
      case 3:
        return '/signup/StepTwo';
      default:
        return null;
    }
  };

  const animations = useRef(
    Array.from({ length: totalSteps }, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    animations.forEach((anim, index) => {
      const isActive = index < currentStep;
      Animated.timing(anim, {
        toValue: isActive ? 1 : 0.3,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentStep, completedSteps]);

  return (
    <View style={styles.wrapper}>
      {currentStep > 1 && (
        <Pressable
          onPress={() => {
            const prev = previousStepRoute();
            if (prev) router.push(prev);
          }}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color={theme.colors.onBackground} />
        </Pressable>
      )}
      <View style={styles.container}>
        {animations.map((animValue, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = index === currentStep - 1;

          const scale = animValue.interpolate({
            inputRange: [0.3, 1],
            outputRange: [0.95, 1],
          });

          const animatedBackgroundColor = animValue.interpolate({
            inputRange: [0.3, 1],
            outputRange: ['#ccc', theme.colors.primary],
          });

          const animatedTextColor = animValue.interpolate({
            inputRange: [0.3, 1],
            outputRange: ['#999', '#fff'],
          });

          return (
            <View key={index} style={styles.stepContainer}>
              <Animated.View
                style={[
                  styles.circle,
                  {
                    backgroundColor: animatedBackgroundColor,
                    transform: [{ scale }],
                    borderWidth: isCurrent ? 2 : 0,
                    borderColor: isCurrent ? theme.colors.onBackground : 'transparent',
                  },
                ]}
              >
                {isCompleted && !isCurrent ? (
                  <MaterialIcons name="check" size={18} color="white" />
                ) : (
                  <Animated.Text
                    style={[
                      styles.circleText,
                      {
                        color: animatedTextColor as unknown as TextStyle['color'],
                      },
                    ]}
                  >
                    {index + 1}
                  </Animated.Text>
                )}
              </Animated.View>

              <Animated.Text
                style={[
                  styles.label,
                  {
                    color: animatedTextColor as unknown as TextStyle['color'],
                    paddingBottom: 8,
                  },
                ]}
              >
                {stepLabels[index] ?? `Step ${index + 1}`}
              </Animated.Text>

              <Animated.View
                style={[
                  styles.bar,
                  {
                    backgroundColor: animatedBackgroundColor,
                    opacity: animValue,
                    transform: [{ scale }],
                    marginHorizontal: 4,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SignupProgressBar;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  circleText: {
    fontWeight: '600',
  },
  bar: {
    width: '100%',
    height: 8,
    borderRadius: 100,
    marginBottom: 4,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
});
