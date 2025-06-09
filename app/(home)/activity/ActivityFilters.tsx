import { View, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';
import { FilterOrder } from '@/types';

interface ActivityFiltersProps {
  filterOrder: FilterOrder;
  setFilterOrder: (order: FilterOrder) => void;
}

const ActivityFilters = (props: ActivityFiltersProps) => {
  const { filterOrder, setFilterOrder } = props;
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const getIconColor = (dir: FilterOrder) =>
    filterOrder === dir ? theme.colors.primary : theme.colors.secondary;

  return (
    <View style={styles.container}>
      <View style={styles.iconGroup}>
        <Pressable
          style={({ pressed }) => [styles.iconWrapper, pressed && styles.iconPressed]}
          onPress={() => setFilterOrder('desc')}
        >
          <AntDesign name="down" size={36} color={getIconColor('desc')} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.iconWrapper, pressed && styles.iconPressed]}
          onPress={() => setFilterOrder('asc')}
        >
          <AntDesign name="up" size={36} color={getIconColor('asc')} />
        </Pressable>
      </View>

      <View style={styles.iconGroup}>
        <Pressable style={({ pressed }) => [styles.iconWrapper, pressed && styles.iconPressed]}>
          <Ionicons name="filter-circle-outline" size={36} color={theme.colors.secondary} />
        </Pressable>

        <Pressable style={({ pressed }) => [styles.iconWrapper, pressed && styles.iconPressed]}>
          <Ionicons name="add-circle-outline" size={36} color={theme.colors.secondary} />
        </Pressable>
      </View>
    </View>
  );
};

export default ActivityFilters;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: theme.custom.spacing.sm,
    },
    iconGroup: {
      flexDirection: 'row',
      gap: theme.custom.spacing.sm,
    },
    iconWrapper: {
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.backdrop,
      padding: theme.custom.spacing.sm + 4,
    },
    iconPressed: {
      opacity: 0.6,
    },
  });
