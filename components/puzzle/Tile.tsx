// components/puzzle/Tile.tsx
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

type TileProps = {
  value: number;
};

const Tile = ({ value }: TileProps) => {
  const animatedValue = new Animated.Value(value ? 1 : 0);

  Animated.spring(animatedValue, {
    toValue: 1,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View
      style={[
        styles.tile,
        { backgroundColor: getTileColor(value), opacity: animatedValue },
      ]}
    >
      <Text style={styles.tileText}>{value > 0 ? value : ''}</Text>
    </Animated.View>
  );
};

const getTileColor = (value: number): string => {
  switch (value) {
    case 2:
      return '#eee4da';
    case 4:
      return '#ede0c8';
    case 8:
      return '#f2b179';
    case 16:
      return '#f59563';
    case 32:
      return '#f67c5f';
    case 64:
      return '#f65e3b';
    case 128:
      return '#edcf72';
    case 256:
      return '#edcc61';
    case 512:
      return '#edc850';
    case 1024:
      return '#edc53f';
    case 2048:
      return '#edc22e';
    case 4096:
    case 8192:
      return '#3c3a32';
    default:
      return '#cdc1b4';
  }
};

const styles = StyleSheet.create({
  tile: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  tileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#776e65',
  },
});

export default Tile;
