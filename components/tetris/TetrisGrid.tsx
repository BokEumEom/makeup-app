// components/TetrisGrid.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useGame } from '@/contexts/TetrisContext';

const TetrisGrid = () => {
  const { grid } = useGame();
  return (
    <View style={styles.grid}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View
              key={cellIndex}
              style={[styles.cell, cell ? styles.filledCell : styles.emptyCell]}
            >
              {cell ? <View style={styles.innerBlock} /> : <View style={styles.innerBorder} />}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    backgroundColor: '#b2b8a3',
    borderWidth: 2,
    borderColor: '#333',
    padding: 4,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666', // Outer cell border color
    margin: 1,
  },
  filledCell: {
    backgroundColor: '#000', // Black background for filled cells
  },
  emptyCell: {
    backgroundColor: '#b2b8a3', // Light greenish-grey background for empty cells
  },
  innerBorder: {
    width: '80%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#8b8f87', // Inner border color for empty cells
    backgroundColor: '#a5aa99', // Light background for inner layer in empty cells
  },
  innerBlock: {
    width: '80%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#333', // Darker inner border for filled blocks
    backgroundColor: '#000', // Black background for the inner block in filled cells
  },
});

export default TetrisGrid;
