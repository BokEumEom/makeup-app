// SideDeck.tsx

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CardDisplay from './CardDisplay';

type SideDeckProps = {
  sideDeck: number[];
  onPlayCard?: (cardValue: number, index: number) => void;
  type?: 'player' | 'opponent';
};

const SideDeck: React.FC<SideDeckProps> = ({ sideDeck, onPlayCard, type = 'player' }) => {
  return (
    <View style={[styles.sideDeckContainer, type === 'opponent' && styles.opponentDeck]}>
      <View style={styles.cardRow}>
        {sideDeck.map((value, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPlayCard && onPlayCard(value, index)}
            disabled={type === 'opponent'} // Disable interaction for opponent's side deck
          >
            <CardDisplay value={value} hidden={type === 'opponent'} type="side" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sideDeckContainer: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#1b3b5a',
    borderRadius: 10,
    marginVertical: 5,
  },
  opponentDeck: {
    backgroundColor: '#4b5563', // Darker background for opponent's side deck
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SideDeck;
