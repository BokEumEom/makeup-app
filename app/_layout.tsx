import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/RobotoMono-Regular.ttf'),
    DepartureMono: require('../assets/fonts/DepartureMono-Regular.otf'),
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
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="quest" options={{ headerShown: false }} />
          <Stack.Screen name="scenario" options={{ headerShown: false }} />
          <Stack.Screen name="game" options={{ headerShown: false }} />
          <Stack.Screen name="mbti" options={{ headerShown: false }} />
          <Stack.Screen
              name="meditate"
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="(modal)/adjust-meditation-duration"
              options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
