import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { useUser } from '@/contexts/UserContext';
import { Climb } from '@/types';
import { getFromSecureStore } from '@/utils/secureStore';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

const ActivityLog = () => {
  const { user } = useUser();
  const [climbData, setClimbData] = useState<Climb[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(climbData, loading);

  const getClimbData = async () => {
    setLoading(true);
    const accessToken = await getFromSecureStore('access_token');

    if (accessToken) {
      try {
        const response = await fetch(`${API_URL}get_climbs/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            user_id: user.id,
            filters: {
              // adding filters here
            },
          }),
        });
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data: Climb[] = await response.json();
        setClimbData(data);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getClimbData();
  }, []);
  return (
    <View>
      <Text>Log</Text>
    </View>
  );
};

export default ActivityLog;
