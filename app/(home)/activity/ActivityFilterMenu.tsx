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
  const styles = useMemo(() => createStyles(theme, open), [theme, open]);

  return (
    <View style={styles.container}>
      <FAB
        small
        icon={open ? 'close' : 'filter'}
        style={styles.displayFab}
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

const createStyles = (theme: AppTheme, open: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    displayFab: {
      marginRight: open ? 8 : 0,
      borderRadius: 24,
      backgroundColor: theme.colors.backdrop,
    },
    fab: {
      borderRadius: 24,
      backgroundColor: theme.colors.backdrop,
    },
    expanded: {
      flexDirection: 'row',
      gap: 8,
    },
  });
