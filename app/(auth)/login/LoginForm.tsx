import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import AppInput from '@/components/AppInput';
import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';

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

  return (
    <Card>
      <View style={styles.form}>
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
    </Card>
  );
};

export default LoginForm;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    form: {
      gap: theme.custom.spacing.md,
    },
  });
