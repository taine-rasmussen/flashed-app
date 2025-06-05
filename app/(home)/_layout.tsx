import { Tabs } from 'expo-router';

import { useAppTheme } from '@/theme';

export default function HomeLayout() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.border, // or whatever your theme’s “card” color is
          borderTopColor: colors.border, // optional: border color
        },
        tabBarActiveTintColor: colors.primary, // active icon/text color
        tabBarInactiveTintColor: colors.text, // inactive icon/text color
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          // You can add an icon here if you like:
          // tabBarIcon: ({ color, size }) => <SomeIcon name="home" color={color} size={size} />
        }}
      />
      <Tabs.Screen name="activity" options={{ title: 'Activity' }} />
      <Tabs.Screen name="projects" options={{ title: 'Projects' }} />
    </Tabs>
  );
}
