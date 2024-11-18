import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GameProvider, useGame } from '../../contexts/TileContext';
import GameBoard from '../../components/puzzle/GameBoard';
import ScoreBoard from '../../components/puzzle/ScoreBoard';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import KeyboardControls from '../../components/puzzle/KeyboardControls';
import ConfirmationModal from '../../components/common/Modal';

const PuzzleScreen = () => {
  return (
    <GameProvider>
      <PuzzleGame />
    </GameProvider>
  );
};

const PuzzleGame = () => {
  const { moveTiles, gameOver, restartGame } = useGame();
  const [showModal, setShowModal] = useState(false);

  // Shared values for animating the game container
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Fix to prevent flickering
      onMoveShouldSetPanResponder: () => false,
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) {
            moveTiles('right');
            translateX.value = withSpring(10, {}, () => (translateX.value = 0));
          } else {
            moveTiles('left');
            translateX.value = withSpring(-10, {}, () => (translateX.value = 0));
          }
        } else {
          if (dy > 0) {
            moveTiles('down');
            translateY.value = withSpring(10, {}, () => (translateY.value = 0));
          } else {
            moveTiles('up');
            translateY.value = withSpring(-10, {}, () => (translateY.value = 0));
          }
        }
      },
    })
  ).current;

  // Animated style for smooth screen transitions
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });

  // Handler for "New Game" button
  const handleNewGamePress = () => {
    setShowModal(true);
  };

  const confirmNewGame = () => {
    setShowModal(false);
    restartGame();
  };

  const cancelNewGame = () => {
    setShowModal(false);
  };

  // Move tiles function for keyboard controls
  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    moveTiles(direction);
  };

  return (
    <View style={styles.container}>
      <Header title="2048" showBackButton titleColor="#000" />
      <Animated.View style={[styles.gameContainer, animatedStyle]} {...panResponder.panHandlers}>
        <ScoreBoard />
        <GameBoard />

        {/* New Game button always displayed */}
        <View style={styles.newGameContainer}>
          {gameOver && <Text style={styles.gameOverText}>Game Over</Text>}
          <Button
            title="New Game"
            onPress={handleNewGamePress}
            gradientColors={['#bbada0', '#bbada0']}
            style={styles.newGameButton}
            textStyle={styles.newGameButtonText}
          />
        </View>
      </Animated.View>

      {/* Control Keyboard */}
      <KeyboardControls onMove={handleMove} />

      {/* Confirmation Modal */}
      <ConfirmationModal
        visible={showModal}
        onConfirm={confirmNewGame}
        onCancel={cancelNewGame}
        message="Are you sure you want to start a new game? All progress will be lost."
        confirmText="Start New Game"
        cancelText="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f0',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newGameContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  newGameButton: {
    paddingHorizontal: 40,
  },
  newGameButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PuzzleScreen;
