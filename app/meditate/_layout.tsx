import { Stack } from 'expo-router';
import TimerProvider from "@/contexts/TimerContext";

export default function MeditateLayout() {
  return (
    <TimerProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="[id]" />
        <Stack.Screen name="nature-meditate" />
        <Stack.Screen name="adjust-meditation-duration" />
      </Stack>
    </TimerProvider>
  );
}
