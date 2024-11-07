import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Asset } from 'expo-asset';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const cacheImages = async (images: number[]) => {
  await Promise.all(images.map(image => Asset.loadAsync(image)));
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      const images = [
        require('@/assets/images/weather/clear.png'),
        require('@/assets/images/weather/rain.png'),
        require('@/assets/images/weather/thunderstorm.png'),
        require('@/assets/images/weather/clouds.png'),
        require('@/assets/images/weather/snow.png'),
        require('@/assets/images/weather/drizzle.png'),
        require('@/assets/images/weather/haze.png'),
        require('@/assets/images/weather/mist.png'),
      ];
      await cacheImages(images);
      setIsReady(true);
    };

    loadAssets();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="onboarding"
        options={{
          title: "온보딩",
          tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: '날씨',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'sunny-sharp' : 'sunny-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '찾기',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings-sharp' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
