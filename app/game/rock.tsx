import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { useRockPaperScissors } from '@/hooks/useRockPaperScissors';
import ScoreBoard from '@/components/game/ScoreBoard';
import ResultModal from '@/components/game/ResultModal';
import { Header } from '@/components/common/Header';
import ConfirmationModal from '@/components/common/Modal';

// 이미지 타입 정의
const images: Record<string, any> = {
  Rock: require('@/assets/game-images/rock.jpg'),
  Scissors: require('@/assets/game-images/scissors.jpg'),
  Paper: require('@/assets/game-images/paper.jpg'),
};

const { width } = Dimensions.get('window');
const DISPLAY_SIZE = Math.min(width * 0.6, 300);

export default function RockPaperScissorsGame() {
  const {
    userChoice,
    computerChoice,
    result,
    score,
    currentImage,
    scaleValues,
    opacity,
    showResultModal,
    playGame,
    resetGame,
    closeModal,
    handlePressIn,
    handlePressOut,
  } = useRockPaperScissors();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Header title="Rock-ScissorsPaper-Paper" showBackButton />

      <View style={styles.content}>
        <View style={styles.wheel}>
          {currentImage && (
            <Animated.Image source={currentImage} style={[styles.ledImage, { opacity }]} />
          )}
        </View>

        <View style={styles.choicesContainer}>
          {['Rock', 'Scissors', 'Paper'].map((choice, index) => (
            <Pressable
              key={choice}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index, choice as 'Rock' | 'Scissors' | 'Paper')}
              style={styles.choiceButton}
            >
              <Animated.Image
                source={images[choice]}
                style={[styles.choiceImage, { transform: [{ scale: scaleValues[index] }] }]}
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </View>

        {showResultModal && result && (
          <ResultModal result={result} onClose={closeModal} />
        )}

        <ScoreBoard wins={score.wins} losses={score.losses} draws={score.draws} />

        <Pressable onPress={() => setShowModal(true)} style={styles.resetButton}>
          <View style={styles.resetButtonGradient}>
            <Text style={styles.resetButtonText}>New Game</Text>
          </View>
        </Pressable>
      </View>

      <ConfirmationModal
        visible={showModal}
        onConfirm={() => {
          resetGame();
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
        message="Are you sure you want to reset the game?"
        confirmText="Start New Game"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c669f',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
  },
  wheel: {
    width: DISPLAY_SIZE,
    height: DISPLAY_SIZE,
    borderRadius: DISPLAY_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  ledImage: {
    width: DISPLAY_SIZE - 20,
    height: DISPLAY_SIZE - 20,
    borderRadius: (DISPLAY_SIZE - 20) / 2,
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  choiceButton: {
    borderRadius: 50,
    overflow: 'hidden',
    marginHorizontal: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  choiceImage: {
    width: '100%',
    height: '100%',
  },
  resetButton: {
    borderRadius: 30,
    overflow: 'hidden',
    width: '60%',
  },
  resetButtonGradient: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF416C',
  },
  resetButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
