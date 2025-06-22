import { useState } from 'react';
import { IconButton, Text } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { DateType } from 'react-native-ui-datepicker';
import Modal from 'react-native-modal';

import GradeRangeSelector from '@/components/GradeRangeSelector';
import { GradeStyle } from '@/types';
import AppInput from '@/components/AppInput';
import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';
import CalendarBottomSheet from '@/components/CalendarBottomSheet';

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
      <CalendarBottomSheet
        open={openCalendar}
        onDismiss={setOpenCalendar}
        mode="single"
        onDateChange={setDate}
      />
      <Modal
        isVisible={open}
        onBackdropPress={() => onDismiss(false)}
        style={styles.modal}
        backdropTransitionOutTiming={5}
      >
        <View style={styles.container}>
          <GradeRangeSelector
            value={stagedClimb.grade}
            setValue={setGrade}
            gradeStyle={gradeStyle}
            multiSelect={false}
            isDropDownOpen={true}
          />
          <View style={styles.attemptsContainer}>
            <AppInput
              mode="outlined"
              label="Attempts"
              style={styles.attemptsInput}
              keyboardType="number-pad"
              value={String(stagedClimb.attempts)}
              onChangeText={value =>
                setStagedClimb(prev => ({
                  ...prev,
                  attempts: parseInt(value),
                }))
              }
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
            <View style={styles.homeGym}>
              <AntDesign name="home" size={32} color={theme.colors.secondary} />
              <Text variant="bodyLarge">{homeGym}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddClimbDialog;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: theme.custom.spacing.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 10,
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
    homeGym: {
      flexDirection: 'row',
      gap: theme.custom.spacing.md,
      alignItems: 'center',
    },
  });
