import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';

import Dashboard from './dashboard';
import Activity from './activity';
import Projects from './projects';

import { useAppTheme } from '@/theme';

const Tab = createBottomTabNavigator();

export default function HomeLayout() {
  const theme = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Dashboard') {
            return <MaterialIcons name="dashboard" size={size} color={color} />;
          } else if (route.name === 'Activity') {
            return <FontAwesome name="bar-chart" size={size} color={color} />;
          } else if (route.name === 'Projects') {
            return <Foundation name="projection-screen" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.background,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Activity" component={Activity} options={{ title: 'Activity' }} />
      <Tab.Screen name="Projects" component={Projects} options={{ title: 'Projects' }} />
    </Tab.Navigator>
  );
}
