import { View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

import AppInput from '@/components/AppInput';
import { useSignup } from '@/contexts/SignupContext';

const UserPreferencesForm = () => {
  const { form, updateForm } = useSignup();

  const btns = [
    {
      value: 'VScale',
      label: 'V Scale',
    },
    {
      value: 'Font',
      label: 'Font',
    },
  ];

  return (
    <View>
      <AppInput
        label="Location"
        placeholder="Location"
        value={form.location}
        onChangeText={e => updateForm({ location: e })}
      />
      <AppInput
        label="Home gym"
        placeholder="Home Gym"
        value={form.homeGym}
        onChangeText={e => updateForm({ homeGym: e })}
      />
      <SegmentedButtons
        buttons={btns}
        value={form.gradeStyle}
        onValueChange={e => updateForm({ gradeStyle: e })}
      />
    </View>
  );
};

export default UserPreferencesForm;
