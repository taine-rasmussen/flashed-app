import { View, StyleSheet } from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useAppTheme } from '@/theme';
import { IDateRange } from '@/types';
import { AppTheme } from '@/theme/types';

type Mode = 'range' | 'single';

interface IDatePickerProps {
  mode: Mode;
  onDateChange: (date: string) => void;
}

const DatePicker = ({ mode, onDateChange }: IDatePickerProps) => {
  const theme = useAppTheme();
  const defaultStyles = useDefaultStyles();
  const tomorrow = dayjs();
  const styles = getStyles(theme);

  const [rangeDate, setRangeDate] = useState<IDateRange>({ startDate: null, endDate: null });
  const [singleDate, setSingleDate] = useState<DateType>(new Date());

  return (
    <View style={styles.container}>
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
          }}
        />
      )}
    </View>
  );
};

export default DatePicker;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      margin: 4,
      backgroundColor: theme.colors.backdrop,
      borderRadius: 25,
      padding: theme.custom.spacing.md,
      shadowColor: '#221b29',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 10,
    },
  });
