// utils/tetrisHelpers.ts

import { BOARD_WIDTH, BOARD_HEIGHT, SHAPES, COLORS } from '../constants/tetrisConstants';

export const generatePiece = () => {
  const randomIndex = Math.floor(Math.random() * SHAPES.length);
  return {
    shape: SHAPES[randomIndex],
    color: COLORS[randomIndex],
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(SHAPES[randomIndex][0].length / 2),
    y: 0,
  };
};

export const rotatePiece = (piece: any) => {
  const newShape = Array.from({ length: piece.shape[0].length }, () =>
    Array(piece.shape.length).fill(0)
  );
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      newShape[x][piece.shape.length - 1 - y] = piece.shape[y][x];
    }
  }
  return { ...piece, shape: newShape };
};

export const checkCollision = (board: any[][], piece: any) => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) { // 블록이 비어 있지 않을 때만
        const boardX = piece.x + x;
        const boardY = piece.y + y;

        if (
          boardX < 0 || // 왼쪽 경계 초과
          boardX >= BOARD_WIDTH || // 오른쪽 경계 초과
          boardY >= BOARD_HEIGHT || // 아래 경계 초과
          (boardY >= 0 && board[boardY][boardX]) // 이미 점유된 셀
        ) {
          
          return true;
        }
      }
    }
  }
  return false;
};

export const mergePiece = (board: any[][], piece: any) => {
  const newBoard = board.map((row) => [...row]); // 보드 복사
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) { // 블록이 비어 있지 않을 때만
        const boardX = piece.x + x;
        const boardY = piece.y + y;

        // 좌표가 유효한지 확인
        if (
          boardY >= 0 &&
          boardY < board.length &&
          boardX >= 0 &&
          boardX < board[0].length
        ) {
          newBoard[boardY][boardX] = piece.color; // 색상 추가
        }
      }
    }
  }

  return newBoard;
};

export const clearLines = (board: any[][]) => {
  const newBoard = board.filter((row) => row.some((cell) => cell === 0) || row.every((cell) => cell === 0));
  const clearedLines = BOARD_HEIGHT - newBoard.length;

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0)); // 맨 위에 빈 줄 추가
  }

  return { newBoard, clearedLines };
};