// app/game/pazaak/options.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LogoHeader from '@/components/pazaak/LogoHeader';

const OptionsScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 로고와 카드 이미지 컴포넌트 */}
      <LogoHeader />

      {/* 옵션 메뉴 버튼들 */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('./character-selection')}>
          <Ionicons name="people" size={24} color="#FFD700" style={styles.icon} />
          <Text style={styles.buttonText}>캐릭터 선택</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => router.push('./side-deck-creation')}>
          <Ionicons name="clipboard-sharp" size={24} color="#FFD700" style={styles.icon} />
          <Text style={styles.buttonText}>사이드덱 만들기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={24} color="#FFD700" style={styles.icon} />
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OptionsScreen;

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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b3b5a',
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFD700',
    fontFamily: 'DepartureMono',
  },
});
