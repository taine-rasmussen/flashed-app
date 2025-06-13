import { Portal, Dialog, Button } from 'react-native-paper';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { StyleSheet } from 'react-native';
import { useState } from 'react';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';
import { IDateRange } from '@/types';

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
  const styles = getStyles(theme);

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
      <Dialog visible={open} onDismiss={handleDismiss} style={styles.container}>
        <DateTimePicker
          mode="range"
          styles={defaultStyles}
          navigationPosition={'right'}
          endDate={selected.endDate}
          startDate={selected.startDate}
          onChange={date => setSelected({ startDate: date.startDate, endDate: date.endDate })}
        />
        <Dialog.Actions>
          <Button style={styles.buttons} onPress={handleCancel} mode="contained-tonal">
            Cancel
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

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    buttons: {
      width: '33.33%',
      borderRadius: 16,
    },
    container: {
      padding: theme.custom.spacing.sm,
    },
  });
