import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import AppInput from '@/components/AppInput';
import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';
import AppButton from '@/components/AppButton';
import { saveToSecureStore } from '@/utils/secureStore';
import { useAuth } from '@/contexts/AuthContext';

interface IForm {
  email: string;
  password: string;
  onEmailChange: (_text: string) => void;
  onPasswordChange: (_text: string) => void;
}

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

const LoginForm = ({ email, password, onEmailChange, onPasswordChange }: IForm) => {
  const { checkAuthStatus } = useAuth();
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}login/`, {
        email,
        password,
      });

      const { access_token, refresh_token } = response.data;
      await saveToSecureStore('access_token', access_token);
      await saveToSecureStore('refresh_token', refresh_token);

      await checkAuthStatus();

      onEmailChange('');
      onPasswordChange('');
      console.log('Login successful!', access_token, refresh_token);
    } catch (error: any) {
      console.error('Login error:', error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const disableLogin = !email.trim().length || !password.trim().length || loading;

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.inputs}>
          <AppInput
            labelAbove="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={onEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<MaterialIcons name="email" size={20} color="#888" />}
          />
          <AppInput
            labelAbove="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={onPasswordChange}
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

        <View style={styles.btnContainer}>
          <AppButton onPress={handleLogin} mode="contained" disabled={disableLogin}>
            Login
          </AppButton>
          <AppButton mode="outlined">Forgot password?</AppButton>
        </View>
      </View>
    </Card>
  );
};

export default LoginForm;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      height: '66.666%',
      padding: theme.custom.spacing.md,
      backgroundColor: theme.colors.background,
    },
    container: {
      height: '100%',
    },
    inputs: {
      flex: 1,
    },
    btnContainer: {
      paddingTop: theme.custom.spacing.md,
      gap: theme.custom.spacing.md,
    },
  });
