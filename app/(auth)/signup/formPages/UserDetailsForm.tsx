import { View } from 'react-native';

import AppInput from '@/components/AppInput';

const UserDetailsForm = () => {
  return (
    <View>
      <AppInput
        label="First Name"
        placeholder="you@example.com"
        //  value={email}
        //  onChangeText={setEmail}
      />
      <AppInput
        label="Last Name"
        placeholder="you@example.com"
        //  value={email}
        //  onChangeText={setEmail}
      />
      <AppInput
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        //  value={email}
        //  onChangeText={setEmail}
      />
    </View>
  );
};

export default UserDetailsForm;
