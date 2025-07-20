import { useState } from 'react';

import ProfileCard from './cards/ProfileCard';
import Settings from '../settings';

import IndexWrapper from '@/components/IndexWrapper';

const Dashboard = () => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const toggleSettings = () => {
    setSettingsOpen(prev => !prev);
  };

  return (
    <>
      {settingsOpen && <Settings />}
      <IndexWrapper>
        <ProfileCard handleSettingsToggle={toggleSettings} />
      </IndexWrapper>
    </>
  );
};
export default Dashboard;
