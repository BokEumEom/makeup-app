// components/tetris/Board.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BOARD_WIDTH, BOARD_HEIGHT, BLOCK_SIZE } from '../../constants/tetrisConstants';

interface Piece {
  shape: number[][];
  color: string;
  x: number;
  y: number;
}

interface BoardProps {
  board: (string | number)[][];
  currentPiece?: Piece | null;
}

const Board: React.FC<BoardProps> = ({ board, currentPiece }) => {
  const renderCell = (cell: string | number, x: number, y: number) => {
    const isCurrent = currentPiece?.shape.some((rowShape, dy) =>
      rowShape.some(
        (cellShape, dx) =>
          cellShape &&
          currentPiece.x + dx === x &&
          currentPiece.y + dy === y
      )
    );
  
    const backgroundColor = isCurrent
      ? currentPiece?.color // 현재 움직이는 블록의 색상
      : typeof cell === 'string' && cell
      ? cell // 보드에 쌓인 블록의 색상
      : '#000'; // 빈 칸은 검정색으로 표시
  
    return (
      <View
        key={`${x}-${y}`}
        style={[
          styles.cell,
          { backgroundColor },
        ]}
      />
    );
  };  

  return (
    <View style={styles.boardContainer}>
      {board.map((row, y) => (
        <View key={`row-${y}`} style={styles.row}>
          {row.map((cell, x) => renderCell(cell, x, y))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    width: BOARD_WIDTH * BLOCK_SIZE, // 보드의 가로 크기
    height: BOARD_HEIGHT * BLOCK_SIZE, // 보드의 세로 크기
    borderWidth: 1, // 테두리
    borderColor: '#00FFFF',
    overflow: 'hidden', // 요소가 보드 영역 밖으로 나가지 않도록 설정
  },
  row: {
    flexDirection: 'row', // 한 행의 셀들을 가로로 나열
  },
  cell: {
    width: BLOCK_SIZE, // 셀의 너비
    height: BLOCK_SIZE, // 셀의 높이
    borderWidth: 1, // 셀 테두리
    borderColor: '#222', // 테두리 색상
  },
});

export default Board;
