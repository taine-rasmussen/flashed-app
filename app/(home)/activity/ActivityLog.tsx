import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import ActivityLogCard from './ActivityLogCard';

import { useUser } from '@/contexts/UserContext';
import { Climb } from '@/types';
import { getFromSecureStore } from '@/utils/secureStore';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

const ActivityLog = () => {
  const { user } = useUser();
  const [climbData, setClimbData] = useState<Climb[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getClimbData = async () => {
    setLoading(true);
    const accessToken = await getFromSecureStore('access_token');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const url = `${API_URL}get_climbs/?user_id=${user.id}`;
      const response = await axios.post<Climb[]>(
        url,
        {
          // filters go here
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setClimbData(response.data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClimbData();
  }, []);

  if (loading) return <Text>Loading…</Text>;

  return (
    <View>
      {climbData?.length ? (
        climbData.map(climb => <ActivityLogCard climb={climb} />)
      ) : (
        <Text>No climbs found.</Text>
      )}
    </View>
  );
};

export default ActivityLog;
