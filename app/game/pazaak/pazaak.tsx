// app/game/pazaak/pazaak.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LogoHeader from '@/components/pazaak/LogoHeader'; // 로고 컴포넌트 가져오기
import SideDeck from '@/components/pazaak/SideDeck';
import GameBoard from '@/components/pazaak/GameBoard';
import ActionBar from '@/components/pazaak/ActionBar';
import GenericModal from '@/components/pazaak/GenericModal';
import WelcomeModal from '@/components/pazaak/WelcomeModal'; // WelcomeModal 가져오기
import { PazaakGameProvider, usePazaakGame } from '@/contexts/PazaakContext';

const PazaakGameScreenContent = () => {
  const router = useRouter();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false); // Welcome Modal 상태

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

  const [showTieModal, setShowTieModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const startGameWithModal = () => {
    setShowWelcomeModal(true); // Start Game 클릭 시 Welcome Modal을 표시
  };

  const closeWelcomeModalAndStartGame = () => {
    setShowWelcomeModal(false); // 모달 닫기
    startGame(); // 게임 시작
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

          <SideDeck sideDeck={opponentSideDeck} type="opponent" />

          <GameBoard
            playerCards={playerCards}
            opponentCards={opponentCards}
            playerScore={playerTotalScore}
            opponentScore={opponentTotalScore}
            playerWins={playerRoundWins}
            opponentWins={opponentRoundWins}
          />

          <SideDeck sideDeck={playerSideDeck} onPlayCard={playSideCard} />
          <ActionBar
            currentTurn={currentTurn}
            playerHasStood={playerHasStood}
            handleStand={handleStand}
            handleEndTurn={handleEndTurn}
          />

          {/* Tie Modal */}
          <GenericModal
            visible={showTieModal}
            onClose={() => setShowTieModal(false)}
            title="THE SET IS TIED!"
            icon="🤝"
          />

          {/* Win Modal */}
          <GenericModal
            visible={showWinModal}
            onClose={() => setShowWinModal(false)}
            title="YOU WIN THE SET!"
            icon="🎉"
          />

          {/* Lose Modal */}
          <GenericModal
            visible={showLoseModal}
            onClose={() => setShowLoseModal(false)}
            title="YOU LOSE THE SET!"
            icon="😢"
          />

          {/* Game Over Modal */}
          <GenericModal
            visible={showGameOverModal}
            onClose={() => setShowGameOverModal(false)}
            title="YOU LOSE"
            message="Thanks for playing Pazaak Online. Click close to return to the main menu."
            icon="💔"
            buttonText="CLOSE"
          />
        </>
      )}
      {/* Welcome Modal */}
      <WelcomeModal
        visible={showWelcomeModal}
        onClose={closeWelcomeModalAndStartGame} // "LET'S GO!" 클릭 시 게임 시작
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
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
  },
  quitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  quitText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
  },
});
