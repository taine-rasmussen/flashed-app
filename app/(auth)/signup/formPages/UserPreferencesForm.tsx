import { View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

import AppInput from '@/components/AppInput';
import { useSignup } from '@/contexts/SignupContext';

const UserPreferencesForm = () => {
  const { form, updateForm } = useSignup();

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
      <SegmentedButtons
        value={form.gradeStyle}
        onValueChange={e => updateForm({ gradeStyle: e })}
        buttons={[
          {
            value: 'VScale',
            label: 'V Scale',
          },
          {
            value: 'Font',
            label: 'Font',
          },
        ]}
      />
    </View>
  );
};

export default UserPreferencesForm;
