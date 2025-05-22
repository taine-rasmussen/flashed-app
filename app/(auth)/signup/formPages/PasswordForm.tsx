import { View, StyleSheet, Text } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { HelperText, ProgressBar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import AppInput from '@/components/AppInput';
import { useSignup } from '@/contexts/SignupContext';
import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const DEBOUNCE_MS = 400;

const PasswordForm = () => {
  const { form, updateForm } = useSignup();
  const [confirmPwd, setConfirmPwd] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<string | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  console.log(passwordError);

  const theme = useAppTheme();
  const styles = getStyles(theme);

  const togglePwdVisibility = () => setPasswordVisible(prev => !prev);
  const toggleConfirmVisibility = () => setConfirmVisible(prev => !prev);

  const passwordStrength = (() => {
    if (!form.password) return 0;
    let strength = 0;
    if (form.password.length >= MIN_PASSWORD_LENGTH) strength += 0.4;
    if (/[A-Z]/.test(form.password)) strength += 0.2;
    if (/[0-9]/.test(form.password)) strength += 0.2;
    if (/[^A-Za-z0-9]/.test(form.password)) strength += 0.2;
    return Math.min(strength, 1);
  })();

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      if (form.password.length === 0) {
        setPasswordError(null);
        setPasswordFeedback(null);
      } else if (!PASSWORD_REGEX.test(form.password)) {
        setPasswordError(
          'Password must be at least 8 characters and include uppercase, lowercase, and a number.',
        );
        setPasswordFeedback(null);
      } else {
        setPasswordError(null);
        if (passwordStrength === 1) {
          setPasswordFeedback('Strong password');
        } else {
          setPasswordFeedback('Good password');
        }
      }
      setShowPasswordError(true);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [form.password]);

  useEffect(() => {
    if (confirmPwd.length > 0 && confirmPwd !== form.password) {
      setConfirmError('Passwords do not match');
    } else {
      setConfirmError(null);
    }
  }, [confirmPwd, form.password]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Create a Secure Password
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Make sure your password is strong and unique. You can update it later in Settings.
        </Text>
      </View>

      <AppInput
        label="Password"
        placeholder="Password..."
        secureTextEntry={!passwordVisible}
        value={form.password}
        onChangeText={e => {
          updateForm({ password: e });
          setShowPasswordError(false);
        }}
        rightIcon={
          <MaterialIcons
            name={passwordVisible ? 'visibility-off' : 'visibility'}
            size={20}
            color="#888"
            onPress={togglePwdVisibility}
          />
        }
      />
      <ProgressBar
        progress={passwordStrength}
        color={
          passwordStrength < 0.4
            ? theme.colors.error
            : passwordStrength < 1
              ? theme.colors.primary
              : theme.custom.events.success
        }
        style={styles.progressBar}
      />

      <HelperText
        type={passwordError ? 'error' : 'info'}
        visible={showPasswordError}
        style={{
          color: passwordError
            ? theme.custom.events.error
            : passwordStrength === 1
              ? theme.custom.events.success
              : theme.colors.primary,
        }}
      >
        {passwordError || passwordFeedback || ' '}
      </HelperText>

      <AppInput
        label="Confirm Password"
        placeholder="Confirm Password..."
        secureTextEntry={!confirmVisible}
        value={confirmPwd}
        onChangeText={e => setConfirmPwd(e)}
        rightIcon={
          <MaterialIcons
            name={confirmVisible ? 'visibility-off' : 'visibility'}
            size={20}
            color="#888"
            onPress={toggleConfirmVisibility}
          />
        }
      />
      <HelperText
        type="error"
        visible={!!confirmError}
        style={{ color: theme.custom.events.error }}
      >
        {confirmError}
      </HelperText>
    </View>
  );
};

export default PasswordForm;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingTop: theme.custom.spacing.lg,
      gap: theme.custom.spacing.sm,
    },
    header: {
      marginBottom: theme.custom.spacing.sm,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 20,
    },
    progressBar: {
      marginTop: 8,
      marginBottom: 2,
      height: 6,
      borderRadius: 4,
    },
  });
