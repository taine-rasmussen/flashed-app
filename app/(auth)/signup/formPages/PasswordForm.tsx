import { View } from 'react-native';

import AppInput from '@/components/AppInput';

const PasswordForm = () => {
  return (
    <View>
      <AppInput
        label="Password"
        placeholder="Password..."
        //  value={email}
        //  onChangeText={setEmail}
      />
      <AppInput
        label="Confirm Password"
        placeholder="Confirm Password..."
        //  value={email}
        //  onChangeText={setEmail}
      />
    </View>
  );
};

export default PasswordForm;
