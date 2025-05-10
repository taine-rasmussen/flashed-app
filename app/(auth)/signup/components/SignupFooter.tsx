import { useRouter, usePathname } from 'expo-router';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

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

  const buttonPosition = currentIndex < 1 ? 'flex-end' : 'space-between';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: buttonPosition,
        padding: 20,
      }}
    >
      {currentIndex > 0 && (
        <Button onPress={goBack} mode="contained">
          Back
        </Button>
      )}
      <Button onPress={goNext} mode="contained">
        {currentIndex < steps.length - 1 ? 'Continue' : 'Finish'}
      </Button>
    </View>
  );
};

export default SignupFooter;
