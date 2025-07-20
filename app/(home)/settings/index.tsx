import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';

interface ISettings {
  open: boolean;
  handleDismiss: () => void;
}

const Settings = (props: ISettings) => {
  const { open, handleDismiss } = props;
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    }
  }, [open]);

  const handleModalHide = () => {
    setIsVisible(false);
    handleDismiss();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleEditProfile = () => {
    console.log('Edit Profile pressed');
  };

  const handleChangePassword = () => {
    console.log('Change Password pressed');
  };

  const handleChangeGradeStyle = () => {
    console.log('Change Grade Style pressed');
  };

  const handleLogout = () => {
    console.log('Logout pressed');
  };

  const menuItems = [
    {
      icon: 'person-outline',
      label: 'Edit Profile',
      onPress: handleEditProfile,
    },
    {
      icon: 'lock-closed-outline',
      label: 'Change Password',
      onPress: handleChangePassword,
    },
    {
      icon: 'settings-outline',
      label: 'Change Grade Style',
      onPress: handleChangeGradeStyle,
    },
    {
      icon: 'log-out-outline',
      label: 'Logout',
      onPress: handleLogout,
    },
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleClose}
      onModalHide={handleModalHide}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={750}
      animationOutTiming={750}
      useNativeDriver
      avoidKeyboard
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.slice(0, 3).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.row}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.rowContent}>
                <Ionicons name={item.icon as any} size={20} color={theme.colors.onSurface} />
                <Text style={styles.rowText}>{item.label}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={theme.colors.onSurface}
                  style={styles.chevron}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutRow}
          onPress={menuItems[3].onPress}
          activeOpacity={0.7}
        >
          <View style={styles.rowContent}>
            <Ionicons name={menuItems[3].icon as any} size={20} color="#FF3B30" />
            <Text style={styles.logoutText}>{menuItems[3].label}</Text>
            <Ionicons name="chevron-forward" size={16} color="#FF3B30" style={styles.chevron} />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Settings;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 32,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.onSurface,
    },
    closeButton: {
      padding: 4,
    },
    menuContainer: {
      gap: 12,
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.backdrop,
      padding: 16,
      borderRadius: 10,
    },
    rowContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    rowText: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: theme.colors.onSurface,
    },
    chevron: {
      opacity: 0.6,
    },
    logoutRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.backdrop,
      padding: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#FF3B30',
    },
    logoutText: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: '#FF3B30',
      fontWeight: '500',
    },
  });
