import { View } from 'react-native';
import { useState } from 'react';

import AppInput from '@/components/AppInput';
import { useSignup } from '@/contexts/SignupContext';

const PasswordForm = () => {
  const { form, updateForm } = useSignup();
  const [confirmPwd, setConfirmPwd] = useState<string>();

  return (
    <View>
      <AppInput
        label="Password"
        placeholder="Password..."
        value={form.password}
        onChangeText={e => updateForm({ password: e })}
      />
      <AppInput
        label="Confirm Password"
        placeholder="Confirm Password..."
        value={confirmPwd}
        onChangeText={e => setConfirmPwd(e)}
      />
    </View>
  );
};

export default PasswordForm;
