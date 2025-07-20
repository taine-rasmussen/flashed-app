import { useState } from 'react';

import ProfileCard from './cards/ProfileCard';
import Settings from '../settings';

import IndexWrapper from '@/components/IndexWrapper';

const Dashboard = () => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const toggleSettings = () => {
    setSettingsOpen(prev => !prev);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  return (
    <>
      {settingsOpen && <Settings open={settingsOpen} handleDismiss={closeSettings} />}
      <IndexWrapper>
        <ProfileCard handleSettingsToggle={toggleSettings} />
      </IndexWrapper>
    </>
  );
};
export default Dashboard;
