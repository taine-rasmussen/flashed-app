import { Portal, Dialog, Button } from 'react-native-paper';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import dayjs from 'dayjs';

import { IDateRange } from '@/types';
import { useAppTheme } from '@/theme';

interface ICalendarDialog {
  open: boolean;
  dateRange: IDateRange;
  setValue: (val: IDateRange) => void;
  onDismiss: (bol: boolean) => void;
}

const INIT_STATE = { startDate: null, endDate: null };

const CalendarDialog = (props: ICalendarDialog) => {
  const { open, onDismiss, setValue, dateRange } = props;
  const [selected, setSelected] = useState<IDateRange>(INIT_STATE);
  const handleDismiss = () => onDismiss(false);
  const defaultStyles = useDefaultStyles();
  const theme = useAppTheme();
  const styles = getStyles();
  const tomorrow = dayjs();

  const handleApply = () => {
    setValue(selected);
    onDismiss(false);
  };

  const handleCancel = () => {
    setSelected(INIT_STATE);
    setValue(INIT_STATE);
    onDismiss(false);
  };

  const startDate = dateRange.startDate != null ? dateRange.startDate : selected.startDate;
  const endDate = dateRange.endDate != null ? dateRange.endDate : selected.endDate;

  return (
    <Portal>
      <Dialog visible={open} onDismiss={handleDismiss} style={styles.container}>
        <DateTimePicker
          styles={{
            ...defaultStyles,
            today: {
              borderColor: theme.colors.secondary,
              borderWidth: 2,
            },
            selected: { backgroundColor: theme.colors.primary },
          }}
          mode="range"
          endDate={endDate}
          maxDate={tomorrow}
          startDate={startDate}
          navigationPosition={'right'}
          onChange={date => setSelected({ startDate: date.startDate, endDate: date.endDate })}
        />
        <Dialog.Actions>
          <Button style={styles.buttons} onPress={handleCancel} mode="contained-tonal">
            Clear
          </Button>
          <Button style={styles.buttons} onPress={handleApply} mode="contained">
            Apply
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CalendarDialog;

const getStyles = () =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    buttons: {
      width: '33.33%',
      borderRadius: 16,
    },
  });
