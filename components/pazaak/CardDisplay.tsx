// CardDisplay.tsx

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type CardDisplayProps = {
  value: number | null;
  hidden?: boolean;
  type?: 'main' | 'side';
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.15;
const cardHeight = cardWidth * 1.5;

const CardDisplay: React.FC<CardDisplayProps> = ({ value, hidden = false, type = 'main' }) => {
  const isEmpty = value === null;
  const shouldShowIcon = type === 'side' && hidden;

  return (
    <View style={[styles.card, isEmpty ? styles.emptySlot : styles.occupiedSlot, shouldShowIcon && styles.hiddenCard]}>
      {shouldShowIcon ? (
        <Ionicons name="diamond-sharp" style={styles.diamondIcon} />
      ) : !isEmpty ? (
        <>
          <Text style={[styles.symbol, styles.topLeftSymbol]}>+</Text>
          <Text style={[styles.symbol, styles.bottomRightSymbol]}>+</Text>
          <View style={styles.stripe}>
            <View style={styles.diamond} />
          </View>
          <Text style={styles.number}>{value > 0 ? `+${value}` : value}</Text>
        </>
      ) : null}
    </View>
  );
};

export default CardDisplay;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    position: 'relative',
  },
  emptySlot: {
    borderWidth: 2,
    borderColor: '#aaa',
    backgroundColor: 'transparent',
  },
  occupiedSlot: {
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#2196f3',
  },
  hiddenCard: {
    backgroundColor: '#555',
    borderColor: '#777',
  },
  stripe: {
    position: 'absolute',
    width: '100%',
    height: 0.25 * cardHeight,
    backgroundColor: 'white',
    top: '50%',
    transform: [{ translateY: -0.125 * cardHeight }],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  diamondIcon: {
    fontSize: 0.4 * cardWidth,
    color: '#fff',
    position: 'absolute',
    zIndex: 2,
  },
  diamond: {
    width: 0.5 * cardWidth,
    height: 0.5 * cardWidth,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
  },
  number: {
    color: '#0099ff',
    fontSize: 0.3 * cardWidth,
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
    position: 'relative',
    zIndex: 3,
  },
  symbol: {
    fontSize: 0.2 * cardWidth,
    color: 'white',
    position: 'absolute',
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
  },
  topLeftSymbol: {
    top: 10,
    left: 10,
  },
  bottomRightSymbol: {
    bottom: 10,
    right: 10,
  },
});
