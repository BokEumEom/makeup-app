// app/game/pazaak/index.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import LogoHeader from '@/components/pazaak/LogoHeader';

const GameIntroScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 로고와 카드 이미지 컴포넌트 */}
      <LogoHeader />

      {/* 메뉴 버튼 */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/game/pazaak/pazaak')}>
          <Text style={styles.buttonText}>새로운 게임</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/game/pazaak/leaderboard')}>
          <Text style={styles.buttonText}>리더보드</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/game/pazaak/options')}>
          <Text style={styles.buttonText}>옵션</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/game/pazaak/rules')}>
          <Text style={styles.buttonText}>게임 방법</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameIntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b3b5a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    width: '80%',
  },
  button: {
    backgroundColor: '#1b3b5a',
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFD700',
    fontFamily: 'DepartureMono',
  },
});
