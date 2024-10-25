// components/game/ScoreBoard.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

interface ScoreBoardProps {
  wins: number;
  losses: number;
  draws: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ wins, losses, draws }) => {
  const winScale = useSharedValue(1);
  const lossScale = useSharedValue(1);
  const drawScale = useSharedValue(1);

  useEffect(() => {
    winScale.value = withTiming(1.2, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    }, () => {
      winScale.value = withTiming(1, { duration: 300 });
    });
  }, [wins]);

  useEffect(() => {
    lossScale.value = withTiming(1.2, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    }, () => {
      lossScale.value = withTiming(1, { duration: 300 });
    });
  }, [losses]);

  useEffect(() => {
    drawScale.value = withTiming(1.2, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    }, () => {
      drawScale.value = withTiming(1, { duration: 300 });
    });
  }, [draws]);

  const animatedWinStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: winScale.value }],
    };
  });

  const animatedLossStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: lossScale.value }],
    };
  });

  const animatedDrawStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: drawScale.value }],
    };
  });

  return (
    <View style={styles.scoreBoard}>
      <Animated.View style={[styles.scoreCard, animatedWinStyle]}>
        <Text style={styles.scoreLabel}>Wins</Text>
        <Text style={styles.scoreValue}>{wins}</Text>
      </Animated.View>
      <Animated.View style={[styles.scoreCard, animatedLossStyle]}>
        <Text style={styles.scoreLabel}>Losses</Text>
        <Text style={styles.scoreValue}>{losses}</Text>
      </Animated.View>
      <Animated.View style={[styles.scoreCard, animatedDrawStyle]}>
        <Text style={styles.scoreLabel}>Draws</Text>
        <Text style={styles.scoreValue}>{draws}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreBoard: {
    flexDirection: 'row',           // 점수를 가로로 배치
    justifyContent: 'space-between', // 요소 간 공간 균등 분배
    alignItems: 'center',           // 수직 중앙 정렬
    width: '100%',                  // 화면 전체 너비
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  scoreCard: {
    backgroundColor: '#fff',        // 카드 배경색
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,                   // 안드로이드 그림자
    flex: 1,                        // 동일한 크기로 카드 배분
    marginHorizontal: 10,           // 카드 간격
  },
  scoreLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF416C',
  },
});

export default ScoreBoard;
