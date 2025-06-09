import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

const ActivityFilters = () => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.sortIcons}>
        <AntDesign name="down" size={36} color={theme.colors.primary} />
        <AntDesign name="up" size={36} color={theme.colors.primary} />
      </View>
      <Ionicons name="filter-circle-outline" size={36} color={theme.colors.primary} />
    </View>
  );
};

export default ActivityFilters;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: theme.custom.spacing.sm,
    },
    sortIcons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
