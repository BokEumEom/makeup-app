import { Stack } from 'expo-router';
import { EmotionProvider } from '../../contexts/EmotionContext';

export default function GameLayout() {
  return (
    <EmotionProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </EmotionProvider>
  );
}
