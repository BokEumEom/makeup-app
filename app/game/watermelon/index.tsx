// app/game/watermelon/index.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import FruitManager from '@/components/watermelon/FruitManager';
import { GameState } from '@/types/GameState';

const WaterMelonGame = () => {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GameState.Ready);

  useEffect(() => {
    if (gameState === GameState.GameOver) {
      // 게임 오버 시 추가 로직을 여기에 추가할 수 있습니다.
    }
  }, [gameState]);

  const handleScoreUpdate = (points: number) => {
    setScore((prevScore) => prevScore + points);
  };

  const handleGameOver = () => {
    setGameState(GameState.GameOver);
  };

  const handleStartGame = () => {
    setScore(0);
    setGameState(GameState.Running);
  };

  const handleRestartGame = () => {
    setScore(0);
    setGameState(GameState.Running);
  };

  return (
    <View style={styles.container}>
      {gameState === GameState.Ready && (
        <TouchableOpacity
          style={styles.overlayButton}
          onPress={handleStartGame}
          accessibilityLabel="Start Game"
          accessibilityHint="Starts the watermelon game"
        >
          <Text style={[styles.centerText, styles.startText]}>Tap to Start</Text>
        </TouchableOpacity>
      )}
      {gameState === GameState.Running && (
        <>
          <Text style={styles.score}>Score: {score}</Text>
          <FruitManager
            onScoreUpdate={handleScoreUpdate}
            onGameOver={handleGameOver}
            gameState={gameState}
          />
        </>
      )}
      {gameState === GameState.GameOver && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={gameState === GameState.GameOver}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Game Over!</Text>
              <Text style={styles.modalScore}>Your Score: {score}</Text>
              <Pressable style={styles.modalButton} onPress={handleRestartGame}>
                <Text style={styles.modalButtonText}>Restart Game</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const commonTextStyles = {
  fontWeight: 'bold' as const,
  textAlign: 'center' as const,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD59D',
  },
  overlayButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    fontSize: 32, // 폰트 크기를 키워 가독성 향상
    fontWeight: '900',
    color: '#FFEEDB',
    textShadowColor: '#FF5300',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    borderStyle: 'dotted',
  },
  centerText: {
    ...commonTextStyles,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  startText: {
    fontSize: 32,
    color: '#FF5300',
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
    borderWidth: 2,
    borderColor: '#FF8800',
  },
  gameOverText: {
    fontSize: 28,
    color: '#FF2700',
    backgroundColor: '#FFEEDB',
    opacity: 0.95,
    borderWidth: 2,
    borderColor: '#FF5300',
    textShadowColor: '#FF8800',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFEEDB',
    padding: 32,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#FF5300',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalTitle: {
    fontSize: 48,
    color: '#FF2700',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalScore: {
    fontSize: 24,
    color: '#333',
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#FF8800',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WaterMelonGame;
