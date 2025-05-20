import { View, StyleSheet, Text } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import AppInput from '@/components/AppInput';
import { useSignup } from '@/contexts/SignupContext';
import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

const UserPreferencesForm = () => {
  const { form, updateForm } = useSignup();
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const btns = [
    {
      value: 'VScale',
      label: 'V Scale',
      style: {
        backgroundColor: form.gradeStyle === 'VScale' ? theme.colors.primary : undefined,
      },
      labelStyle: {
        color: form.gradeStyle === 'VScale' ? theme.colors.onPrimary : theme.colors.onSurface,
      },
    },
    {
      value: 'Font',
      label: 'Font',
      style: {
        backgroundColor: form.gradeStyle === 'Font' ? theme.colors.primary : undefined,
      },
      labelStyle: {
        color: form.gradeStyle === 'Font' ? theme.colors.onPrimary : theme.colors.onSurface,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Your Climbing Preferences
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          This info helps personalize your experience, including grade formats and local
          recommendations.
        </Text>
        <Text style={[styles.note, { color: theme.colors.onSurfaceVariant }]}>
          You can update these anytime in Settings.
        </Text>
      </View>

      <AppInput
        leftIcon={<MaterialIcons name="map" size={20} color="#888" />}
        labelAbove="Location"
        placeholder="Enter your location..."
        value={form.location}
        onChangeText={e => updateForm({ location: e })}
      />

      <AppInput
        leftIcon={<MaterialIcons name="home" size={20} color="#888" />}
        labelAbove="Home Gym"
        placeholder="Enter your home gym..."
        value={form.homeGym}
        onChangeText={e => updateForm({ homeGym: e })}
      />

      <View style={styles.segmentedContainer}>
        <Text style={[styles.segmentedLabel, { color: theme.colors.onBackground }]}>
          Preferred Grading System
        </Text>
        <SegmentedButtons
          buttons={btns}
          value={form.gradeStyle}
          onValueChange={e => updateForm({ gradeStyle: e })}
          style={styles.segmentedButtons}
        />
      </View>
    </View>
  );
};

export default UserPreferencesForm;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingTop: theme.custom.spacing.lg,
      gap: theme.custom.spacing.sm,
    },
    header: {
      marginBottom: theme.custom.spacing.sm,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 20,
    },
    segmentedContainer: {
      marginTop: theme.custom.spacing.sm,
    },
    segmentedLabel: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 8,
    },
    segmentedButtons: {
      borderRadius: 12,
    },
    note: {
      fontSize: 12,
      marginTop: 4,
    },
  });
