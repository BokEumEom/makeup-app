export const LED_PATTERNS = {
  Rock: [
    [0, 0, 0, 1, 1, 1, 0, 0, 0],  // The top fingers part
    [0, 0, 1, 0, 0, 0, 1, 0, 0],  // Middle curve between fingers
    [0, 1, 0, 0, 1, 0, 0, 1, 0],  // Another middle row with curved pattern
    [1, 0, 1, 1, 1, 1, 1, 0, 1],  // Side curves and the central finger
    [1, 0, 1, 0, 0, 0, 1, 0, 1],  // Lower body of the hand
    [0, 1, 0, 1, 1, 1, 0, 1, 0],  // Slightly narrowing towards the wrist
    [0, 0, 1, 0, 0, 0, 1, 0, 0],  // Bottom wrist-like curve
    [0, 0, 0, 1, 1, 1, 0, 0, 0],  // Bottom of the hand
  ],
  Paper: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  Scissors: [
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1],
    [0, 1, 0, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
  ],
} as const;


// 패턴 유효성 검증 함수
export const validatePattern = (pattern: number[][]): boolean => {
  return (
    pattern.length === 8 &&
    pattern.every((row) => row.length === 9)
  );
};
