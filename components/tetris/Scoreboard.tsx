// components/tetris/Scoreboard.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // 아이콘 사용을 위해 설치 필요

const { width } = Dimensions.get('window'); // 화면 크기를 가져옴

interface ScoreboardProps {
  score: number;
  level: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, level }) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreItem}>
        <FontAwesome name="star" size={width * 0.05} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.text}>{score.toLocaleString()}</Text>
      </View>
      <View style={styles.scoreItem}>
        <FontAwesome name="trophy" size={width * 0.05} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.text}>{level.toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: width * 0.4, // 화면 너비의 40%를 사용
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: width * 0.01, // 동적으로 세로 간격 설정
    paddingHorizontal: width * 0.03,
    backgroundColor: '#2A2A4A',
    borderRadius: width * 0.02, // 동적으로 둥근 모서리 설정
    borderWidth: 1,
    borderColor: '#00FFFF',
    paddingVertical: width * 0.02,
  },
  icon: {
    marginRight: width * 0.02, // 동적으로 아이콘 간격 설정
  },
  text: {
    fontSize: width * 0.04, // 동적으로 텍스트 크기 설정
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Scoreboard;
