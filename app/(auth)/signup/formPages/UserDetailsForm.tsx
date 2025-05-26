import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, HelperText } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import AppInput from '@/components/AppInput';
import { useSignup } from '@/contexts/SignupContext';
import { useAppTheme } from '@/theme';
import { isValidEmail } from '@/utils/helpers';

const UserDetailsForm = () => {
  const { form, updateForm } = useSignup();
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (!emailTouched) return;

    const handler = setTimeout(() => {
      setEmailIsValid(isValidEmail(form.email));
    }, 500);

    return () => clearTimeout(handler);
  }, [form.email, emailTouched]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="displaySmall">Welcome to Flashed</Text>
        <Text variant="titleMedium">
          Let’s get started with some basic info to create your climbing profile.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <AppInput
          leftIcon={<MaterialIcons name="person" size={20} color="#888" />}
          labelAbove="First Name"
          placeholder="Enter your first name"
          value={form.firstName}
          onChangeText={e => updateForm({ firstName: e })}
        />

        <AppInput
          leftIcon={<MaterialIcons name="person" size={20} color="#888" />}
          labelAbove="Last Name"
          placeholder="Enter your last name"
          value={form.lastName}
          onChangeText={e => updateForm({ lastName: e })}
        />

        <AppInput
          labelAbove="Email"
          placeholder="Enter your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={e => {
            updateForm({ email: e });
            if (!emailTouched) setEmailTouched(true);
          }}
          leftIcon={<MaterialIcons name="email" size={20} color="#888" />}
          error={emailTouched && form.email.length > 0 && !emailIsValid}
        />
        <HelperText type="error" visible={emailTouched && form.email.length > 0 && !emailIsValid}>
          {emailTouched && form.email.length > 0 && !emailIsValid
            ? 'Please enter a valid email address.'
            : ' '}
        </HelperText>
      </View>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      gap: theme.custom.spacing.lg,
    },
    headerContainer: {
      display: 'flex',
      gap: theme.custom.spacing.md,
    },
    formContainer: {
      paddingBlockStart: 30,
      display: 'flex',
      gap: theme.custom.spacing.lmd,
    },
    footerText: {
      textAlign: 'center',
    },
  });

export default UserDetailsForm;
