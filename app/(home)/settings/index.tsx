import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { useState, useEffect } from 'react';

import SettingsHeader from './components/SettingsHeader';
import SettingsMenuList, { MenuItemConfig } from './components/SettingsMenuList';
import { SettingsScreen } from './hooks/useSettings';
import EditProfileScreen from './screens/EditProfileScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import ChangeGradeStyleScreen from './screens/ChangeGradeStyleScreen';

import { AppTheme } from '@/theme/types';
import { useAppTheme } from '@/theme';

interface ISettings {
  open: boolean;
  handleDismiss: () => void;
  currentScreen?: SettingsScreen;
  onNavigateToScreen?: (screen: SettingsScreen) => void;
  onGoBack?: () => void;
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onChangeGradeStyle?: () => void;
  onLogout?: () => void;
}

const Settings = (props: ISettings) => {
  const {
    open,
    handleDismiss,
    currentScreen = 'main',
    onNavigateToScreen,
    onGoBack,
    onEditProfile,
    onChangePassword,
    onChangeGradeStyle,
    onLogout,
  } = props;

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
    if (onEditProfile) {
      onEditProfile();
    } else if (onNavigateToScreen) {
      onNavigateToScreen('editProfile');
    } else {
      console.log('Edit Profile pressed');
    }
  };

  const handleChangePassword = () => {
    if (onChangePassword) {
      onChangePassword();
    } else if (onNavigateToScreen) {
      onNavigateToScreen('changePassword');
    } else {
      console.log('Change Password pressed');
    }
  };

  const handleChangeGradeStyle = () => {
    if (onChangeGradeStyle) {
      onChangeGradeStyle();
    } else if (onNavigateToScreen) {
      onNavigateToScreen('gradeStyle');
    } else {
      console.log('Change Grade Style pressed');
    }
  };

  const handleLogout = () => {
    onLogout ? onLogout() : console.log('Logout pressed');
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      console.log('Go back pressed');
    }
  };

  // Get screen-specific configuration
  const getScreenConfig = () => {
    switch (currentScreen) {
      case 'editProfile':
        return {
          title: 'Edit Profile',
          subtitle: 'Update your information',
          showBackButton: true,
          content: <EditProfileScreen />,
        };
      case 'changePassword':
        return {
          title: 'Change Password',
          subtitle: 'Update your password',
          showBackButton: true,
          content: <ChangePasswordScreen />,
        };
      case 'gradeStyle':
        return {
          title: 'Grade Style',
          subtitle: 'Choose your preferred style',
          showBackButton: true,
          content: <ChangeGradeStyleScreen />,
        };
      case 'main':
      default:
        return {
          title: 'Settings',
          showBackButton: false,
          content: <SettingsMenuList items={menuItems} separateDestructive={true} />,
        };
    }
  };

  // Menu configuration
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

  const screenConfig = getScreenConfig();

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
        <SettingsHeader
          title={screenConfig.title}
          subtitle={screenConfig.subtitle}
          showBackButton={screenConfig.showBackButton}
          onBack={handleGoBack}
          onClose={handleClose}
        />

        {screenConfig.content}
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
      minHeight: 400, // Add minimum height so modal is visible
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 32,
    },
  });
