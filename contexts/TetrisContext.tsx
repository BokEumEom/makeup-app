// contexts/TetrisContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { Audio } from 'expo-av';
import { Block, Direction, Grid } from '../types';
import {
  generateRandomBlock,
  canMoveBlock,
  rotateBlockShape,
  placeBlockOnGrid,
  checkForFullLines,
} from '../utils/tetrisUtils';

const createEmptyGrid = (): Grid => Array.from({ length: 20 }, () => Array(10).fill(0));

interface GameState {
  grid: Grid;
  activeBlock: Block | null;
  nextBlock: Block;
  score: number;
  level: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  isPaused: boolean;
  isSoundOn: boolean;
}

interface GameContextProps extends GameState {
  startGame: () => void;
  moveBlock: (direction: Direction) => void;
  rotateBlock: () => void;
  resetGame: () => void;
  pauseGame: () => void;
  dropBlock: () => void;
  toggleSound: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);
const INITIAL_DROP_SPEED = 1000;

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid());
  const [activeBlock, setActiveBlock] = useState<Block | null>(null);
  const [nextBlock, setNextBlock] = useState<Block>(generateRandomBlock());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [dropInterval, setDropInterval] = useState<NodeJS.Timeout | null>(null);

  // 블록 이동 및 회전, 사운드
  const [moveSound, setMoveSound] = useState<Audio.Sound | null>(null);
  const [rotateSound, setRotateSound] = useState<Audio.Sound | null>(null);
  const [lineClearSound, setLineClearSound] = useState<Audio.Sound | null>(null);
  const [gameOverSound, setGameOverSound] = useState<Audio.Sound | null>(null);

  const loadSounds = async () => {
    const [move, rotate, lineClear, gameOver] = await Promise.all([
      Audio.Sound.createAsync(require('@/assets/audio/background.mp3')),
      Audio.Sound.createAsync(require('@/assets/audio/background.mp3')),
      Audio.Sound.createAsync(require('@/assets/audio/background.mp3')),
      Audio.Sound.createAsync(require('@/assets/audio/background.mp3')),
    ]);
    setMoveSound(move.sound);
    setRotateSound(rotate.sound);
    setLineClearSound(lineClear.sound);
    setGameOverSound(gameOver.sound);
  };

  useEffect(() => {
    loadSounds();
    return () => {
      moveSound && moveSound.unloadAsync();
      rotateSound && rotateSound.unloadAsync();
      lineClearSound && lineClearSound.unloadAsync();
      gameOverSound && gameOverSound.unloadAsync();
    };
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundOn((prev) => !prev);
  }, []);

  const handleBlockPlacement = useCallback(
    (currentGrid: Grid, currentBlock: Block) => {
      const updatedGrid = placeBlockOnGrid(currentGrid, currentBlock);
      const { newGrid, linesCleared } = checkForFullLines(updatedGrid);

      const newScore = score + linesCleared * 10 * level;
      setScore(newScore);

      if (linesCleared > 0 && Math.floor(newScore / 100) > level - 1) {
        setLevel((prev) => prev + 1);
      }

      const nextActiveBlock = generateRandomBlock();

      if (!canMoveBlock(newGrid, nextActiveBlock)) {
        setIsGameOver(true);
        setIsGameStarted(false);
        setActiveBlock(null);
        if (dropInterval) clearInterval(dropInterval);
        if (isSoundOn && gameOverSound) {
          gameOverSound.replayAsync();
        }
      } else {
        setActiveBlock(nextActiveBlock);
        setNextBlock(generateRandomBlock());
      }

      setGrid(newGrid);

      if (linesCleared > 0 && isSoundOn && lineClearSound) {
        lineClearSound.replayAsync();
      }
    },
    [level, score, dropInterval, isSoundOn, lineClearSound, gameOverSound]
  );

  const moveBlock = useCallback(
    (direction: Direction) => {
      if (!activeBlock || isGameOver || isPaused || !isGameStarted) return;

      let newBlock = { ...activeBlock };
      if (direction === 'left') newBlock.x -= 1;
      if (direction === 'right') newBlock.x += 1;
      if (direction === 'down') newBlock.y += 1;

      if (canMoveBlock(grid, newBlock)) {
        setActiveBlock(newBlock);
        if (isSoundOn && moveSound) {
          moveSound.replayAsync();
        }
      } else if (direction === 'down') {
        handleBlockPlacement(grid, activeBlock);
      }
    },
    [grid, activeBlock, isGameOver, isPaused, isGameStarted, handleBlockPlacement, isSoundOn, moveSound]
  );

  const dropBlock = useCallback(() => {
    if (!isGameStarted || !activeBlock || isPaused || isGameOver) return;

    let newBlock = { ...activeBlock };
    while (canMoveBlock(grid, { ...newBlock, y: newBlock.y + 1 })) {
      newBlock.y += 1;
    }
    setActiveBlock(newBlock);
    handleBlockPlacement(grid, newBlock);
  }, [grid, activeBlock, isGameStarted, isPaused, isGameOver, handleBlockPlacement]);

  // 자동 드롭을 관리하는 useEffect
  useEffect(() => {
    if (isGameOver || isPaused || !isGameStarted) {
      if (dropInterval) clearInterval(dropInterval);
      return;
    }

    const speed = Math.max(INITIAL_DROP_SPEED - (level - 1) * 100, 100);
    const interval = setInterval(() => {
      moveBlock('down');
    }, speed);
    setDropInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [isGameOver, isPaused, isGameStarted, level, moveBlock]);

  const startGame = useCallback(() => {
    if (dropInterval) clearInterval(dropInterval);
    setGrid(createEmptyGrid());
    const initialBlock = generateRandomBlock();
    setActiveBlock(initialBlock);
    setNextBlock(generateRandomBlock());
    setScore(0);
    setLevel(1);
    setIsGameOver(false);
    setIsGameStarted(true);
    setIsPaused(false);
  }, []);

  const pauseGame = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const resetGame = useCallback(() => {
    if (dropInterval) clearInterval(dropInterval);
    startGame();
  }, [dropInterval, startGame]);

  const rotateBlock = useCallback(() => {
    if (!activeBlock || isGameOver || isPaused || !isGameStarted) return;

    const rotatedBlock = rotateBlockShape(activeBlock);
    if (canMoveBlock(grid, rotatedBlock)) {
      setActiveBlock(rotatedBlock);
      if (isSoundOn && rotateSound) {
        rotateSound.replayAsync();
      }
    }
  }, [grid, activeBlock, isGameOver, isPaused, isGameStarted, isSoundOn, rotateSound]);

  return (
    <GameContext.Provider
      value={{
        grid,
        activeBlock,
        nextBlock,
        score,
        level,
        isGameOver,
        isGameStarted,
        isPaused,
        isSoundOn,
        startGame,
        moveBlock,
        rotateBlock,
        resetGame,
        pauseGame,
        dropBlock,
        toggleSound,
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
