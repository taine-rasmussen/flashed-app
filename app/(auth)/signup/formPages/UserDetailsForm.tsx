import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import AppInput from '@/components/AppInput';
import { useSignup } from '@/contexts/SignupContext';
import CardWrapper from '@/components/CardWrapper';

const UserDetailsForm = () => {
  const { form, updateForm } = useSignup();

  return (
    <View style={{ display: 'flex', gap: 16 }}>
      <CardWrapper mode="elevated">
        <Text style={styles.header} variant="displayLarge">
          Welcome To Flashed
        </Text>
      </CardWrapper>
      <CardWrapper>
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
      </CardWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
  },
});

export default UserDetailsForm;
