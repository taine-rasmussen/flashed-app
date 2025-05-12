import { View } from 'react-native';

import AppInput from '@/components/AppInput';
import { useSignup } from '@/contexts/SignupContext';

const UserDetailsForm = () => {
  const { form, updateForm } = useSignup();

  return (
    <View>
      <AppInput
        label="First Name"
        placeholder="First name..."
        value={form.firstName}
        onChangeText={e => updateForm({ firstName: e })}
      />
      <AppInput
        label="Last Name"
        placeholder="Last name..."
        value={form.lastName}
        onChangeText={e => updateForm({ lastName: e })}
      />
      <AppInput
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={e => updateForm({ email: e })}
      />
    </View>
  );
};

export default UserDetailsForm;
