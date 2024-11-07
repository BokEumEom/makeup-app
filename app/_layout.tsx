// app/_layout.tsx

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/RobotoMono-Regular.ttf'),
    DepartureMono: require('../assets/fonts/DepartureMono-Regular.otf'),
    PressStart2P: require('../assets/fonts/PressStart2P-Regular.ttf'),
    NotoSansBold: require('../assets/fonts/NotoSansKR-Bold.ttf'),
    NotoSansMedium: require('../assets/fonts/NotoSansKR-Medium.ttf'),
    NotoSansThin: require('../assets/fonts/NotoSansKR-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="quest" />
          <Stack.Screen name="scenario" />
          <Stack.Screen name="game" />
          <Stack.Screen name="mbti" />
          <Stack.Screen name="meditate" />
          <Stack.Screen name="(modal)/adjust-meditation-duration" options={{ presentation: "modal" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
