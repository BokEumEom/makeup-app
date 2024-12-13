import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NumberTileProps {
  number: number;
  onPress: () => void;
}

const NumberTile: React.FC<NumberTileProps> = ({ number, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tile, number === 0 ? styles.emptyTile : styles.filledTile]}
      onPress={onPress}
      disabled={number === 0}
      activeOpacity={0.8}
    >
      <Text style={[styles.tileText, number === 0 && styles.emptyText]}>
        {number !== 0 ? number : ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 75,
    height: 75,
    margin: 2.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 4,
  },
  filledTile: {
    backgroundColor: '#87CEFA', // 더 밝은 파스텔 톤
  },
  emptyTile: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tileText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyText: {
    color: '#aaa',
  },
});

export default NumberTile;
