// app/game/brick/_layout.tsx

import { Stack } from 'expo-router';
import { GameProvider } from '@/contexts/BrickContext';

export default function BrickLayout() {
  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="game" />
        <Stack.Screen name="achievements" />
        <Stack.Screen name="scores" />
        <Stack.Screen name="help" />
      </Stack>
    </GameProvider>
  );
}
