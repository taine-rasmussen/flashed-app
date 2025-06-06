import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { useUser } from '@/contexts/UserContext';
const ProfileCard = () => {
  const { user } = useUser();

  const fullName = `${user.first_name} ${user.last_name}`;
  return (
    <Card elevation={5} style={styles.container}>
      <Card.Title title={fullName} />
    </Card>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
});
