import { Card, Text, Divider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Climb } from '@/types';
import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';
import { getGradeColor } from '@/utils/helpers';

interface IActivityLogCard {
  climb: Climb;
}

const ActivityLogCard = (props: IActivityLogCard) => {
  const {
    climb: { grade, attempts, created_at },
  } = props;

  const date = new Date(created_at).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const flagColor = getGradeColor(grade);

  return (
    <Card style={styles.card} elevation={5}>
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.grade}>
          {grade}
        </Text>
        <Divider bold style={styles.divider} />
        <View style={styles.contentCol}>
          <View style={styles.row}>
            <AntDesign name="reload1" size={24} color={theme.colors.text} />
            <Text style={styles.text} variant="bodyLarge">
              {attempts}
            </Text>
          </View>
          <View style={styles.row}>
            <FontAwesome6 name="calendar-days" size={24} color={theme.colors.text} />
            <Text style={styles.text} variant="bodyLarge">
              {date}
            </Text>
          </View>
        </View>
        <View style={[styles.flag, { backgroundColor: flagColor }]} />
      </View>
    </Card>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      margin: theme.custom.spacing.sm,
      borderRadius: 16,
      backgroundColor: theme.colors.backdrop,
    },
    content: {
      position: 'relative',
      padding: 16,
      flexDirection: 'row',
      gap: theme.custom.spacing.md,
      alignItems: 'center',
    },
    contentCol: {
      gap: theme.custom.spacing.md,
    },
    grade: {
      fontWeight: '800',
      color: theme.colors.primary,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.custom.spacing.sm,
    },
    divider: {
      width: 5,
      height: '100%',
      borderRadius: 20,
    },
    text: {
      color: theme.colors.text,
    },
    flag: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      width: 24,

      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
    },
  });

export default ActivityLogCard;
