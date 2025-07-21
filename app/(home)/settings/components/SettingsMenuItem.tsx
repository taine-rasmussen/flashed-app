import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

interface SettingsMenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  variant?: 'default' | 'destructive';
  showChevron?: boolean;
  disabled?: boolean;
}

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
  icon,
  label,
  onPress,
  variant = 'default',
  showChevron = true,
  disabled = false,
}) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const isDestructive = variant === 'destructive';
  const iconColor = isDestructive ? '#FF3B30' : theme.colors.onSurface;
  const textColor = isDestructive ? '#FF3B30' : theme.colors.onSurface;
  const chevronColor = isDestructive ? '#FF3B30' : theme.colors.onSurface;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isDestructive && styles.destructiveContainer,
        disabled && styles.disabledContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={styles.content}>
        <Ionicons name={icon} size={20} color={iconColor} style={disabled && styles.disabledIcon} />
        <Text
          style={[
            styles.text,
            isDestructive && styles.destructiveText,
            disabled && styles.disabledText,
            { color: textColor },
          ]}
        >
          {label}
        </Text>
        {showChevron && (
          <Ionicons
            name="chevron-forward"
            size={16}
            color={chevronColor}
            style={[styles.chevron, disabled && styles.disabledChevron]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SettingsMenuItem;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.backdrop,
      padding: 16,
      borderRadius: 10,
    },
    destructiveContainer: {
      borderWidth: 1,
      borderColor: '#FF3B30',
    },
    disabledContainer: {
      opacity: 0.5,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    text: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: theme.colors.onSurface,
    },
    destructiveText: {
      fontWeight: '500',
      color: '#FF3B30',
    },
    disabledText: {
      opacity: 0.5,
    },
    chevron: {
      opacity: 0.6,
    },
    disabledChevron: {
      opacity: 0.3,
    },
    disabledIcon: {
      opacity: 0.5,
    },
  });
