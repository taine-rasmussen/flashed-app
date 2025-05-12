import { View } from 'react-native';

import AppInput from '@/components/AppInput';

const UserPreferencesForm = () => {
  return (
    <View>
      <AppInput
        label="Location"
        placeholder="Location"
        //  value={email}
        //  onChangeText={setEmail}
      />
      <AppInput
        label="Home gym"
        placeholder="Home Gym"
        //  value={email}
        //  onChangeText={setEmail}
      />
      <AppInput
        label="Grade Style"
        // placeholder="Password..."
        //  value={email}
        //  onChangeText={setEmail}
      />
    </View>
  );
};

export default UserPreferencesForm;
