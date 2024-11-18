// components/ScoreDisplay.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '@/contexts/TetrisContext';

const ScoreDisplay = () => {
  const { score, level, nextBlock } = useGame();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Last Round</Text>
      <Text style={styles.value}>{score}</Text>
      <Text style={styles.label}>Level</Text>
      <Text style={styles.value}>{level}</Text>
      <Text style={styles.label}>Next</Text>

      {/* Display the next block in a mini-grid */}
      <View style={styles.nextBlock}>
        {nextBlock?.shape.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <View
                key={cellIndex}
                style={[styles.cell, { backgroundColor: cell ? '#000' : 'transparent' }]}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#b2b8a3',
    borderRadius: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  nextBlock: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 12,
    height: 12,
    margin: 1,
    backgroundColor: '#000',
  },
});

export default ScoreDisplay;
