import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CardDisplay from './CardDisplay';

type GameBoardProps = {
  playerCards: (number | null)[];
  opponentCards: (number | null)[];
  playerScore: number;
  opponentScore: number;
  playerWins: number;
  opponentWins: number;
  playerFinalScore?: number;
  opponentFinalScore?: number;
  currentTurn: 'player' | 'opponent';
};

const GameBoard: React.FC<GameBoardProps> = ({
  playerCards,
  opponentCards,
  playerScore,
  opponentScore,
  playerWins,
  opponentWins,
  playerFinalScore,
  opponentFinalScore,
  currentTurn,
}) => {
  const firstRowSlots = Array(4).fill(null);
  const secondRowSlots = Array(5).fill(null);

  return (
    <View style={styles.gameBoard}>
      {/* Opponent Zone */}
      <View
        style={[
          styles.zone,
          currentTurn === 'player' && styles.opponentDisabled,
        ]}
      >
        <View style={styles.cardRow}>
          {/* Opponent's Score and Wins */}
          <View style={styles.scoreSlot}>
            <Text style={styles.scoreText}>{opponentScore}</Text>
            <View style={styles.winsContainer}>
              {Array.from({ length: 3 }).map((_, index) => (
                <View
                  key={`opponent-win-${index}`}
                  style={[styles.winDot, index < opponentWins && styles.winDotFilled]}
                />
              ))}
            </View>
          </View>
          {firstRowSlots.map((_, index) => (
            <CardDisplay
              key={`opponent-${index}`}
              value={opponentCards[index]}
              hidden={true}
              animationDirection="left"
            />
          ))}
        </View>
        <View style={styles.cardRow}>
          {secondRowSlots.map((_, index) => (
            <CardDisplay
              key={`opponent-${index + 4}`}
              value={opponentCards[index + 4]}
              hidden={true}
              animationDirection="left"
            />
          ))}
        </View>
        {opponentFinalScore !== undefined && (
          <Text style={styles.finalScore}>{opponentFinalScore}</Text>
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Player Zone */}
      <View
        style={[
          styles.zone,
          currentTurn === 'opponent' && styles.playerDisabled,
        ]}
      >
        <View style={styles.cardRow}>
          {/* Player's Score and Wins */}
          <View style={styles.scoreSlot}>
            <Text style={styles.scoreText}>{playerScore}</Text>
            <View style={styles.winsContainer}>
              {Array.from({ length: 3 }).map((_, index) => (
                <View
                  key={`player-win-${index}`}
                  style={[styles.winDot, index < playerWins && styles.winDotFilled]}
                />
              ))}
            </View>
          </View>
          {firstRowSlots.map((_, index) => (
            <CardDisplay
              key={`player-${index}`}
              value={playerCards[index]}
              hidden={false}
              animationDirection="left"
            />
          ))}
        </View>
        <View style={styles.cardRow}>
          {secondRowSlots.map((_, index) => (
            <CardDisplay
              key={`player-${index + 4}`}
              value={playerCards[index + 4]}
              hidden={false}
              animationDirection="left"
            />
          ))}
        </View>
        {playerFinalScore !== undefined && (
          <Text style={styles.finalScore}>{playerFinalScore}</Text>
        )}
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  gameBoard: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  zone: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
  opponentDisabled: {
    opacity: 0.5,
  },
  playerDisabled: {
    backgroundColor: '#3a3a3a',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  scoreSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.17,
    height: 90,
    backgroundColor: 'transparent',
  },
  scoreText: {
    fontSize: 26,
    color: '#FFD700',
    fontWeight: 'bold',
    fontFamily: 'PressStart2P',
  },
  winsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  winDot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: '#0f253a', // 비어 있는 상태의 색상
    marginHorizontal: 1,
  },
  winDotFilled: {
    backgroundColor: '#FFD700', // 승리한 횟수의 색상
  },
  divider: {
    width: '90%',
    height: 2,
    backgroundColor: '#FFD700',
    marginVertical: 15,
  },
  finalScore: {
    fontSize: 40,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'PressStart2P',
  },
});

export default GameBoard;
