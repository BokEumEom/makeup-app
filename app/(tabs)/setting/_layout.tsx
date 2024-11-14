import { Stack } from 'expo-router';

export default function SettingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="music" />
      <Stack.Screen name="font" />
    </Stack>
  );
}
