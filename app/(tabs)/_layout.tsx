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
        require('@/assets/game-images/rock-led.png'),
        require('@/assets/game-images/scissors-led.png'),
        require('@/assets/game-images/paper-led.png'),
        require('@/assets/game-images/rock.jpg'),
        require('@/assets/game-images/scissors.jpg'),
        require('@/assets/game-images/paper.jpg'),
        require('@/assets/bg/bg_mbti_question.png'),
        require('@/assets/bg/bg_question.png'),
        require('@/assets/bg/mint-bear-character-enthusiastic.webp'),
        require('@/assets/images/splash.png'),
        require('@/assets/images/soran-logo.png'),
        require('@/assets/images/sowii.png'),
        require('@/assets/images/soran.gif'),
        require('@/assets/images/soran-logo.gif'),
        require('@/assets/meditation-images/meditating.webp'),
        require('@/assets/meditation-images/meditate-under-tree.webp'),
        require('@/assets/meditation-images/river.webp'),
        require('@/assets/meditation-images/trees.webp'),
        require('@/assets/meditation-images/waterfall.webp'),
        require('@/assets/meditation-images/yosemite-stars.webp'),
        require('@/assets/meditation-images/beach.webp'),
        require('@/assets/emotions/two-chibi-characters.webp'),
        require('@/assets/emotions/mint-bear-character.webp'),
        require('@/assets/emotions/mint-colored-bear-character.webp'),
        require('@/assets/emotions/mint-bear-cleansing-balm.webp'),
        require('@/assets/emotions/mint-bear-struggling.webp'),
        require('@/assets/emotions/mint-bear-character-balance.webp')
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
        tabBarLabelStyle: {
          marginTop: 5, // Adjust the space between the icon and title
        },
        tabBarItemStyle: {
          paddingVertical: 5, // Add vertical padding around the tab items
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home-sharp' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          title: '퀘스트',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'ribbon' : 'ribbon-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: '대시보드',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'pulse-sharp' : 'pulse-outline'} color={color} />
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
