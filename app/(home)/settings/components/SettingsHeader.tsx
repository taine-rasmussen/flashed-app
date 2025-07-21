import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

interface SettingsHeaderProps {
  title: string;
  onClose: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  subtitle?: string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  onClose,
  showBackButton = false,
  onBack,
  subtitle,
}) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsHeader;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
      minHeight: 32,
    },
    leftSection: {
      width: 32,
      alignItems: 'flex-start',
    },
    centerSection: {
      flex: 1,
      alignItems: 'center',
    },
    rightSection: {
      width: 32,
      alignItems: 'flex-end',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.onSurface,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.onSurface,
      opacity: 0.7,
      marginTop: 2,
      textAlign: 'center',
    },
    backButton: {
      padding: 4,
    },
    closeButton: {
      padding: 4,
    },
    placeholder: {
      width: 32,
    },
  });
