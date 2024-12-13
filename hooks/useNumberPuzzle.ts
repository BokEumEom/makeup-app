import { useState, useEffect } from 'react';
import { shuffleArray } from '@/utils/shuffleArray';

export const useNumberPuzzle = (size: number) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    resetGame();
  }, [size]);

  const resetGame = () => {
    const initialNumbers = Array.from({ length: size }, (_, i) => (i < size - 1 ? i + 1 : 0));
    const shuffledNumbers = shuffleArray(initialNumbers);
    setNumbers(shuffledNumbers);

    const initialPositions = shuffledNumbers.map((_, index) => ({
      x: index % Math.sqrt(size),
      y: Math.floor(index / Math.sqrt(size)),
    }));
    setPositions(initialPositions);
    setIsCompleted(false);
  };

  const handlePress = (index: number) => {
    if (isCompleted) return;

    const emptyIndex = numbers.indexOf(0);
    const dimension = Math.sqrt(size);

    const isAdjacent =
      index === emptyIndex - dimension || // 위
      index === emptyIndex + dimension || // 아래
      (index === emptyIndex - 1 && Math.floor(index / dimension) === Math.floor(emptyIndex / dimension)) || // 왼쪽
      (index === emptyIndex + 1 && Math.floor(index / dimension) === Math.floor(emptyIndex / dimension)); // 오른쪽

    if (isAdjacent) {
      const newNumbers = [...numbers];
      [newNumbers[index], newNumbers[emptyIndex]] = [newNumbers[emptyIndex], newNumbers[index]];

      const newPositions = [...positions];
      [newPositions[index], newPositions[emptyIndex]] = [newPositions[emptyIndex], newPositions[index]];

      setNumbers(newNumbers);
      setPositions(newPositions);

      if (JSON.stringify(newNumbers) === JSON.stringify([...Array(size - 1).keys()].map((i) => i + 1).concat(0))) {
        setIsCompleted(true);
      }
    }
  };

  return { numbers, positions, isCompleted, handlePress, resetGame };
};
