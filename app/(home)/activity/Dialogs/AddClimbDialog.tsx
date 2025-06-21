import { useState } from 'react';
import { Dialog, Divider, IconButton, Portal } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, StyleSheet } from 'react-native';

import GradeRangeSelector from '@/components/GradeRangeSelector';
import { GradeStyle } from '@/types';
import AppInput from '@/components/AppInput';
import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

interface IAddClimbDialog {
  open: boolean;
  gradeStyle: GradeStyle;
  onDismiss: (bol: boolean) => void;
}

const AddClimbDialog = (props: IAddClimbDialog) => {
  const { open, onDismiss, gradeStyle } = props;
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const [stagedClimb, setStagedClimb] = useState<{ grade: string[]; attempts: number }>({
    grade: [],
    attempts: 0,
  });

  const setGrade = (grade: string[]) => {
    setStagedClimb(prev => ({ ...prev, grade }));
  };

  return (
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
              <IconButton
                icon="calendar"
                iconColor={theme.colors.secondary}
                size={32}
                onPress={() => console.log('Pressed')}
              />
            </View>
          </Dialog.Content>
        </Dialog>
      )}
    </Portal>
  );
};

export default AddClimbDialog;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      gap: theme.custom.spacing.sm,
    },
    attemptsContainer: {
      flexDirection: 'row',
      gap: 8,
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
