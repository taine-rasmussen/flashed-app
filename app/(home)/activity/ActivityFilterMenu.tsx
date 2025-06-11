import { FAB } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useMemo } from 'react';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme/types';

interface ActivityFilterMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  fabSize?: number;
  fabStyle?: object;
  spacing?: number;
}

const ActivityFilterMenu = ({ open, setOpen }: ActivityFilterMenuProps) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <FAB
        small
        icon={open ? 'close' : 'filter'}
        style={styles.fab}
        onPress={() => setOpen(!open)}
      />

      {open && (
        <View style={styles.expanded}>
          <FAB icon="calendar" style={styles.fab} onPress={() => console.log('Pressed add')} />
          <FAB icon="chart-box" style={styles.fab} onPress={() => console.log('Pressed star')} />
        </View>
      )}
    </View>
  );
};

export default ActivityFilterMenu;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    fab: {
      borderRadius: 24,
      margin: 4,
      backgroundColor: theme.colors.backdrop,
    },
    expanded: {
      flexDirection: 'row',
    },
  });
