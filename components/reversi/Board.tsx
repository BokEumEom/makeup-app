import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Disc from './Disc';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BOARD_SIZE = Math.floor(SCREEN_WIDTH * 0.9);
const CELL_SIZE = Math.floor(BOARD_SIZE / 8);

type BoardProps = {
  discs: ('empty' | 'black' | 'white')[][];
  blockedCells: Set<string>;
  playableCells: Set<string>;
  onCellPress: (row: number, col: number) => void;
};

const Board: React.FC<BoardProps> = ({ discs, blockedCells, onCellPress, playableCells }) => {
  const isCellBlocked = (row: number, col: number) => blockedCells.has(`${row}-${col}`);
  const isPlayableCell = (row: number, col: number) => playableCells.has(`${row}-${col}`);

  const getCellColor = (row: number, col: number) => {
    // Alternate colors based on row and column indices
    const isDark = (row + col) % 2 === 0;
    return isDark ? '#008400' : '#04A101';
  };

  return (
    <LinearGradient
      colors={['#004d00', '#016227']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.board}
    >
      {discs.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => {
            const isBlocked = isCellBlocked(rowIndex, colIndex);
            const isPlayable = isPlayableCell(rowIndex, colIndex);
            const cellColor = getCellColor(rowIndex, colIndex);

            return (
              <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                onPress={() => !isBlocked && onCellPress(rowIndex, colIndex)}
                disabled={isBlocked}
                style={[
                  styles.cell,
                  { backgroundColor: cellColor }, // Dynamic cell color
                  isBlocked && styles.blockedCell,
                  isPlayable && styles.highlightCell,
                ]}
                accessibilityLabel={`Cell at row ${rowIndex + 1}, column ${colIndex + 1}`}
              >
                {cell !== 'empty' && <Disc type={cell} cellSize={CELL_SIZE} />}
                {isPlayable && <View style={styles.playableIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    borderWidth: 4,
    borderColor: '#003300',
    elevation: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#A2A2A2',
  },
  blockedCell: {
    backgroundColor: '#805534',
    borderColor: '#663c24',
  },
  highlightCell: {
    backgroundColor: 'rgba(42, 139, 95, 0.5)', // 살짝 투명한 배경
  },
  playableIndicator: {
    position: 'absolute',
    width: CELL_SIZE / 4, // 셀 크기에 비례한 점 크기
    height: CELL_SIZE / 4,
    borderRadius: CELL_SIZE / 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검정색
  },
});

export default Board;
