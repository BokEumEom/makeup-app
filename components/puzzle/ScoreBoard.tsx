import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '../../contexts/TileContext';

const ScoreBoard = () => {
  const { score } = useGame();
  const [highScore, setHighScore] = useState(0);

  // 게임을 새로 시작할 때 최고 점수 갱신
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score]);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.label}>SCORE</Text>
        <Text style={styles.score}>{score}</Text>
      </View>
      <View style={styles.highScoreContainer}>
        <Text style={styles.label}>BEST</Text>
        <Text style={styles.highScore}>{highScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '80%',
    padding: 10,
  },
  scoreContainer: {
    backgroundColor: '#bbada0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  highScoreContainer: {
    backgroundColor: '#bbada0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  label: {
    fontSize: 16,
    color: '#eee4da',
    fontWeight: 'bold',
  },
  score: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  highScore: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ScoreBoard;
