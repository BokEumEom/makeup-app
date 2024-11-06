// src/types/bricks.ts

export interface GameState {
  score: number;
  lives: number;
  level: number;
  isPaused: boolean;
  isGameOver: boolean;
}

export interface Brick {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isVisible: boolean;
  points: number;
  health: number;
  color: string;
}
