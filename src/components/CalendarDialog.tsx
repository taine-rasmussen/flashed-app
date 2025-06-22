import dayjs from 'dayjs';
import { useState } from 'react';
import { Dialog, Portal } from 'react-native-paper';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

import { IDateRange } from '@/types';
import { useAppTheme } from '@/theme';

type Mode = 'range' | 'single';

interface ICalendarDialog {
  open: boolean;
  onDismiss: (bol: boolean) => void;
  mode: Mode;
  onDateChange: (date: string) => void;
}

const CalendarDialog = ({ open, onDismiss, mode, onDateChange }: ICalendarDialog) => {
  const theme = useAppTheme();
  const defaultStyles = useDefaultStyles();
  const tomorrow = dayjs();

  const [rangeDate, setRangeDate] = useState<IDateRange>({ startDate: null, endDate: null });
  const [singleDate, setSingleDate] = useState<DateType>(new Date());

  return (
    <Portal>
      <Dialog visible={open} onDismiss={() => onDismiss(false)}>
        {mode === 'range' ? (
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
            maxDate={tomorrow}
            navigationPosition="right"
            startDate={rangeDate.startDate}
            endDate={rangeDate.endDate}
            onChange={(date: IDateRange) => {
              setRangeDate({ startDate: date.startDate, endDate: date.endDate });
            }}
          />
        ) : (
          <DateTimePicker
            styles={{
              ...defaultStyles,
              today: {
                borderColor: theme.colors.secondary,
                borderWidth: 2,
              },
              selected: { backgroundColor: theme.colors.primary },
            }}
            mode="single"
            maxDate={tomorrow}
            date={singleDate}
            navigationPosition="right"
            onChange={({ date }) => {
              setSingleDate(date);
              onDateChange(dayjs(date).format('DD/MM/YYYY'));
              onDismiss(false);
            }}
          />
        )}
      </Dialog>
    </Portal>
  );
};

export default CalendarDialog;
