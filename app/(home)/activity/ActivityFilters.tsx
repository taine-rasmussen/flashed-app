import { View, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

import ActivityFilterMenu from './ActivityFilterMenu';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';
import { FilterOrder, IDateRange } from '@/types';

interface ActivityFiltersProps {
  dateRange: IDateRange;
  openCalendar: boolean;
  openGradeRange: boolean;
  filterOrder: FilterOrder;
  setGradeRangeValue: (val: any) => void; // update type
  setOpenCalendar: (bol: boolean) => void;
  setDateRange: (val: IDateRange) => void;
  setOpenGradeRange: (bol: boolean) => void;
  setFilterOrder: (order: FilterOrder) => void;
}

const ActivityFilters = (props: ActivityFiltersProps) => {
  const {
    dateRange,
    filterOrder,
    openCalendar,
    openGradeRange,
    setFilterOrder,
    setOpenCalendar,
    setDateRange,
    setOpenGradeRange,
    setGradeRangeValue,
  } = props;
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const [fabOpen, setFabOpen] = useState(false);

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
        <ActivityFilterMenu
          open={fabOpen}
          setOpen={setFabOpen}
          dateRange={dateRange}
          setDateRange={setDateRange}
          openCalendar={openCalendar}
          openGradeRange={openGradeRange}
          setOpenCalendar={setOpenCalendar}
          setOpenGradeRange={setOpenGradeRange}
          setGradeRangeValue={setGradeRangeValue}
        />

        {!fabOpen && (
          <Pressable style={({ pressed }) => [styles.iconWrapper, pressed && styles.iconPressed]}>
            <Ionicons name="add-circle-outline" size={36} color={theme.colors.secondary} />
          </Pressable>
        )}
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
      alignItems: 'center',
      gap: theme.custom.spacing.sm,
    },
    iconWrapper: {
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.backdrop,
      padding: theme.custom.spacing.sm + 4,
    },
    iconPressed: {
      opacity: 0.6,
    },
  });
