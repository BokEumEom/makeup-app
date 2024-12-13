export const BOARD_WIDTH = 10; // 보드의 가로 크기
export const BOARD_HEIGHT = 20; // 보드의 세로 크기

export const BLOCK_SIZE = 30; // 블록의 크기

export const EMPTY_BOARD = Array.from({ length: BOARD_HEIGHT }, () =>
  Array(BOARD_WIDTH).fill(0)
);

export const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]], // J
  [[1, 1], [1, 1]], // O
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
];

export const COLORS = [
  '#00f0f0', '#a000f0', '#f0a000', '#0000f0',
  '#f0f000', '#00f000', '#f00000',
];

export const SCORE_PER_LINE = 100; // 라인당 점수
export const LINES_PER_LEVEL = 10; // 레벨 당 라인 수
