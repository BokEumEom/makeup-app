// utils/tetrisUtils.ts
import { Block, Grid } from '../types';

// 블록 모양 정의
const BLOCK_SHAPES = [
  // I Block
  [
    [1, 1, 1, 1],
  ],
  // O Block
  [
    [1, 1],
    [1, 1],
  ],
  // T Block
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  // S Block
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  // Z Block
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  // J Block
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  // L Block
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
];

// 랜덤한 테트리스 블록 생성
export const generateRandomBlock = (): Block => {
  const shape = BLOCK_SHAPES[Math.floor(Math.random() * BLOCK_SHAPES.length)];
  const x = Math.floor((10 - shape[0].length) / 2);
  return {
    shape,
    x,
    y: 0, // 블록이 그리드 상단에서 시작하도록 수정
  };
};

// 블록을 지정된 위치로 이동할 수 있는지 확인
export const canMoveBlock = (grid: Grid, block: Block): boolean => {
  for (let y = 0; y < block.shape.length; y++) {
    for (let x = 0; x < block.shape[y].length; x++) {
      if (block.shape[y][x]) {
        const newX = block.x + x;
        const newY = block.y + y;

        if (
          newX < 0 || // 좌측 경계 밖
          newX >= grid[0].length || // 우측 경계 밖
          newY >= grid.length || // 하단 경계 밖
          (newY >= 0 && grid[newY][newX]) // 다른 블록과 충돌
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

// 블록 모양을 90도 회전
export const rotateBlockShape = (block: Block): Block => {
  const rotatedShape = block.shape[0].map((_, index) =>
    block.shape.map((row) => row[index]).reverse()
  );
  return { ...block, shape: rotatedShape };
};

// 블록을 그리드에 배치
export const placeBlockOnGrid = (grid: Grid, block: Block): Grid => {
  const newGrid = grid.map((row) => [...row]);
  for (let y = 0; y < block.shape.length; y++) {
    for (let x = 0; x < block.shape[y].length; x++) {
      if (block.shape[y][x]) {
        const newY = block.y + y;
        const newX = block.x + x;
        if (newY >= 0 && newY < grid.length && newX >= 0 && newX < grid[0].length) {
          newGrid[newY][newX] = 1;
        }
      }
    }
  }
  return newGrid;
};

// 가득 찬 라인 제거 및 점수 계산
export const checkForFullLines = (grid: Grid): { newGrid: Grid; linesCleared: number } => {
  const newGrid = grid.filter((row) => row.some((cell) => cell === 0));
  const linesCleared = grid.length - newGrid.length;
  const emptyRows = Array(linesCleared).fill(Array(grid[0].length).fill(0));
  return { newGrid: [...emptyRows, ...newGrid], linesCleared };
};
