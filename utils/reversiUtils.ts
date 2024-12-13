import { DiscState } from '@/types/reversiTypes';

export const initializeDiscs = (): DiscState[][] => {
  const discs = Array(8)
    .fill(null)
    .map(() => Array(8).fill('empty') as DiscState[]);

  discs[3][3] = 'white';
  discs[4][4] = 'white';
  discs[3][4] = 'black';
  discs[4][3] = 'black';

  return discs;
};

export const initializeBlockedCells = (): Set<string> => {
  return new Set<string>(); // 차단된 셀 없음
};

export const canMove = (
  discs: DiscState[][],
  id: 'black' | 'white',
  blockedCells: Set<string>
): boolean => {
  return discs.some((row, rowIndex) =>
    row.some(
      (_, colIndex) =>
        !blockedCells.has(`${rowIndex}-${colIndex}`) &&
        getAffectedDiscs(discs, id, rowIndex, colIndex).length > 0
    )
  );
};

export const getAffectedDiscs = (
  discs: DiscState[][],
  id: 'black' | 'white',
  row: number,
  col: number
): { row: number; col: number }[] => {
  if (discs[row][col] !== 'empty') return [];
  const opponent = id === 'black' ? 'white' : 'black';
  const directions = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: 1 },
    { dx: -1, dy: -1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
  ];
  const affected: { row: number; col: number }[] = [];

  directions.forEach(({ dx, dy }) => {
    const temp: { row: number; col: number }[] = [];
    let x = row + dx;
    let y = col + dy;

    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      if (discs[x][y] === opponent) {
        temp.push({ row: x, col: y });
      } else if (discs[x][y] === id) {
        affected.push(...temp);
        break;
      } else {
        break;
      }
      x += dx;
      y += dy;
    }
  });

  return affected;
};

export const flipDiscs = (
  discs: DiscState[][],
  affected: { row: number; col: number }[],
  row: number,
  col: number,
  id: 'black' | 'white'
): DiscState[][] => {
  const newDiscs = discs.map((r) => r.slice());
  affected.forEach(({ row, col }) => {
    newDiscs[row][col] = id;
  });
  newDiscs[row][col] = id;
  return newDiscs;
};

export const calculateScore = (discs: DiscState[][]): { black: number; white: number } => {
  let black = 0;
  let white = 0;

  for (let row = 0; row < discs.length; row++) {
    for (let col = 0; col < discs[row].length; col++) {
      if (discs[row][col] === 'black') {
        black++;
      } else if (discs[row][col] === 'white') {
        white++;
      }
    }
  }

  return { black, white };
};

export const calculateAIMove = (
  discs: DiscState[][],
  turn: 'black' | 'white',
  blockedCells: Set<string>
): { row: number; col: number; affected: { row: number; col: number }[] } | null => {
  const possibleMoves: { row: number; col: number; affected: { row: number; col: number }[] }[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (discs[row][col] === 'empty' && !blockedCells.has(`${row}-${col}`)) {
        const affected = getAffectedDiscs(discs, turn, row, col);
        if (affected.length > 0) {
          possibleMoves.push({ row, col, affected });
        }
      }
    }
  }

  if (possibleMoves.length === 0) {
    return null; // No valid moves
  }

  // Simple AI: Return the first possible move
  return possibleMoves[0];
};

export const getPlayableCells = (
  discs: ('empty' | 'black' | 'white')[][],
  currentPlayer: 'black' | 'white',
  blockedCells: Set<string>
): Set<string> => {
  const playableCells = new Set<string>();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      // 이미 돌이 있거나 차단된 셀은 제외
      if (discs[row][col] !== 'empty' || blockedCells.has(`${row}-${col}`)) continue;

      // 해당 위치에 돌을 놓을 수 있는지 확인
      const affectedDiscs = getAffectedDiscs(discs, currentPlayer, row, col);
      if (affectedDiscs.length > 0) {
        playableCells.add(`${row}-${col}`);
      }
    }
  }

  return playableCells;
};