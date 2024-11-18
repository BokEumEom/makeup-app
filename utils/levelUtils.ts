export const isLevelCompleted = (levelNumber: number, completedLevels: number[]) => {
  return completedLevels.includes(levelNumber);
};
