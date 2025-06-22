import { useState } from 'react';
import { Text, Button, TouchableRipple } from 'react-native-paper';
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

interface IStagedClimb {
  grade: string[];
  attempts: number;
  date: DateType;
  homeGym: string;
}

const AddClimbDialog = ({ open, onDismiss, gradeStyle, homeGym }: IAddClimbDialog) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [stagedClimb, setStagedClimb] = useState<IStagedClimb>({
    grade: [],
    attempts: 0,
    date: dayjs(),
    homeGym: homeGym,
  });

  const setGrade = (grade: string[]) => {
    setStagedClimb(prev => ({ ...prev, grade }));
  };

  const setDate = (date: DateType) => {
    setStagedClimb(prev => ({ ...prev, date }));
  };

  const formattedDate = dayjs(stagedClimb.date).format('DD/MM/YYYY');
  const isFormValid = stagedClimb.grade.length > 0 && stagedClimb.attempts > 0;

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
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={750}
        animationOutTiming={750}
        useNativeDriver
      >
        <View style={styles.container}>
          <View style={styles.section}>
            <GradeRangeSelector
              value={stagedClimb.grade}
              setValue={setGrade}
              gradeStyle={gradeStyle}
              multiSelect={false}
              isDropDownOpen={true}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Attempts</Text>
            <AppInput
              mode="outlined"
              keyboardType="number-pad"
              style={styles.input}
              value={String(stagedClimb.attempts)}
              onChangeText={val =>
                setStagedClimb(prev => ({
                  ...prev,
                  attempts: parseInt(val) || 0,
                }))
              }
              leftIcon={<AntDesign name="reload1" size={20} color={theme.colors.secondary} />}
            />
          </View>

          <TouchableRipple style={styles.row} onPress={() => setOpenCalendar(true)}>
            <>
              <AntDesign name="calendar" size={24} color={theme.colors.secondary} />
              <Text style={styles.rowText}>{formattedDate}</Text>
              <AntDesign name="right" size={16} color={theme.colors.onSurfaceVariant} />
            </>
          </TouchableRipple>

          <View style={styles.row}>
            <AntDesign name="home" size={24} color={theme.colors.secondary} />
            <Text style={styles.rowText}>{homeGym}</Text>
          </View>

          <Button
            mode="contained"
            onPress={() => {
              onDismiss(false);
            }}
            disabled={!isFormValid}
            style={styles.submitButton}
            contentStyle={{ paddingVertical: 6 }}
          >
            Add Climb
          </Button>
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
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    section: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: theme.colors.onSurface,
      marginBottom: 4,
    },
    input: {
      backgroundColor: theme.colors.backdrop,
      borderRadius: 8,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.backdrop,
      padding: 12,
      borderRadius: 10,
      marginBottom: 12,
    },
    rowText: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: theme.colors.onSurface,
    },
    submitButton: {
      marginTop: 8,
      borderRadius: 12,
    },
  });
