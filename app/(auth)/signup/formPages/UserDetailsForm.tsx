import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import AppInput from '@/components/AppInput';
import { useSignup } from '@/contexts/SignupContext';
import { useAppTheme } from '@/theme';

const UserDetailsForm = () => {
  const { form, updateForm } = useSignup();
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="displaySmall">Welcome to Flashed</Text>
        <Text variant="titleMedium">
          Lets get started with some basic info to create your climbing profile.
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
          onChangeText={e => updateForm({ email: e })}
          leftIcon={<MaterialIcons name="email" size={20} color="#888" />}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.redirectText}>
          Already have an account?{' '}
          <Link href="/login" style={styles.linkText}>
            Login
          </Link>
        </Text>
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
      display: 'flex',
      gap: theme.custom.spacing.lmd,
    },
    footerText: {
      textAlign: 'center',
    },
    footer: {
      alignItems: 'center',
      marginTop: 20,
    },
    redirectText: {
      fontSize: 14,
      color: '#888',
    },
    linkText: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
      fontWeight: 'bold',
    },
  });

export default UserDetailsForm;
