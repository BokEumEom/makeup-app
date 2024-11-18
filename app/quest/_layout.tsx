import { Stack } from 'expo-router';
import { QuestProvider } from '../../contexts/QuestContext';

export default function QuestLayout() {
  return (
    <QuestProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </QuestProvider>
  );
}
