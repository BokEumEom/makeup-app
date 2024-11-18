// app/components/pazaak/SideDeck.tsx

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CardDisplay from './CardDisplay';

type SideDeckProps = {
  sideDeck: (number | null)[]; // `null` indicates used card slots
  onPlayCard?: (cardValue: number, index: number) => void;
  type?: 'player' | 'opponent';
};

const SideDeck: React.FC<SideDeckProps> = ({ sideDeck, onPlayCard, type = 'player' }) => {
  const handlePlayCard = (value: number | null, index: number) => {
    if (value !== null && onPlayCard) {
      onPlayCard(value, index);
    }
  };

  return (
    <View style={[styles.sideDeckContainer, type === 'opponent' && styles.opponentDeck]}>
      <View style={styles.cardRow}>
        {sideDeck.map((value, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePlayCard(value, index)}
            disabled={type === 'opponent' || value === null} // Disable if opponent's deck or slot is empty
            style={styles.cardWrapper}
          >
            <CardDisplay
              value={value} // `null` values render as empty slots
              hidden={type === 'opponent' && value !== null} // Opponent's deck hides values
              type="side"
              animationDirection={type === 'player' ? 'up' : 'down'}
            />
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
  },
  opponentDeck: {},
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  cardWrapper: {
    width: 60,
    height: 90, // Consistent height for alignment
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SideDeck;
