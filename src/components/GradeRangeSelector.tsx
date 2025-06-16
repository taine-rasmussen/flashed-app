import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Chip, Checkbox, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const V_GRADES = Array.from({ length: 18 }, (_, i) => `v${i}`);

type Props = {
  selectedGrades: string[];
  onChange: (grades: string[]) => void;
};

const GradeRangeSelector = ({ selectedGrades, onChange }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

      {/* Dropdown Toggle */}
      <TouchableOpacity
        style={styles.dropdownToggle}
        onPress={() => setDropdownOpen(prev => !prev)}
      >
        <Text style={styles.dropdownToggleText}>Select Grades</Text>
        <MaterialIcons name={dropdownOpen ? 'expand-less' : 'expand-more'} size={24} />
      </TouchableOpacity>
      <Divider />

      {dropdownOpen && (
        <ScrollView style={styles.listContainer}>
          {V_GRADES.map(grade => (
            <View key={grade} style={styles.checkboxRow}>
              <Checkbox
                status={selectedGrades.includes(grade) ? 'checked' : 'unchecked'}
                onPress={() => toggleGrade(grade)}
                color="red"
                uncheckedColor="blue"
              />
              <Text style={styles.gradeLabel}>{grade.toUpperCase()}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default GradeRangeSelector;

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
  },
  placeholder: {
    color: '#888',
    fontStyle: 'italic',
  },
  dropdownToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownToggleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  listContainer: {
    maxHeight: 300,
    marginTop: 4,
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
