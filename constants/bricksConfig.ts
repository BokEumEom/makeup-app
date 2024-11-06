// constants/bricksConfig.ts

import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const GAME_CONFIG = {
  BALL_SIZE: 15,
  MAX_VELOCITY: 8,
  PADDLE_WIDTH: 100,
  PADDLE_HEIGHT: 20,
  BRICK_ROWS: 5,
  BRICK_COLS: 6,
  BRICK_HEIGHT: 20,
  BRICK_MARGIN: 4,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  PADDLE_BOTTOM_MARGIN: 30,
  INITIAL_LIVES: 3,
};
