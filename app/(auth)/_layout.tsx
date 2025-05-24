import { LinearGradient } from 'expo-linear-gradient';
import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppTheme } from '@/theme';

export default function AuthLayout() {
  const theme = useAppTheme();
  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={theme.custom.gradient.colours as [string, string, ...string[]]}
        start={theme.custom.gradient.start}
        end={theme.custom.gradient.end}
        style={styles.container}
      >
        <View style={styles.container}>
          <Slot />
        </View>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
