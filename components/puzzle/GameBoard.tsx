// components/puzzle/GameBoard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Tile from './Tile';
import { useGame } from '../../contexts/TileContext';

const GameBoard = () => {
  const { board } = useGame();

  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => <Tile key={`${rowIndex}-${colIndex}`} value={value} />)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    backgroundColor: '#bbada0',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
});

export default GameBoard;
