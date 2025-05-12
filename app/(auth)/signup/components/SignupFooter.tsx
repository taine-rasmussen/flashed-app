import { useRouter, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import AppButton from '@/components/AppButton';

const steps = ['/signup', '/signup/StepTwo', '/signup/StepThree'];

const getContainerStyles = (justifyContent: 'flex-end' | 'space-between') =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent,
      padding: 24,
    },
  });

const SignupFooter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentIndex = steps.indexOf(pathname);
  const buttonPosition = currentIndex < 1 ? 'flex-end' : 'space-between';
  const styles = getContainerStyles(buttonPosition);

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      router.push(steps[currentIndex + 1]);
    } else {
      console.log('Submit user data');
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      router.push(steps[currentIndex - 1]);
    }
  };

  return (
    <View style={styles.container}>
      {currentIndex > 0 && (
        <AppButton onPress={goBack} mode="contained">
          Back
        </AppButton>
      )}
      <AppButton onPress={goNext} mode="contained">
        {currentIndex < steps.length - 1 ? 'Continue' : 'Finish'}
      </AppButton>
    </View>
  );
};

export default SignupFooter;
