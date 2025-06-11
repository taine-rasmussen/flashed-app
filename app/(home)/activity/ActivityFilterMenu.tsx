import { FAB } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useMemo } from 'react';

import GradeRangeDialog from './Dialogs/GradeRangeDailog';
import CalendarDialog from './Dialogs/CalendarDialog';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

interface ActivityFilterMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  openCalendar: boolean;
  openGradeRange: boolean;
  setOpenGradeRange: (bol: boolean) => void;
  setOpenCalendar: (bol: boolean) => void;
  setCalendarValue: (val: any) => void; // update when known
  setGradeRangeValue: (val: any) => void; // update when known
}

const ActivityFilterMenu = (props: ActivityFilterMenuProps) => {
  const {
    open,
    setOpen,
    openCalendar,
    openGradeRange,
    setOpenGradeRange,
    setOpenCalendar,
    setCalendarValue,
    setGradeRangeValue,
  } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme, open), [theme, open]);

  return (
    <>
      <GradeRangeDialog
        open={openGradeRange}
        onDismiss={setOpenGradeRange}
        setValue={setGradeRangeValue}
      />
      <CalendarDialog open={openCalendar} onDismiss={setOpenCalendar} setValue={setCalendarValue} />
      <View style={styles.container}>
        <FAB
          small
          icon={open ? 'close' : 'filter'}
          style={styles.displayFab}
          onPress={() => setOpen(!open)}
        />

        {open && (
          <View style={styles.expanded}>
            <FAB icon="calendar" style={styles.fab} onPress={() => setOpenCalendar(true)} />
            <FAB icon="chart-box" style={styles.fab} onPress={() => setOpenGradeRange(true)} />
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
