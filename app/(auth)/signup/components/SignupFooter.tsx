import { useRouter, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import AppButton from '@/components/AppButton';
import { useSignup } from '@/contexts/SignupContext';
import { isValidEmail } from '@/utils/helpers';

const steps = ['/signup', '/signup/StepTwo', '/signup/StepThree'];

const getContainerStyles = (justifyContent: 'flex-end' | 'space-between') =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent,
      padding: 24,
    },
    btn: {
      width: '100%',
    },
  });

const SignupFooter = () => {
  const router = useRouter();
  const { form } = useSignup();
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

  const isBtnDisabled = () => {
    const { firstName, lastName, email, location, homeGym, gradeStyle, passwordValid } = form;

    if (currentIndex === 0) {
      const allFilled = firstName.trim().length > 0 && lastName.trim().length > 0;
      return !(allFilled && isValidEmail(email));
    }

    if (currentIndex === 1) {
      const allFilled =
        location.trim().length > 0 && homeGym.trim().length > 0 && gradeStyle.trim().length > 0;
      return !allFilled;
    }

    if (currentIndex === 2) {
      return !passwordValid;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <AppButton onPress={goNext} mode="contained" style={styles.btn} disabled={isBtnDisabled()}>
        {currentIndex < steps.length - 1 ? 'Continue' : 'Finish'}
      </AppButton>
    </View>
  );
};

export default SignupFooter;
