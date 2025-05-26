import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';

const LoginFooter = () => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Already have an account?{' '}
        <Link href="/login" style={styles.linkText}>
          Login
        </Link>
      </Text>
    </View>
  );
};

export default LoginFooter;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: '33%',
    },
    text: {
      fontSize: 14,
      color: theme.colors.text,
    },
    linkText: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
      fontWeight: 'bold',
    },
  });
