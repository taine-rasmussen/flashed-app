import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import AppInput from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const theme = useAppTheme();
  const styles = getStyles(theme);

  const handleLogin = () => {
    console.log('Logging in with:', { email, password });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Log in to continue your climbing journey with Flashed.
          </Text>
        </View>

        <View style={styles.form}>
          <AppInput
            labelAbove="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<MaterialIcons name="email" size={20} color="#888" />}
          />

          <AppInput
            labelAbove="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            leftIcon={<MaterialIcons name="lock" size={20} color="#888" />}
            rightIcon={
              <MaterialIcons
                name={passwordVisible ? 'visibility-off' : 'visibility'}
                size={20}
                color="#888"
                onPress={() => setPasswordVisible(prev => !prev)}
              />
            }
          />
        </View>

        <AppButton onPress={handleLogin} mode="contained" style={styles.loginBtn}>
          Login
        </AppButton>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    inner: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: theme.custom.spacing.lg,
      paddingBottom: theme.custom.spacing.lg,
      justifyContent: 'space-between',
    },
    header: {
      marginBottom: theme.custom.spacing.md,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
    form: {
      gap: theme.custom.spacing.md,
    },
    loginBtn: {
      marginTop: theme.custom.spacing.lg,
    },
  });
