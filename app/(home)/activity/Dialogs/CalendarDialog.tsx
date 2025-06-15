import { Portal, Dialog, Button } from 'react-native-paper';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import dayjs from 'dayjs';

import { IDateRange } from '@/types';
import { useAppTheme } from '@/theme';

interface ICalendarDialog {
  open: boolean;
  setValue: (val: IDateRange) => void;
  onDismiss: (bol: boolean) => void;
}

const INIT_STATE = { startDate: null, endDate: null };

const CalendarDialog = (props: ICalendarDialog) => {
  const { open, onDismiss, setValue } = props;
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

  return (
    <Portal>
      <Dialog visible={open} onDismiss={handleDismiss}>
        <DateTimePicker
          mode="range"
          maxDate={tomorrow}
          styles={{
            ...defaultStyles,
            today: {
              borderColor: theme.colors.secondary,
              borderWidth: 2,
            },
            selected: { backgroundColor: theme.colors.primary },
          }}
          endDate={selected.endDate}
          navigationPosition={'right'}
          startDate={selected.startDate}
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
    buttons: {
      width: '33.33%',
      borderRadius: 16,
    },
  });
