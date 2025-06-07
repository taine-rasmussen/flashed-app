import { Card, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { Climb } from '@/types';

interface IActivityLogCard {
  climb: Climb;
}

const ActivityLogCard = (props: IActivityLogCard) => {
  const {
    climb: { grade, attempts, created_at },
  } = props;
  const date = new Date(created_at).toLocaleDateString();

  return (
    <Card style={styles.card} elevation={5}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.grade}>
          {grade}
        </Text>
        <Text variant="bodyMedium" style={styles.attempts}>
          Attempts: {attempts}
        </Text>
        <Text variant="bodySmall" style={styles.date}>
          {date}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  grade: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
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
