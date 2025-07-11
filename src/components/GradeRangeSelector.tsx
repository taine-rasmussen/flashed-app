import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  InteractionManager,
} from 'react-native';
import { Text, Chip, Checkbox, Divider, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';
import { GradeStyle } from '@/types';
import { getUsersGrades } from '@/utils/helpers';

interface IGradeRangeSelector {
  value: string[];
  gradeStyle: GradeStyle;
  setValue: (val: string[]) => void;
  multiSelect?: boolean;
  onDismiss?: (bol: boolean) => void;
  isDropDownOpen?: boolean;
}

const GradeRangeSelector = (props: IGradeRangeSelector) => {
  const {
    setValue,
    onDismiss,
    value,
    gradeStyle,
    multiSelect = true,
    isDropDownOpen = false,
  } = props;
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const grades = getUsersGrades(gradeStyle);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedGrades, setSelectedGrades] = useState<string[]>(value);

  const isClearDisabled = selectedGrades.length === 0;
  const isApplyDisabled = selectedGrades.length === 0 && value.length === 0;

  const dropdownText = multiSelect ? 'Select Grades' : 'Select Grade';
  const noGradeSelectedText = multiSelect ? 'No grades selected' : 'No grade selected';

  const toggleGrade = (grade: string) => {
    if (multiSelect) {
      return setSelectedGrades(
        selectedGrades.includes(grade)
          ? selectedGrades.filter(g => g !== grade)
          : [...selectedGrades, grade],
      );
    } else {
      return (
        setSelectedGrades(
          selectedGrades.includes(grade) ? selectedGrades.filter(g => g !== grade) : [grade],
        ),
        setValue([grade]),
        setDropdownOpen(false)
      );
    }
  };

  const handleClear = () => {
    setSelectedGrades([]);
  };

  const handleApply = () => {
    setValue(selectedGrades);
    if (onDismiss) {
      InteractionManager.runAfterInteractions(() => {
        requestAnimationFrame(() => onDismiss(false));
      });
    }
  };

  useEffect(() => {
    if (value.length != 0) {
      setSelectedGrades(value);
    }

    if (isDropDownOpen) {
      setDropdownOpen(true);
    }
  }, []);

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <View>
      <View style={styles.chipWrap}>
        {selectedGrades.length > 0 ? (
          selectedGrades.map(grade => (
            <Chip key={grade} onClose={() => toggleGrade(grade)} style={styles.chip}>
              {grade.toUpperCase()}
            </Chip>
          ))
        ) : (
          <Text style={styles.placeholder}>{noGradeSelectedText}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.dropdownToggle}
        onPress={() => {
          setDropdownOpen(prev => !prev);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}
      >
        <Text style={styles.dropdownToggleText}>{dropdownText}</Text>
        <MaterialIcons
          size={24}
          color={theme.colors.secondary}
          name={dropdownOpen ? 'expand-less' : 'expand-more'}
        />
      </TouchableOpacity>
      <Divider />
      {dropdownOpen && (
        <ScrollView style={styles.listContainer}>
          {grades &&
            grades.map((grade, index) => (
              <View key={grade}>
                <View style={styles.checkboxRow}>
                  <Text style={styles.gradeLabel}>{grade.toUpperCase()}</Text>
                  <Checkbox.Android
                    color={theme.colors.primary}
                    onPress={() => toggleGrade(grade)}
                    status={selectedGrades.includes(grade) ? 'checked' : 'unchecked'}
                    uncheckedColor={theme.colors.secondary}
                  />
                </View>
                {index !== grades.length - 1 && <Divider />}
              </View>
            ))}
        </ScrollView>
      )}
      {multiSelect && (
        <View style={styles.btnContainer}>
          <Button
            style={styles.btn}
            mode="elevated"
            onPress={handleClear}
            disabled={isClearDisabled}
          >
            Clear
          </Button>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={handleApply}
            disabled={isApplyDisabled}
          >
            Apply
          </Button>
        </View>
      )}
    </View>
  );
};

export default GradeRangeSelector;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    chipWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholder: {
      color: '#888',
      fontStyle: 'italic',
    },
    dropdownToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.custom.spacing.sm,
    },
    dropdownToggleText: {
      fontSize: 16,
      fontWeight: '500',
    },
    listContainer: {
      maxHeight: 300,
      borderRadius: theme.roundness,
      marginTop: theme.custom.spacing.sm,
      padding: theme.custom.spacing.sm,
      borderColor: theme.colors.outlineVariant,
      boxShadow: `2px 5px 12px ${theme.colors.surface}`,
    },
    checkboxRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 6,
    },
    gradeLabel: {
      fontSize: 16,
    },
    btnContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.custom.spacing.md,
      paddingTop: theme.custom.spacing.md,
    },
    btn: {
      width: '45%',
    },
  });
