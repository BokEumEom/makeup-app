// hooks/useTetrisLogic.ts
import { useState, useCallback } from 'react';
import {
  generatePiece,
  rotatePiece,
  checkCollision,
  mergePiece,
  clearLines,
} from '../utils/tetrisHelpers';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  SCORE_PER_LINE,
  LINES_PER_LEVEL,
} from '../constants/tetrisConstants';

export const useTetrisLogic = () => {
  const [board, setBoard] = useState(() =>
    Array.from({ length: BOARD_HEIGHT }, () =>
      Array(BOARD_WIDTH).fill(0)
    )
  );
  const [currentPiece, setCurrentPiece] = useState(generatePiece());
  const [nextPiece, setNextPiece] = useState(generatePiece()); // 다음 블록 관리
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  const updateGame = useCallback(() => {
    const nextPosition = { ...currentPiece, y: currentPiece.y + 1 };

    if (checkCollision(board, nextPosition)) {
      // 병합된 보드 업데이트
      const mergedBoard = mergePiece(board, currentPiece);
      setBoard(mergedBoard);

      // 줄 삭제 및 점수 업데이트
      const { newBoard, clearedLines } = clearLines(mergedBoard);
      setBoard(newBoard); // 삭제된 줄 반영
      setScore((prevScore) => prevScore + clearedLines * SCORE_PER_LINE);

      // 레벨 업 조건 확인
      const newScore = score + clearedLines * SCORE_PER_LINE;
      if (newScore >= level * LINES_PER_LEVEL * SCORE_PER_LINE) {
        setLevel((prevLevel) => prevLevel + 1);
      }

      // 현재 블록을 다음 블록으로 교체하고 새로운 다음 블록 생성
      setCurrentPiece(nextPiece);
      const newNextPiece = generatePiece();
      setNextPiece(newNextPiece);

      // 게임 오버 확인
      if (checkCollision(newBoard, nextPiece)) {
        setIsGameOver(true);
      }
    } else {
      setCurrentPiece(nextPosition); // 충돌이 없으면 블록 이동
    }
  }, [board, currentPiece, nextPiece, score, level]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (isGameOver) {
        return;
      }

      const newPosition = { ...currentPiece };

      switch (key) {
        case 'ArrowLeft':
          newPosition.x -= 1;
          if (!checkCollision(board, newPosition)) {
            setCurrentPiece(newPosition);
          }
          break;

        case 'ArrowRight':
          newPosition.x += 1;
          if (!checkCollision(board, newPosition)) {
            setCurrentPiece(newPosition);
          }
          break;

        case 'ArrowDown':
          newPosition.y += 1;
          if (!checkCollision(board, newPosition)) {
            setCurrentPiece(newPosition);
          }
          break;

        case 'ArrowUp':
          const rotatedPiece = rotatePiece(newPosition);
          if (!checkCollision(board, rotatedPiece)) {
            setCurrentPiece(rotatedPiece);
          }
          break;

        case ' ':
          // Drop the piece until collision
          while (!checkCollision(board, newPosition)) {
            newPosition.y += 1;
          }
          newPosition.y -= 1; // 충돌 후 한 칸 위로 이동

          // 병합된 보드 업데이트
          const mergedBoard = mergePiece(board, newPosition);
          setBoard(mergedBoard);

          // 줄 삭제 및 점수 업데이트
          const { newBoard, clearedLines } = clearLines(mergedBoard);
          setBoard(newBoard);
          setScore((prevScore) => prevScore + clearedLines * SCORE_PER_LINE);

          // 현재 블록을 다음 블록으로 교체하고 새로운 다음 블록 생성
          setCurrentPiece(nextPiece);
          const newNextPiece = generatePiece();
          setNextPiece(newNextPiece);

          // 게임 오버 확인
          if (checkCollision(newBoard, nextPiece)) {
            setIsGameOver(true);
          }
          break;

        default:
          console.log('Unhandled key:', key);
      }
    },
    [board, currentPiece, nextPiece, isGameOver]
  );

  return {
    board,
    currentPiece,
    nextPiece, // 정확히 관리된 다음 블록
    score,
    level,
    isGameOver,
    updateGame,
    handleKeyPress,
  };
};
