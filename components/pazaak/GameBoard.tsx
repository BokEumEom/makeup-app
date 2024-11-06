import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardDisplay from './CardDisplay';

type GameBoardProps = {
  playerCards: (number | null)[];
  opponentCards: (number | null)[];
  playerScore: number;
  opponentScore: number;
  playerWins: number;
  opponentWins: number;
};

const GameBoard: React.FC<GameBoardProps> = ({
  playerCards,
  opponentCards,
  playerScore,
  opponentScore,
  playerWins,
  opponentWins,
}) => {
  const firstRowSlots = Array(4).fill(null);
  const secondRowSlots = Array(5).fill(null);

  return (
    <View style={styles.gameBoard}>
      {/* Opponent Zone */}
      <View style={styles.zone}>
        <View style={styles.cardRow}>
          {/* Opponent's Score and Wins */}
          <View style={styles.scoreSlot}>
            <Text style={styles.scoreText}>{opponentScore}</Text>
            <View style={styles.winsContainer}>
              {/* Each dot represents a win, filled based on opponentWins */}
              {Array.from({ length: 3 }).map((_, index) => (
                <View
                  key={`opponent-win-${index}`}
                  style={[styles.winDot, index < opponentWins && styles.winDotFilled]}
                />
              ))}
            </View>
          </View>
          {firstRowSlots.map((_, index) => (
            <CardDisplay key={`opponent-${index}`} value={opponentCards[index]} hidden={true} />
          ))}
        </View>
        <View style={styles.cardRow}>
          {secondRowSlots.map((_, index) => (
            <CardDisplay key={`opponent-${index + 5}`} value={opponentCards[index + 5]} hidden={true} />
          ))}
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Player Zone */}
      <View style={styles.zone}>
        <View style={styles.cardRow}>
          {/* Player's Score and Wins */}
          <View style={styles.scoreSlot}>
            <Text style={styles.scoreText}>{playerScore}</Text>
            <View style={styles.winsContainer}>
              {/* Each dot represents a win, filled based on playerWins */}
              {Array.from({ length: 3 }).map((_, index) => (
                <View
                  key={`player-win-${index}`}
                  style={[styles.winDot, index < playerWins && styles.winDotFilled]}
                />
              ))}
            </View>
          </View>
          {firstRowSlots.map((_, index) => (
            <CardDisplay key={`player-${index}`} value={playerCards[index]} hidden={false} />
          ))}
        </View>
        <View style={styles.cardRow}>
          {secondRowSlots.map((_, index) => (
            <CardDisplay key={`player-${index + 5}`} value={playerCards[index + 5]} hidden={false} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameBoard: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  zone: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  scoreSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 90,
    backgroundColor: 'transparent',
  },
  scoreText: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  winsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  winDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 1,
  },
  winDotFilled: {
    backgroundColor: '#FFD700',
  },
  divider: {
    width: '90%',
    height: 2,
    backgroundColor: '#FFD700',
    marginVertical: 20,
  },
});

export default GameBoard;
