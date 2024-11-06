// src/utils/bricksUtils.ts

import { GAME_CONFIG } from '@/constants/bricksConfig';
import { Brick } from '@/types/bricks';

export const initializeBricks = (): Brick[] => {
  const { BRICK_ROWS, BRICK_COLS, BRICK_MARGIN, BRICK_HEIGHT, SCREEN_WIDTH } = GAME_CONFIG;
  const brickWidth = (SCREEN_WIDTH - (BRICK_COLS + 1) * BRICK_MARGIN) / BRICK_COLS;

  const bricks: Brick[] = [];
  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLS; col++) {
      bricks.push({
        id: `${row}-${col}`,
        x: col * (brickWidth + BRICK_MARGIN) + BRICK_MARGIN,
        y: row * (BRICK_HEIGHT + BRICK_MARGIN) + BRICK_MARGIN + 50,
        width: brickWidth,
        height: BRICK_HEIGHT,
        isVisible: true,
        points: (GAME_CONFIG.BRICK_ROWS - row) * 10,
        health: 1, // 필요에 따라 조정 가능
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      });
    }
  }
  return bricks;
};
