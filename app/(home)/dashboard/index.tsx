import ProfileCard from './cards/ProfileCard';
import Settings from '../settings';
import { useSettings } from '../settings/hooks/useSettings';

import IndexWrapper from '@/components/IndexWrapper';

const Dashboard = () => {
  const settings = useSettings();

  return (
    <>
      {settings.isOpen && (
        <Settings
          open={settings.isOpen}
          handleDismiss={settings.closeSettings}
          currentScreen={settings.currentScreen}
          onNavigateToScreen={settings.navigateToScreen}
          onGoBack={settings.goBack}
          onLogout={settings.handleLogout}
        />
      )}
      <IndexWrapper>
        <ProfileCard handleSettingsToggle={settings.openSettings} />
      </IndexWrapper>
    </>
  );
};

export default Dashboard;
