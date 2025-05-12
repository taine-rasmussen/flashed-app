import { View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { HelperText } from 'react-native-paper';

import AppInput from '@/components/AppInput';
import { useSignup } from '@/contexts/SignupContext';

const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = new RegExp(`^[A-Za-z0-9]{${MIN_PASSWORD_LENGTH},}$`);
const DEBOUNCE_MS = 400;

const PasswordForm = () => {
  const { form, updateForm } = useSignup();
  const [confirmPwd, setConfirmPwd] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      if (form.password.length === 0) {
        setPasswordError(null);
      } else if (!PASSWORD_REGEX.test(form.password)) {
        setPasswordError(
          `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain only letters and numbers.`,
        );
      } else {
        setPasswordError(null);
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
    <View>
      <AppInput
        label="Password"
        value={form.password}
        placeholder="Password..."
        secureTextEntry
        onChangeText={e => {
          updateForm({ password: e });
          setShowPasswordError(false);
        }}
      />
      <HelperText type="error" visible={showPasswordError && !!passwordError}>
        {passwordError}
      </HelperText>

      <AppInput
        label="Confirm Password"
        value={confirmPwd}
        placeholder="Confirm Password..."
        secureTextEntry
        onChangeText={e => setConfirmPwd(e)}
      />
      <HelperText type="error" visible={!!confirmError}>
        {confirmError}
      </HelperText>
    </View>
  );
};

export default PasswordForm;
