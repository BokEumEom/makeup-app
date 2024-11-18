// types/index.ts

// Represents the shape of a Tetris block as a 2D array, where 1 indicates a filled cell
export type Shape = number[][];

// Block represents an individual Tetris block with a specific shape and position on the grid
export interface Block {
  shape: Shape;  // The shape of the block as a 2D array
  x: number;     // X-coordinate of the block on the grid (horizontal position)
  y: number;     // Y-coordinate of the block on the grid (vertical position)
}

// Grid represents the entire Tetris game board as a 2D array, where 0 is an empty cell and 1 is a filled cell
export type Grid = number[][];

// Direction type restricts movement options to left, right, or down
export type Direction = 'left' | 'right' | 'down';
