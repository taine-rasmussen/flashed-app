import { useRouter, usePathname, Link } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import { Divider } from 'react-native-paper';

import AppButton from '@/components/AppButton';
import { useSignup } from '@/contexts/SignupContext';
import { isValidEmail } from '@/utils/helpers';
import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';

const steps = ['/signup', '/signup/StepTwo', '/signup/StepThree'];

const getContainerStyles = (justifyContent: 'flex-end' | 'space-between', theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent,
      padding: 24,
      gap: theme.custom.spacing.md,
    },
    btn: {
      width: '100%',
    },
    footer: {
      alignItems: 'center',
    },
    text: {
      fontSize: 14,
      color: theme.colors.text,
    },
    linkText: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
      fontWeight: 'bold',
    },
  });

const SignupFooter = () => {
  const router = useRouter();
  const { form } = useSignup();
  const pathname = usePathname();
  const theme = useAppTheme();
  const currentIndex = steps.indexOf(pathname);
  const buttonPosition = currentIndex < 1 ? 'flex-end' : 'space-between';
  const styles = getContainerStyles(buttonPosition, theme);

  const submitUser = async () => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
          location: form.location,
          home_gym: form.homeGym,
          grade_style: form.gradeStyle,
          onboarding_complete: true,
          auth_provider: 'email',
          notifications_enabled: true,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Signup error:', err.detail);
        alert(`Signup failed: ${err.detail}`);
        return;
      }

      const user = await res.json();
      console.log('User created:', user);
      router.replace('/home');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      router.push(steps[currentIndex + 1]);
    } else {
      submitUser();
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

      {currentIndex === 0 && (
        <>
          <Divider bold horizontalInset />
          <View style={styles.footer}>
            <Text style={styles.text}>
              Already have an account?{' '}
              <Link href="/login" style={styles.linkText}>
                Login
              </Link>
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default SignupFooter;
