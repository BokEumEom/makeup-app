import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LogoHeader from '@/components/pazaak/LogoHeader';
import SideDeck from '@/components/pazaak/SideDeck';
import GameBoard from '@/components/pazaak/GameBoard';
import ActionBar from '@/components/pazaak/ActionBar';
import GenericModal from '@/components/pazaak/GenericModal';
import WelcomeModal from '@/components/pazaak/WelcomeModal';
import { PazaakGameProvider, usePazaakGame } from '@/contexts/PazaakContext';

const PazaakGameScreenContent = () => {
  const router = useRouter();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const {
    gameStarted,
    gameOver,
    playerTotalScore,
    opponentTotalScore,
    playerRoundWins,
    opponentRoundWins,
    roundResult,
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

  // 모달 상태 관리
  const [showTieModal, setShowTieModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  useEffect(() => {
    if (roundResult) {
      // 각 결과에 맞는 모달 표시
      if (roundResult === "win") setShowWinModal(true);
      if (roundResult === "lose") setShowLoseModal(true);
      if (roundResult === "tie") setShowTieModal(true);
      if (roundResult === "gameWin" || roundResult === "gameLose") setShowGameOverModal(true);
    }
  }, [roundResult]);

  const startGameWithModal = () => {
    setShowWelcomeModal(true);
  };

  const closeWelcomeModalAndStartGame = () => {
    setShowWelcomeModal(false);
    startGame();
  };

  const quitGame = () => {
    resetGame();
  };

  return (
    <SafeAreaView style={styles.container}>
      {!gameStarted ? (
        <>
          <LogoHeader />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.mainButton} onPress={startGameWithModal}>
              <Ionicons name="walk-sharp" size={24} color="#FFD700" style={styles.icon} />
              <Text style={styles.buttonText}>게임 시작</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back-circle" size={24} color="#FFD700" style={styles.icon} />
              <Text style={styles.buttonText}>뒤로 가기</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.topBar}>
            <Text style={styles.logoText}>PAZAAK</Text>
            <TouchableOpacity onPress={quitGame} style={styles.quitButton}>
              <Ionicons name="exit" size={20} color="#FFD700" style={styles.icon} />
              <Text style={styles.quitText}>QUIT</Text>
            </TouchableOpacity>
          </View>

          {/* Opponent Side Deck */}
          <View style={styles.opponentSection}>
            <SideDeck sideDeck={opponentSideDeck} type="opponent" />
          </View>

          {/* Game Board */}
          <GameBoard
            playerCards={playerCards}
            opponentCards={opponentCards}
            playerScore={playerTotalScore}
            opponentScore={opponentTotalScore}
            playerWins={playerRoundWins}
            opponentWins={opponentRoundWins}
          />

          {/* Player Side Deck and Action Bar */}
          <View style={styles.playerSection}>
            <SideDeck sideDeck={playerSideDeck} onPlayCard={playSideCard} />
            <View style={styles.actionBarWrapper}>
              <ActionBar
                currentTurn={currentTurn}
                playerHasStood={playerHasStood}
                handleStand={handleStand}
                handleEndTurn={handleEndTurn}
              />
            </View>
          </View>

          {/* Modals */}
          <GenericModal
            visible={showTieModal}
            onClose={() => setShowTieModal(false)}
            title="THE SET IS TIED!"
            icon="🤝"
          />

          <GenericModal
            visible={showWinModal}
            onClose={() => setShowWinModal(false)}
            title="YOU WIN THE SET!"
            icon="🎉"
          />

          <GenericModal
            visible={showLoseModal}
            onClose={() => setShowLoseModal(false)}
            title="YOU LOSE THE SET!"
            icon="😢"
          />

          <GenericModal
            visible={showGameOverModal}
            onClose={() => {
              setShowGameOverModal(false);
              resetGame();  // 게임 종료 후 초기화
            }}
            title={roundResult === "gameWin" ? "CONGRATULATIONS! YOU WON!" : "GAME OVER"}
            message="Thanks for playing Pazaak Online. Click close to return to the main menu."
            icon={roundResult === "gameWin" ? "🏆" : "💔"}
            buttonText="CLOSE"
          />
        </>
      )}

      {/* Welcome Modal */}
      <WelcomeModal
        visible={showWelcomeModal}
        onClose={closeWelcomeModalAndStartGame}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b3b5a',
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFD700',
    fontFamily: 'DepartureMono',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#122737',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
  },
  logoText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
    fontFamily: 'PressStart2P',
  },
  quitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  quitText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
    fontFamily: 'PressStart2P',
  },
  opponentSection: {
    marginBottom: 10,
    alignItems: 'center',
  },
  playerSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  actionBarWrapper: {
    marginTop: 15,
    alignItems: 'center',
  },
});
