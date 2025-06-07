import { Card, Divider, Text } from 'react-native-paper';
import { StyleSheet, View, Image } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useUser } from '@/contexts/UserContext';
import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';

const ProfileCard = () => {
  const { user } = useUser();
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const fullName = `${user.first_name} ${user.last_name}`;
  const location = `${user.home_gym}, ${user.location}`;

  return (
    <Card elevation={5} style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons
          name="person-circle"
          size={32}
          color={theme.colors.secondary}
          style={styles.icon}
        />
      </View>
      <Card.Content style={styles.contentWrapper}>
        <View style={styles.userWrapper}>
          <Image style={styles.profileImage} source={require('assets/ProfileImage.png')} />
          <Text variant="headlineMedium">{fullName}</Text>
        </View>
        <Divider bold />
        <View style={styles.location}>
          <EvilIcons name="location" size={32} color={theme.colors.secondary} />
          <Text variant="headlineSmall">{location}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      width: '100%',
      padding: theme.custom.spacing.sm,
      position: 'relative',
    },
    iconWrapper: {
      position: 'absolute',
      top: theme.custom.spacing.sm,
      right: theme.custom.spacing.sm,
      zIndex: 1,
    },
    icon: {},
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.custom.spacing.sm,
    },
    location: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    userWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.custom.spacing.sm,
    },
    profileImage: {
      height: 70,
      width: 70,
      borderRadius: 50,
    },
  });
