import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { useState, useEffect } from 'react';

import SettingsHeader from './components/SettingsHeader';
import SettingsMenuList, { MenuItemConfig } from './components/SettingsMenuList';

import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';

interface ISettings {
  open: boolean;
  handleDismiss: () => void;
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onChangeGradeStyle?: () => void;
  onLogout?: () => void;
}

const Settings = (props: ISettings) => {
  const { open, handleDismiss, onEditProfile, onChangePassword, onChangeGradeStyle, onLogout } =
    props;

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

  // Default handlers with console logs if no handler is provided
  const handleEditProfile = () => {
    onEditProfile ? onEditProfile() : console.log('Edit Profile pressed');
  };

  const handleChangePassword = () => {
    onChangePassword ? onChangePassword() : console.log('Change Password pressed');
  };

  const handleChangeGradeStyle = () => {
    onChangeGradeStyle ? onChangeGradeStyle() : console.log('Change Grade Style pressed');
  };

  const handleLogout = () => {
    onLogout ? onLogout() : console.log('Logout pressed');
  };

  const menuItems: MenuItemConfig[] = [
    {
      id: 'editProfile',
      icon: 'person-outline',
      label: 'Edit Profile',
      onPress: handleEditProfile,
      section: 'account',
    },
    {
      id: 'changePassword',
      icon: 'lock-closed-outline',
      label: 'Change Password',
      onPress: handleChangePassword,
      section: 'account',
    },
    {
      id: 'changeGradeStyle',
      icon: 'settings-outline',
      label: 'Change Grade Style',
      onPress: handleChangeGradeStyle,
      section: 'preferences',
    },
    {
      id: 'logout',
      icon: 'log-out-outline',
      label: 'Logout',
      onPress: handleLogout,
      variant: 'destructive',
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
        <SettingsHeader title="Settings" onClose={handleClose} />

        <SettingsMenuList items={menuItems} separateDestructive={true} />
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
  });
