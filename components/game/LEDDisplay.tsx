import React from 'react';
import { View, StyleSheet } from 'react-native';
import LEDCircle from './LEDCircle';

interface LEDDisplayProps {
  pattern: number[][];
}

const LEDDisplay: React.FC<LEDDisplayProps> = ({ pattern }) => {
  if (pattern.length !== 8 || pattern.some((row) => row.length !== 9)) {
    console.warn("Invalid pattern size");
    return null;
  }

  return (
    <View style={styles.ledGrid}>
      {pattern.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.ledRow}>
          {row.map((cell, colIndex) => (
            <LEDCircle key={`${rowIndex}-${colIndex}`} isOn={cell === 1} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ledGrid: {
    flexDirection: 'column',
    padding: 10, // 줄임으로써 LED 간 간격을 최적화할 수 있음
    alignItems: 'center',
  },
  ledRow: {
    flexDirection: 'row',
  },
});

export default LEDDisplay;
