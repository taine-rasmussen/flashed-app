import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import AppInput from '@/components/AppInput';
import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';
import AppButton from '@/components/AppButton';

interface IForm {
  email: string;
  password: string;
  onEmailChange: (_text: string) => void;
  onPasswordChange: (_text: string) => void;
}

const LoginForm = ({ email, password, onEmailChange, onPasswordChange }: IForm) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleLogin = () => {
    console.log('Logging in with:', { email, password });
  };
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
          <AppButton onPress={handleLogin} mode="contained">
            Login
          </AppButton>
          <AppButton onPress={handleLogin} mode="outlined">
            Forgot password?
          </AppButton>
        </View>
      </View>
    </Card>
  );
};

export default LoginForm;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      height: '66%',
      padding: theme.custom.spacing.md,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: 'red',
    },
    container: {
      height: '100%',
    },
    inputs: {
      flex: 1, // 👈 This is the missing piece: let inputs grow
      justifyContent: 'center', // Optional: center inputs in their area
      gap: theme.custom.spacing.md,
      borderWidth: 1,
      borderColor: 'green',
    },
    btnContainer: {
      paddingTop: theme.custom.spacing.md,
      gap: theme.custom.spacing.sm,
      borderWidth: 1,
      borderColor: 'blue',
    },
  });
