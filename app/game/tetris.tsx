// app/game/tetris.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTetrisLogic } from '@/hooks/useTetrisLogic';
import Board from '@/components/tetris/Board';
import Scoreboard from '@/components/tetris/Scoreboard';
import GameControls from '@/components/tetris/GameControls';
import MainMenu from '@/components/tetris/MainMenu';
import NextBlock from '@/components/tetris/NextBlock';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const TetrisGame = () => {
  const [isGameStarted, setIsGameStarted] = useState(false); // State to track if the game is started
  const { 
    board, 
    currentPiece,
    nextPiece, 
    score, 
    level, 
    isGameOver, 
    updateGame, 
    handleKeyPress 
  } = useTetrisLogic();

  // Shared value for animations
  const animationProgress = useSharedValue(0); // 0: MainMenu, 1: Game

  // Animated styles
  const menuStyle = useAnimatedStyle(() => ({
    opacity: withTiming(1 - animationProgress.value, { duration: 500 }),
    transform: [
      {
        translateY: withTiming(animationProgress.value * -height, { duration: 500 }),
      },
    ],
  }));

  const gameStyle = useAnimatedStyle(() => ({
    opacity: withTiming(animationProgress.value, { duration: 500 }),
    transform: [
      {
        translateY: withTiming((1 - animationProgress.value) * height, { duration: 500 }),
      },
    ],
  }));

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;

    const interval = setInterval(() => {
      updateGame();
    }, 1000 / level);

    return () => clearInterval(interval);
  }, [isGameStarted, isGameOver, level, updateGame]);

  // Handle game start with animation
  const startGame = () => {
    animationProgress.value = 1; // Trigger transition to game screen
    setTimeout(() => setIsGameStarted(true), 500); // Wait for animation to complete
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.screen, menuStyle]}>
        <MainMenu onStartGame={startGame} />
      </Animated.View>
      <Animated.View style={[styles.screen, gameStyle]}>
        <View style={styles.header}>
          <Scoreboard score={score} level={level} />
          <NextBlock nextPiece={nextPiece} />
        </View>
        <View style={styles.gameArea}>
          <Board board={board} currentPiece={currentPiece} />
        </View>
        <View style={styles.controlsContainer}>
          <GameControls
            onMoveLeft={() => handleKeyPress('ArrowLeft')}
            onMoveRight={() => handleKeyPress('ArrowRight')}
            onRotate={() => handleKeyPress('ArrowUp')}
            onMoveDown={() => handleKeyPress('ArrowDown')}
            onDropDown={() => handleKeyPress(' ')}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000',
    overflow: 'hidden', // Prevent animation overflow
  },
  screen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  controlsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});

export default TetrisGame;
