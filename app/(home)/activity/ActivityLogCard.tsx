import { Card, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Climb } from '@/types';
import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';

interface IActivityLogCard {
  climb: Climb;
  index: number;
}

const ActivityLogCard = (props: IActivityLogCard) => {
  const {
    index,
    climb: { grade, attempts, created_at },
  } = props;

  const date = new Date(created_at).toLocaleDateString();
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <Card style={styles.card} elevation={5} key={index}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.grade}>
          {grade}
        </Text>
        <View style={styles.row}>
          <AntDesign name="reload1" size={24} color="black" />
          <Text variant="bodyMedium" style={styles.attempts}>
            {attempts}
          </Text>
        </View>
        <View style={styles.row}>
          <FontAwesome6 name="calendar-days" size={24} color="black" />
          <Text variant="bodySmall" style={styles.date}>
            {date}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      margin: theme.custom.spacing.sm,
      borderRadius: 16,
    },
    content: {
      padding: 16,
    },
    grade: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 8,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.custom.spacing.sm,
    },
    attempts: {
      fontSize: 16,
      marginBottom: 4,
    },
    date: {
      fontSize: 14,
      color: '#6e6e6e',
    },
  });

export default ActivityLogCard;
