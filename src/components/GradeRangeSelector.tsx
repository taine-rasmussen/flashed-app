import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Text, Chip, Checkbox, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';

const V_GRADES = Array.from({ length: 18 }, (_, i) => `v${i}`);

const GradeRangeSelector = () => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

  const toggleGrade = (grade: string) => {
    setSelectedGrades(
      selectedGrades.includes(grade)
        ? selectedGrades.filter(g => g !== grade)
        : [...selectedGrades, grade],
    );
  };

  console.log(selectedGrades);

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
          <Text style={styles.placeholder}>No grades selected</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.dropdownToggle}
        onPress={() => {
          setDropdownOpen(prev => !prev);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}
      >
        <Text style={styles.dropdownToggleText}>Select Grades</Text>
        <MaterialIcons name={dropdownOpen ? 'expand-less' : 'expand-more'} size={24} />
      </TouchableOpacity>
      <Divider />
      {dropdownOpen && (
        <ScrollView style={styles.listContainer}>
          {V_GRADES.map((grade, index) => (
            <View key={grade}>
              <View style={styles.checkboxRow}>
                <Text style={styles.gradeLabel}>{grade.toUpperCase()}</Text>
                <Checkbox
                  color="red"
                  uncheckedColor="blue"
                  onPress={() => toggleGrade(grade)}
                  status={selectedGrades.includes(grade) ? 'checked' : 'unchecked'}
                />
              </View>
              {index !== V_GRADES.length - 1 && <Divider />}
            </View>
          ))}
        </ScrollView>
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
      paddingVertical: 4,
      justifyContent: 'flex-start',
    },
    chip: {
      flexBasis: '22%', // 4 per row with spacing
      flexGrow: 1,
      margin: 4,
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
  });
