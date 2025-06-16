import { FAB } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useMemo } from 'react';

import GradeRangeDialog from './Dialogs/GradeRangeDailog';
import CalendarDialog from './Dialogs/CalendarDialog';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';
import { IDateRange } from '@/types';

interface ActivityFilterMenuProps {
  open: boolean;
  dateRange: IDateRange;
  openCalendar: boolean;
  openGradeRange: boolean;
  setOpen: (open: boolean) => void;
  setGradeRangeValue: (val: any) => void; // update when known
  setDateRange: (val: IDateRange) => void;
  setOpenCalendar: (bol: boolean) => void;
  setOpenGradeRange: (bol: boolean) => void;
}

const ActivityFilterMenu = (props: ActivityFilterMenuProps) => {
  const {
    open,
    setOpen,
    dateRange,
    openCalendar,
    setDateRange,
    openGradeRange,
    setOpenGradeRange,
    setOpenCalendar,
    setGradeRangeValue,
  } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme, open), [theme, open]);

  const hasCalendarApplied = !!dateRange.startDate;
  const hasGradeRangeApplied = false;
  const fabIconColor =
    !!dateRange.startDate && !open ? theme.colors.primary : theme.colors.secondary;

  return (
    <>
      <GradeRangeDialog
        open={openGradeRange}
        onDismiss={setOpenGradeRange}
        setValue={setGradeRangeValue}
      />
      <CalendarDialog
        open={openCalendar}
        dateRange={dateRange}
        setValue={setDateRange}
        onDismiss={setOpenCalendar}
      />
      <View style={styles.container}>
        <FAB
          small
          icon={open ? 'close' : 'filter'}
          style={styles.displayFab}
          onPress={() => setOpen(!open)}
          color={fabIconColor}
        />

        {open && (
          <View style={styles.expanded}>
            <FAB
              icon="calendar"
              color={hasCalendarApplied ? theme.colors.primary : theme.colors.secondary}
              style={styles.fab}
              onPress={() => setOpenCalendar(true)}
            />
            <FAB
              icon="chart-box"
              color={hasGradeRangeApplied ? theme.colors.primary : theme.colors.secondary}
              style={styles.fab}
              onPress={() => setOpenGradeRange(true)}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default ActivityFilterMenu;

const createStyles = (theme: AppTheme, open: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    displayFab: {
      marginRight: open ? 8 : 0,
      borderRadius: 24,
      backgroundColor: theme.colors.backdrop,
    },
    fab: {
      borderRadius: 24,
      backgroundColor: theme.colors.backdrop,
    },
    expanded: {
      flexDirection: 'row',
      gap: 8,
    },
  });
