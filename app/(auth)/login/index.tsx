import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoginForm from './LoginForm';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);

  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <LoginForm
        email={email}
        onEmailChange={handleEmailChange}
        password={password}
        onPasswordChange={handlePasswordChange}
      />
    </SafeAreaView>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.custom.spacing.md,
    },
  });
