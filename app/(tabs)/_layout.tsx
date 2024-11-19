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
        require('@/assets/game-images/rock-led.png'),
        require('@/assets/game-images/scissors-led.png'),
        require('@/assets/game-images/paper-led.png'),
        require('@/assets/game-images/rock.jpg'),
        require('@/assets/game-images/scissors.jpg'),
        require('@/assets/game-images/paper.jpg'),
        require('@/assets/bg/bg_mbti_question.png'),
        require('@/assets/bg/bg_question.png'),
        require('@/assets/images/splash.png'),
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
        name="wallpaper"
        options={{
          title: '배경화면',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'images' : 'images-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="animations"
        options={{
          title: '애니메이션',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'play-circle' : 'play-circle-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: '세팅',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings-sharp' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
