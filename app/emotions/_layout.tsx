// app/emotions/_layout.tsx
import { Stack } from 'expo-router';

export default function EmotionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="anger" />
      <Stack.Screen name="positiveEmotions" />
      <Stack.Screen name="sadness" />
      <Stack.Screen name="stress" />
      <Stack.Screen name="anxiety" />
      <Stack.Screen name="apathy" />
    </Stack>
  );
}
