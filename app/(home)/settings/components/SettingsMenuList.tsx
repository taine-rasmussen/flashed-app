import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SettingsMenuItem from './SettingsMenuItem';

export interface MenuItemConfig {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  variant?: 'default' | 'destructive';
  showChevron?: boolean;
  disabled?: boolean;
  section?: 'main' | 'account' | 'preferences' | 'danger';
}

interface SettingsMenuListProps {
  items: MenuItemConfig[];
  separateDestructive?: boolean;
}

const SettingsMenuList: React.FC<SettingsMenuListProps> = ({
  items,
  separateDestructive = true,
}) => {
  const styles = getStyles();

  const regularItems = items.filter(item => item.variant !== 'destructive');
  const destructiveItems = items.filter(item => item.variant === 'destructive');

  const renderSection = (sectionItems: MenuItemConfig[], isLast = false) => (
    <View style={!isLast ? styles.sectionWithMargin : undefined}>
      {sectionItems.map((item, index) => (
        <View key={item.id} style={index > 0 ? styles.itemSpacing : undefined}>
          <SettingsMenuItem
            icon={item.icon}
            label={item.label}
            onPress={item.onPress}
            variant={item.variant}
            disabled={item.disabled}
            showChevron={item.showChevron}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSection(regularItems)}
      {separateDestructive && destructiveItems.length > 0 && renderSection(destructiveItems, true)}
    </View>
  );
};

export default SettingsMenuList;

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    sectionWithMargin: {
      marginBottom: 24,
    },
    itemSpacing: {
      marginTop: 12,
    },
  });
