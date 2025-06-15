import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Chip, Checkbox } from 'react-native-paper';

const V_GRADES = Array.from({ length: 18 }, (_, i) => `v${i}`);

type Props = {
  selectedGrades: string[];
  onChange: (grades: string[]) => void;
};

const GradeRangeSelector = ({ selectedGrades, onChange }: Props) => {
  const toggleGrade = (grade: string) => {
    onChange(
      selectedGrades.includes(grade)
        ? selectedGrades.filter(g => g !== grade)
        : [...selectedGrades, grade],
    );
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
        {selectedGrades.length > 0 ? (
          selectedGrades.map(grade => (
            <Chip key={grade} onClose={() => toggleGrade(grade)} style={styles.chip}>
              {grade.toUpperCase()}
            </Chip>
          ))
        ) : (
          <Text style={styles.placeholder}>No grades selected</Text>
        )}
      </ScrollView>

      {/* Checkbox List */}
      <ScrollView style={styles.listContainer}>
        {V_GRADES.map(grade => (
          <View key={grade} style={styles.checkboxRow}>
            <Checkbox
              status={selectedGrades.includes(grade) ? 'checked' : 'unchecked'}
              onPress={() => toggleGrade(grade)}
            />
            <Text style={styles.gradeLabel}>{grade.toUpperCase()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default GradeRangeSelector;

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
  },
  placeholder: {
    color: '#888',
    fontStyle: 'italic',
  },
  listContainer: {
    maxHeight: 300,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  gradeLabel: {
    fontSize: 16,
  },
});
