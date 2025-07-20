import { useState } from 'react';
import { Text } from 'react-native';

import ProfileCard from './cards/ProfileCard';

import IndexWrapper from '@/components/IndexWrapper';

const Dashboard = () => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const toggleSettings = () => {
    setSettingsOpen(prev => !prev);
  };

  return (
    <>
      {settingsOpen && <Text>settings open</Text>}
      <IndexWrapper>
        <ProfileCard handleSettingsToggle={toggleSettings} />
      </IndexWrapper>
    </>
  );
};
export default Dashboard;
