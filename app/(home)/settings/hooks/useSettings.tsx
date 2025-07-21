import { useState, useCallback } from 'react';

import { SettingsScreen } from '@/types';

interface UseSettingsReturn {
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  currentScreen: SettingsScreen;
  navigateToScreen: (screen: SettingsScreen) => void;
  goBack: () => void;
  handleEditProfile: () => void;
  handleChangePassword: () => void;
  handleChangeGradeStyle: () => void;
  handleLogout: () => void;
}

export const useSettings = (): UseSettingsReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<SettingsScreen>('main');

  const openSettings = useCallback(() => {
    setIsOpen(true);
    setCurrentScreen('main');
  }, []);

  const closeSettings = useCallback(() => {
    setIsOpen(false);
    // Reset to main screen when closing
    setTimeout(() => setCurrentScreen('main'), 300);
  }, []);

  const navigateToScreen = useCallback((screen: SettingsScreen) => {
    setCurrentScreen(screen);
  }, []);

  const goBack = useCallback(() => {
    setCurrentScreen('main');
  }, []);

  const handleEditProfile = useCallback(() => {
    navigateToScreen('editProfile');
  }, [navigateToScreen]);

  const handleChangePassword = useCallback(() => {
    navigateToScreen('changePassword');
  }, [navigateToScreen]);

  const handleChangeGradeStyle = useCallback(() => {
    navigateToScreen('gradeStyle');
  }, [navigateToScreen]);

  const handleLogout = useCallback(() => {
    console.log('Logout initiated');
  }, []);

  return {
    isOpen,
    openSettings,
    closeSettings,

    currentScreen,
    navigateToScreen,
    goBack,

    handleEditProfile,
    handleChangePassword,
    handleChangeGradeStyle,
    handleLogout,
  };
};
