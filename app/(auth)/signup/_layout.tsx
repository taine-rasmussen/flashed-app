import { Slot, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

import SignupProgressBar from './components/SignupProgressBar';
import SignupFooter from './components/SignupFooter';

import { SignupProvider } from '@/contexts/SignupContext';

const stepRoutes = ['/signup', '/signup/StepTwo', '/signup/StepThree'];
const getStyles = (theme: ThemeProp) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors?.background,
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
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <SignupProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
          <View style={styles.container}>
            {/* todo: add logic to toggle completed steps [0, 1, 2]  */}
            <SignupProgressBar totalSteps={3} currentStep={currentStep} completedSteps={[0]} />
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
