// app/_layout.tsx

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FontSettingsProvider } from '@/contexts/FontSettingsContext';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

// 스플래시 화면 자동 숨김 방지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  // useFonts 훅을 사용하여 폰트를 로드
  const [fontsLoaded] = useFonts({
    'DepartureMono': require('@/assets/fonts/DepartureMono-Regular.otf'),
    'NanumSquareNeo': require('@/assets/fonts/NanumSquareNeo-eHv.ttf'),
    'NEXONLv2Gothic': require('@/assets/fonts/NEXON Lv2 Gothic Medium.ttf'),
    'NotoSansKR': require('@/assets/fonts/NotoSansKR-Medium.ttf'),
    'Orbitron': require('@/assets/fonts/Orbitron-VariableFont-wght.ttf'),
    'PressStart2P': require('@/assets/fonts/PressStart2P-Regular.ttf'),
    'RobotoMono': require('@/assets/fonts/RobotoMono-Regular.ttf'),
    'SpaceMono': require('@/assets/fonts/SpaceMono-Regular.ttf'),
    'SpoqaHanSansNeo': require('@/assets/fonts/SpoqaHanSansNeo-Medium.ttf'),
  });

  // 폰트 로딩 완료 시 스플래시 화면 숨김 및 /onboarding으로 리디렉션
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().then(() => {
        setIsReady(true);
        router.replace('/onboarding'); // 첫 화면으로 /onboarding 리디렉션
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // 폰트가 로드될 때까지 아무것도 렌더링하지 않음
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FontSettingsProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="emotions" />
              <Stack.Screen name="quest" />
              <Stack.Screen name="scenario" />
              <Stack.Screen name="game" />
              <Stack.Screen name="mbti" />
              <Stack.Screen name="meditate" />
              <Stack.Screen name="(modal)/adjust-meditation-duration" options={{ presentation: "modal" }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </FontSettingsProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
