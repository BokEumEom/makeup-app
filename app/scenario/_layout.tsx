import { Stack } from 'expo-router';
import { EmotionProvider } from '../../contexts/EmotionContext';

export default function ScenarioLayout() {
  return (
    <EmotionProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </EmotionProvider>
  );
}
