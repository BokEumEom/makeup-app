// components/TetrisGrid.tsx

import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useGame } from '@/contexts/TetrisContext';

interface CellProps {
  filled: boolean;
}

interface RowProps {
  row: boolean[];
}

const TetrisGrid: React.FC = () => {
  const { grid, activeBlock } = useGame();

  // activeBlock을 그리드에 반영하여 현재 상태를 표시
  const displayGrid = React.useMemo(() => {
    // 그리드의 복사본 생성
    const gridCopy = grid.map((row) => [...row]);

    if (activeBlock) {
      const { shape, x: blockX, y: blockY } = activeBlock;

      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const gridX = blockX + x;
            const gridY = blockY + y;
            if (
              gridY >= 0 &&
              gridY < gridCopy.length &&
              gridX >= 0 &&
              gridX < gridCopy[0].length
            ) {
              gridCopy[gridY][gridX] = 1;
            }
          }
        }
      }
    }

    return gridCopy;
  }, [grid, activeBlock]);

  return (
    <View style={styles.grid}>
      {displayGrid.map((row, rowIndex) => (
        <MemoizedRow key={rowIndex} row={row.map((cell) => Boolean(cell))} />
      ))}
    </View>
  );
};

// Row와 Cell 컴포넌트를 메모이제이션 처리하여 렌더링 최적화
const Row: React.FC<RowProps> = ({ row }) => (
  <View style={styles.row}>
    {row.map((cell, cellIndex) => (
      <MemoizedCell key={cellIndex} filled={cell} />
    ))}
  </View>
);

const MemoizedRow = memo(Row);

const Cell: React.FC<CellProps> = ({ filled }) => (
  <View style={[styles.cell, filled ? styles.filledCell : styles.emptyCell]}>
    {filled ? <View style={styles.innerBlock} /> : <View style={styles.innerBorder} />}
  </View>
);

const MemoizedCell = memo(Cell);

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    backgroundColor: '#b2b8a3',
    borderWidth: 2,
    borderColor: '#333',
    padding: 4,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
    margin: 1,
  },
  filledCell: {
    backgroundColor: '#000',
  },
  emptyCell: {
    backgroundColor: '#b2b8a3',
  },
  innerBorder: {
    width: '80%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#8b8f87',
    backgroundColor: '#a5aa99',
  },
  innerBlock: {
    width: '80%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#000',
  },
});

export default TetrisGrid;
