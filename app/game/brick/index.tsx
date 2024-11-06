// app/game/brick/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const WIDTH = width * 0.6; // 이미지 너비 설정

export default function MainMenu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 배경 블록 셀 */}
      <View style={styles.backgroundGrid}>
        {Array.from({ length: 100 }).map((_, index) => (
          <View key={index} style={styles.backgroundCell} />
        ))}
      </View>

      {/* 타이틀 이미지 */}
      <Image source={require('@/assets/images/bricks-breaker.png')} style={styles.titleImage} />

      <TouchableOpacity style={[styles.button, styles.playButton]} onPress={() => router.push('/game/brick/game')}>
        <Text style={styles.buttonText}>PLAY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.scoresButton]} onPress={() => router.push('/game/brick/scores')}>
        <Text style={styles.buttonText}>SCORES</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.achievementsButton]} onPress={() => router.push('/game/brick/achievements')}>
        <Text style={styles.buttonText}>ACHIEVEMENTS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.helpButton]} onPress={() => router.push('/game/brick/help')}>
        <Text style={styles.buttonText}>HELP</Text>
      </TouchableOpacity>

      <View style={styles.soundContainer}>
        <Text style={styles.soundText}>SOUND</Text>
        <TouchableOpacity style={styles.soundToggle}>
          <Text style={styles.soundToggleText}>OFF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 스타일 정의 (앞서 작성한 스타일과 동일)
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  backgroundGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    opacity: 0.1,
  },
  backgroundCell: {
    width: 30,
    height: 30,
    backgroundColor: '#333',
    margin: 1,
  },
  titleImage: {
    width: WIDTH,
    height: WIDTH * 0.7,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  button: {
    width: '70%',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#000',
  },
  playButton: {
    backgroundColor: '#1E90FF',
    shadowColor: '#104E8B',
  },
  scoresButton: {
    backgroundColor: '#FFD700',
    shadowColor: '#B8860B',
  },
  achievementsButton: {
    backgroundColor: '#32CD32',
    shadowColor: '#228B22',
  },
  helpButton: {
    backgroundColor: '#FF4500',
    shadowColor: '#B22222',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'PressStart2P',
  },
  soundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  soundText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
  soundToggle: {
    backgroundColor: '#555',
    padding: 8,
    borderRadius: 4,
  },
  soundToggleText: {
    color: 'white',
    fontSize: 14,
  },
});
