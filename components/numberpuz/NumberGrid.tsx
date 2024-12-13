import React from 'react';
import { View, StyleSheet } from 'react-native';
import NumberTile from './NumberTile';

interface NumberGridProps {
  numbers: number[];
  onPress: (index: number) => void;
}

const NumberGrid: React.FC<NumberGridProps> = ({ numbers, onPress }) => {
  const dimension = Math.sqrt(numbers.length);
  const tileSize = 75; // 타일 크기
  const gridSize = dimension * (tileSize + 5); // 간격 포함 그리드 크기

  return (
    <View style={[styles.grid, { width: gridSize, height: gridSize }]}>
      {numbers.map((num, index) => (
        <NumberTile key={index} number={num} onPress={() => onPress(index)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default NumberGrid;
