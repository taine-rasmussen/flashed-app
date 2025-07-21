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

  const groupedItems = regularItems.reduce(
    (groups, item) => {
      const section = item.section || 'main';
      if (!groups[section]) {
        groups[section] = [];
      }
      groups[section].push(item);
      return groups;
    },
    {} as Record<string, MenuItemConfig[]>,
  );

  const renderSection = (sectionItems: MenuItemConfig[], isLast = false) => (
    <View style={[!isLast && styles.sectionWithMargin]}>
      {sectionItems.map((item, index) => (
        <View key={item.id} style={index > 0 ? styles.itemSpacing : undefined}>
          <SettingsMenuItem
            icon={item.icon}
            label={item.label}
            onPress={item.onPress}
            variant={item.variant}
            showChevron={item.showChevron}
            disabled={item.disabled}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {Object.keys(groupedItems).length > 1
        ? // Multiple sections
          Object.entries(groupedItems).map(([sectionKey, sectionItems], index) => (
            <View key={sectionKey}>
              {renderSection(
                sectionItems,
                index === Object.keys(groupedItems).length - 1 && destructiveItems.length === 0,
              )}
            </View>
          ))
        : // Single section (all regular items)
          renderSection(regularItems, destructiveItems.length === 0)}

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
