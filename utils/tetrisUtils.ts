// utils/tetrisUtils.ts
import { Block, Direction, Grid } from '../types';

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

// Generate a random Tetris block
export const generateRandomBlock = (): Block => {
  const shape = BLOCK_SHAPES[Math.floor(Math.random() * BLOCK_SHAPES.length)];
  return {
    shape,
    x: Math.floor(10 / 2 - shape[0].length / 2), // Centered horizontally
    y: 0, // Starts at the top
  };
};

// Check if the block can move to a specified position
export const canMoveBlock = (grid: Grid, block: Block): boolean => {
  for (let y = 0; y < block.shape.length; y++) {
    for (let x = 0; x < block.shape[y].length; x++) {
      if (block.shape[y][x]) {
        const newX = block.x + x;
        const newY = block.y + y;

        // Check boundaries
        if (
          newX < 0 || // Out of left boundary
          newX >= grid[0].length || // Out of right boundary
          newY >= grid.length || // Out of bottom boundary
          (newY >= 0 && grid[newY][newX]) // Collision with another block
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

// Rotate a block shape 90 degrees clockwise
export const rotateBlockShape = (block: Block): Block => {
  const rotatedShape = block.shape[0].map((_, index) =>
    block.shape.map(row => row[index]).reverse()
  );
  return { ...block, shape: rotatedShape };
};

// Place block on the grid when it reaches the bottom or collides
export const placeBlockOnGrid = (grid: Grid, block: Block): Grid => {
  const newGrid = grid.map(row => row.slice()); // Deep copy of grid
  for (let y = 0; y < block.shape.length; y++) {
    for (let x = 0; x < block.shape[y].length; x++) {
      if (block.shape[y][x]) {
        const newX = block.x + x;
        const newY = block.y + y;
        if (newY >= 0) { // Prevent out-of-bounds placement
          newGrid[newY][newX] = 1;
        }
      }
    }
  }
  return newGrid;
};

// Check and clear full lines, returning updated grid and number of lines cleared
export const checkForFullLines = (grid: Grid): { newGrid: Grid; linesCleared: number } => {
  const rowsCleared = grid.filter(row => !row.every(cell => cell === 1));
  const linesCleared = grid.length - rowsCleared.length;
  const newGrid = Array(linesCleared).fill(Array(grid[0].length).fill(0)).concat(rowsCleared);

  return { newGrid, linesCleared };
};
