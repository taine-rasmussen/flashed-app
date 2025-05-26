import { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Divider } from 'react-native-paper';

import LoginForm from './LoginForm';
import LoginFooter from './LoginFooter';

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
      <View style={styles.body}>
        <View style={styles.header}>
          <Image source={require('../../../assets/hand.png')} style={styles.image} />
          <Text variant="displayLarge">Flashed</Text>
        </View>
        <LoginForm
          email={email}
          onEmailChange={handleEmailChange}
          password={password}
          onPasswordChange={handlePasswordChange}
        />
      </View>
      <View>
        <Divider bold horizontalInset />
        <LoginFooter />
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      padding: theme.custom.spacing.md,
      gap: theme.custom.spacing.lg,
    },
    body: {
      flex: 1,
      justifyContent: 'center',
    },
    image: {
      height: 90,
      width: 90,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
