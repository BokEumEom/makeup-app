// PazaakGame.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameBoard from '@/components/pazaak/GameBoard';
import SideDeck from '@/components/pazaak/SideDeck';
import WelcomeModal from '@/components/pazaak/WelcomeModal';
import ActionBar from '@/components/pazaak/ActionBar'; // Import ActionBar component
import { PazaakGameProvider, usePazaakGame } from '@/contexts/PazaakContext';

const PazaakGameScreenContent = () => {
  const {
    gameStarted,
    playerTotalScore,
    opponentTotalScore,
    playerRoundWins,
    opponentRoundWins,
    playerCards,
    opponentCards,
    playerSideDeck,
    opponentSideDeck,
    currentTurn,
    playerHasStood,
    startGame,
    resetGame,
    handlePlayerTurn,
    handleStand,
    playSideCard,
    handleEndTurn,
  } = usePazaakGame();

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const startGameWithModal = () => {
    setShowWelcomeModal(false); // Close WelcomeModal
    startGame(); // Start the game
  };

  const quitGame = () => {
    resetGame(); // Reset game state
    setShowWelcomeModal(false); // Return to Start Game screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logoText}>PAZAAK</Text>
        <TouchableOpacity onPress={quitGame} style={styles.quitButton}>
          <Text style={styles.quitText}>QUIT</Text>
        </TouchableOpacity>
      </View>

      <SideDeck sideDeck={opponentSideDeck} type="opponent" />

      <GameBoard
        playerCards={playerCards}
        opponentCards={opponentCards}
        playerScore={playerTotalScore}
        opponentScore={opponentTotalScore}
        playerWins={playerRoundWins}
        opponentWins={opponentRoundWins}
      />

      <WelcomeModal visible={showWelcomeModal} onClose={startGameWithModal} />

      {gameStarted ? (
        <>
          <SideDeck sideDeck={playerSideDeck} onPlayCard={playSideCard} />
          <ActionBar
            currentTurn={currentTurn}
            playerHasStood={playerHasStood}
            handleStand={handleStand}
            handleEndTurn={handleEndTurn}
          />
        </>
      ) : (
        <View style={styles.startContainer}>
          <TouchableOpacity style={styles.startButton} onPress={() => setShowWelcomeModal(true)}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const PazaakGameScreen = () => (
  <PazaakGameProvider>
    <PazaakGameScreenContent />
  </PazaakGameProvider>
);

export default PazaakGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b3b5a',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#122737',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logoText: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
  },
  quitButton: {
    padding: 5,
  },
  quitText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#f4b400',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  startButtonText: {
    fontSize: 18,
    color: '#1b3b5a',
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
  },
});
