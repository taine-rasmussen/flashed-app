import { useState } from 'react';
import { Dialog, Divider, IconButton, Portal, Text } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { DateType } from 'react-native-ui-datepicker';

import GradeRangeSelector from '@/components/GradeRangeSelector';
import { GradeStyle } from '@/types';
import AppInput from '@/components/AppInput';
import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';
import CalendarDialog from '@/components/CalendarDialog';

interface IAddClimbDialog {
  open: boolean;
  gradeStyle: GradeStyle;
  onDismiss: (bol: boolean) => void;
  homeGym: string;
}

const AddClimbDialog = (props: IAddClimbDialog) => {
  const { open, onDismiss, gradeStyle, homeGym } = props;
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [stagedClimb, setStagedClimb] = useState<{
    grade: string[];
    attempts: number;
    date: any;
    homeGym: string;
  }>({
    grade: [],
    attempts: 0,
    date: dayjs().format('DD/MM/YYYY'),
    homeGym: homeGym,
  });

  const dateOfClimb = stagedClimb.date;

  const setGrade = (grade: string[]) => {
    setStagedClimb(prev => ({ ...prev, grade }));
  };

  const setDate = (date: DateType) => {
    setStagedClimb(prev => ({ ...prev, date }));
  };

  const handleOpenCalendar = () => setOpenCalendar(true);

  return (
    <>
      <CalendarDialog
        open={openCalendar}
        onDismiss={setOpenCalendar}
        mode="single"
        onDateChange={setDate}
      />
      <Portal>
        {open && (
          <Dialog visible={open} onDismiss={() => onDismiss(false)}>
            <Dialog.Content style={styles.container}>
              <GradeRangeSelector
                value={stagedClimb.grade}
                setValue={setGrade}
                gradeStyle={gradeStyle}
                multiSelect={false}
              />
              <Divider bold horizontalInset style={styles.divider} />
              <View style={styles.attemptsContainer}>
                <AppInput
                  mode="outlined"
                  label={'Attempts'}
                  style={styles.attemptsInput}
                  leftIcon={<AntDesign name="reload1" size={24} color={theme.colors.secondary} />}
                />
                <View style={styles.dateContainer}>
                  <IconButton
                    icon="calendar"
                    iconColor={theme.colors.secondary}
                    size={32}
                    onPress={handleOpenCalendar}
                  />
                  <Text variant="bodyLarge">{dateOfClimb}</Text>
                </View>
                <Text variant="bodyLarge">{homeGym}</Text>
              </View>
            </Dialog.Content>
          </Dialog>
        )}
      </Portal>
    </>
  );
};

export default AddClimbDialog;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      //   gap: theme.custom.spacing.sm,
    },
    attemptsContainer: {
      flexDirection: 'column',
      gap: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    attemptsInput: {
      width: '100%',
      backgroundColor: theme.colors.backdrop,
    },
    divider: {
      height: 4,
      borderRadius: 4,
    },
  });
