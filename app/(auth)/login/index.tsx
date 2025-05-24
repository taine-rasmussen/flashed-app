import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoginForm from './LoginForm';

import AppButton from '@/components/AppButton';
import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);

  const theme = useAppTheme();
  const styles = getStyles(theme);

  const handleLogin = () => {
    console.log('Logging in with:', { email, password });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <LoginForm
        email={email}
        onEmailChange={handleEmailChange}
        password={password}
        onPasswordChange={handlePasswordChange}
      />

      <AppButton onPress={handleLogin} mode="contained">
        Login
      </AppButton>
    </SafeAreaView>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: theme.custom.spacing.md,
      flex: 1,
    },
  });
