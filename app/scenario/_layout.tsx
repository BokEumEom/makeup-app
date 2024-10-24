import { Stack } from 'expo-router';
import { EmotionProvider } from '../../context/EmotionContext';

export default function ScenarioLayout() {
  return (
    <EmotionProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="[id]" />
        <Stack.Screen name="ending" />
      </Stack>
    </EmotionProvider>
  );
}