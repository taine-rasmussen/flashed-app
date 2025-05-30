import { Slot, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import SignupProgressBar from './components/SignupProgressBar';
import SignupFooter from './components/SignupFooter';

import { SignupProvider } from '@/contexts/SignupContext';

const stepRoutes = ['/signup', '/signup/StepTwo', '/signup/StepThree'];

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#ccc',
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      padding: 20,
    },
  });

export default function SignupLayout() {
  const pathname = usePathname();
  const currentStep = stepRoutes.indexOf(pathname) + 1;
  const styles = getStyles();

  return (
    <SignupProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
          <View style={styles.container}>
            <SignupProgressBar totalSteps={3} currentStep={currentStep} />
            <View style={styles.content}>
              <Slot />
            </View>
          </View>
          <SignupFooter />
        </SafeAreaView>
      </SafeAreaProvider>
    </SignupProvider>
  );
}
