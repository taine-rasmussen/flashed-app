import { useRouter, usePathname } from 'expo-router';
import { View, Button } from 'react-native';

const steps = ['/signup', '/signup/StepTwo', '/signup/StepThree'];

const SignupFooter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentIndex = steps.indexOf(pathname);

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      router.push(steps[currentIndex + 1]);
    } else {
      console.log('Submit user data');
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      router.push(steps[currentIndex - 1]);
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
      {currentIndex > 0 && <Button title="Back" onPress={goBack} />}
      <Button title={currentIndex < steps.length - 1 ? 'Continue' : 'Finish'} onPress={goNext} />
    </View>
  );
};

export default SignupFooter;
