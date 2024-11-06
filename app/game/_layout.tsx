// app/game/_layout.tsx

import { Stack } from 'expo-router';

export default function GameLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* game 디렉토리의 각 하위 디렉토리가 자체 레이아웃을 통해 네비게이션 설정 */}
    </Stack>
  );
}
