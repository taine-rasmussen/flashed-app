import { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  Easing,
  Alert,
} from 'react-native';
import { Text, Button, TouchableRipple } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import dayjs from 'dayjs';
import { DateType } from 'react-native-ui-datepicker';
import Modal from 'react-native-modal';

import GradeRangeSelector from '@/components/GradeRangeSelector';
import { GradeStyle, IStagedClimb } from '@/types';
import AppInput from '@/components/AppInput';
import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';
import DatePicker from '@/components/DatePicker';
import { addClimb } from '@/services/addClimb';

interface IAddClimbDialog {
  open: boolean;
  userId: number;
  homeGym: string;
  gradeStyle: GradeStyle;
  refetchClimbs: () => void;
  stagedClimb: IStagedClimb;
  onDismiss: (bol: boolean) => void;
  setStagedClimb: (val: IStagedClimb | ((prev: IStagedClimb) => IStagedClimb)) => void;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AddClimbDialog = ({
  open,
  userId,
  homeGym,
  onDismiss,
  gradeStyle,
  stagedClimb,
  refetchClimbs,
  setStagedClimb,
}: IAddClimbDialog) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const animation = useRef(new Animated.Value(0)).current;

  const toggleCalendar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCalendarOpen(prev => {
      animateCalendar(!prev);
      return !prev;
    });
  };

  const animateCalendar = (open: boolean) => {
    Animated.timing(animation, {
      toValue: open ? 1 : 0,
      duration: 325,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const calendarHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 380],
  });

  const setGrade = (grade: string[]) => {
    setStagedClimb((prev: IStagedClimb) => ({ ...prev, grade }));
  };

  const setDate = (date: DateType) => {
    setStagedClimb((prev: IStagedClimb) => ({ ...prev, date }));
  };

  const setAttempts = (attempts: string) => {
    setStagedClimb((prev: IStagedClimb) => ({ ...prev, attempts }));
  };

  const handleDismiss = () => {
    onDismiss(false);
    setStagedClimb({
      grade: [],
      attempts: '',
      date: dayjs(),
      homeGym: homeGym,
    });
  };

  const handleAddClimb = async () => {
    try {
      await addClimb(stagedClimb, userId, gradeStyle, 7);
      Alert.alert('Success', 'Climb added successfully');
    } catch (err) {
      console.error('Failed to add climb', err);
      Alert.alert('Error', 'Failed to add climb');
    } finally {
      handleDismiss();
      refetchClimbs();
    }
  };

  const formattedDate = dayjs(stagedClimb.date).format('DD/MM/YYYY');
  const isFormValid = stagedClimb.grade.length > 0 && parseInt(stagedClimb.attempts) > 0;

  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => handleDismiss()}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={750}
      animationOutTiming={750}
      useNativeDriver
      avoidKeyboard
    >
      <View style={styles.container}>
        <GradeRangeSelector
          value={stagedClimb.grade}
          setValue={setGrade}
          gradeStyle={gradeStyle}
          multiSelect={false}
          isDropDownOpen={true}
        />

        <AppInput
          mode="outlined"
          keyboardType="number-pad"
          inputMode="numeric"
          style={styles.input}
          value={String(stagedClimb.attempts)}
          onChangeText={setAttempts}
          leftIcon={<AntDesign name="reload1" size={20} color={theme.colors.secondary} />}
        />

        <TouchableRipple style={styles.row} onPress={toggleCalendar}>
          <View style={styles.rowContent}>
            <AntDesign name="calendar" size={24} color={theme.colors.secondary} />
            <Text style={styles.rowText}>{formattedDate}</Text>
            <AntDesign
              name={calendarOpen ? 'up' : 'down'}
              size={16}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        </TouchableRipple>

        {calendarOpen && (
          <Animated.View style={{ overflow: 'hidden', height: calendarHeight }}>
            <DatePicker mode="single" onDateChange={setDate} />
          </Animated.View>
        )}

        <View style={styles.row}>
          <AntDesign name="home" size={24} color={theme.colors.secondary} />
          <Text style={styles.rowText}>{stagedClimb.homeGym}</Text>
        </View>

        <Button
          mode="contained"
          onPress={() => handleAddClimb()}
          disabled={!isFormValid}
          style={styles.submitButton}
          contentStyle={{ paddingVertical: 6 }}
        >
          Add Climb
        </Button>
      </View>
    </Modal>
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
      padding: 24,
      gap: 16,
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
    rowContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.backdrop,
      padding: 12,
      borderRadius: 10,
    },
    rowText: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: theme.colors.onSurface,
    },
    accordion: {
      backgroundColor: theme.colors.backdrop,
      borderRadius: 10,
      marginBottom: 12,
    },
    submitButton: {
      marginTop: 8,
      borderRadius: 12,
    },
  });

// TODO: Fetch gyms for user on app init or profile page
//       (already done via GET /get_gyms)

// TODO: Store each gym with its full object:
// gyms = [
//   { id: 7, name: "Boulders Vanløse", is_default: true, grade_ranges: [...] },
//   ...
// ]

// TODO: In the add climb screen:
// - Present dropdown of gyms by name (or auto-select home gym).

// TODO: When user selects or confirms gym:
// - Capture gym.id (integer) and gym.scale/ranges if needed.

// TODO: When user submits a climb:
// - Include `gym_id: selectedGym.id` in the payload
// - Example payload:
//   {
//     gym_id: 7,
//     grade: "V3-V5",
//     scale: "Gym",
//     attempts: 2
//   }

// TODO: Ensure scale is "Gym" if using custom ranges, or "VScale"/"Font" otherwise.
