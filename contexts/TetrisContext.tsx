// contexts/TetrisContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Block, Direction, Grid } from '../types';
import {
  generateRandomBlock,
  canMoveBlock,
  rotateBlockShape,
  placeBlockOnGrid,
  checkForFullLines,
} from '../utils/tetrisUtils';

interface GameState {
  grid: Grid;
  activeBlock: Block | null;
  nextBlock: Block;
  score: number;
  level: number;
  isGameOver: boolean;
}

interface GameContextProps extends GameState {
  startGame: () => void;
  moveBlock: (direction: Direction) => void;
  rotateBlock: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

const createEmptyGrid = (): Grid => Array.from({ length: 20 }, () => Array(10).fill(0));

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid());
  const [activeBlock, setActiveBlock] = useState<Block | null>(null);
  const [nextBlock, setNextBlock] = useState<Block>(generateRandomBlock());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize game state
  const startGame = () => {
    const initialGrid = createEmptyGrid();
    const initialBlock = generateRandomBlock();
    initialBlock.y = 0; // Start the block at the top
    setGrid(initialGrid);
    setActiveBlock(initialBlock);
    setNextBlock(generateRandomBlock());
    setScore(0);
    setLevel(1);
    setIsGameOver(false);
  };

  // Reset game
  const resetGame = () => {
    startGame();
  };

  // Move the block in the specified direction
  const moveBlock = (direction: Direction) => {
    if (isGameOver || !activeBlock) return;

    let newBlock = { ...activeBlock };
    if (direction === 'left') newBlock.x -= 1;
    if (direction === 'right') newBlock.x += 1;
    if (direction === 'down') newBlock.y += 1;

    // Check if move is valid
    if (canMoveBlock(grid, newBlock)) {
      setActiveBlock(newBlock);
    } else if (direction === 'down') {
      // If block can't move down, lock it in place on the grid
      const updatedGrid = placeBlockOnGrid(grid, activeBlock);
      setGrid(updatedGrid);

      // Check for full lines
      const { newGrid, linesCleared } = checkForFullLines(updatedGrid);
      setGrid(newGrid);
      const newScore = score + linesCleared * 10 * level;
      setScore(newScore);

      // Increase level after clearing lines
      if (linesCleared > 0 && Math.floor(newScore / 100) >= level) {
        setLevel((prevLevel) => prevLevel + 1);
      }

      // Spawn a new block
      const nextActiveBlock = { ...nextBlock, x: 3, y: 0 }; // Adjust position as needed
      const newNextBlock = generateRandomBlock();
      if (!canMoveBlock(newGrid, nextActiveBlock)) {
        setIsGameOver(true); // End game if new block can't be placed
        setActiveBlock(null);
      } else {
        setActiveBlock(nextActiveBlock);
        setNextBlock(newNextBlock);
      }
    }
  };

  // Rotate the block
  const rotateBlock = () => {
    if (isGameOver || !activeBlock) return;

    const rotatedBlock = rotateBlockShape(activeBlock);
    if (canMoveBlock(grid, rotatedBlock)) {
      setActiveBlock(rotatedBlock);
    }
  };

  // Automatically move block down at intervals
  useEffect(() => {
    if (isGameOver || !activeBlock) return;

    const interval = setInterval(() => {
      moveBlock('down');
    }, Math.max(1000 - level * 100, 200)); // Decrease interval time as level increases

    return () => clearInterval(interval);
  }, [activeBlock, grid, level, isGameOver]);

  // Start the game when component mounts
  useEffect(() => {
    startGame();
  }, []);

  return (
    <GameContext.Provider
      value={{
        grid,
        activeBlock,
        nextBlock,
        score,
        level,
        isGameOver,
        startGame,
        moveBlock,
        rotateBlock,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
