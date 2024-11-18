// app/game/block/_layout.tsx

import { Stack } from 'expo-router';
import { LevelProvider } from '@/contexts/LevelContext';

export default function BlockLayout() {
  return (
    <LevelProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="[level]" />
      </Stack>
    </LevelProvider>
  );
}
