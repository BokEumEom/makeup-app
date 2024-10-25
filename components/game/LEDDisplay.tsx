// components/game/LEDDisplay.tsx

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

interface LEDDisplayProps {
  pattern: number[][];
}

const LEDDisplay: React.FC<LEDDisplayProps> = ({ pattern }) => {
  // LED가 점멸하는 애니메이션을 위한 opacity 설정
  const ledOpacity = useSharedValue(1);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 애니메이션 설정
    ledOpacity.value = withRepeat(
      withTiming(0.2, { duration: 1 }),
      -1,
      true
    );

    // 컴포넌트가 언마운트될 때 애니메이션 정지
    return () => {
      ledOpacity.value = 1;
    };
  }, []);

  return (
    <View style={styles.ledGrid}>
      {pattern.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.ledRow}>
          {row.map((cell, colIndex) => {
            const animatedStyle = useAnimatedStyle(() => ({
              opacity: cell ? ledOpacity.value : 0.2, // LED가 꺼져 있을 때는 항상 어둡게
            }));
            return (
              <Animated.View
                key={`${rowIndex}-${colIndex}`}
                style={[styles.led, cell ? styles.ledOn : styles.ledOff, animatedStyle]}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ledGrid: {
    flexDirection: 'column',
    padding: 15,
  },
  ledRow: {
    flexDirection: 'row',
  },
  led: {
    width: 18,
    height: 18,
    borderRadius: 9,
    margin: 2,
  },
  ledOn: {
    backgroundColor: '#ff0000',
  },
  ledOff: {
    backgroundColor: '#300000',
  },
});

export default LEDDisplay;
