// app/game/brick/BrickBreakerGame.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Paddle from '@/components/bricks/Paddle';
import Ball from '@/components/bricks/Ball';
import Brick from '@/components/bricks/Brick';
import { useGame } from '@/contexts/BrickContext';
import ConfirmationModal from '@/components/common/Modal';
import { Brick as BrickType } from '@/types/bricks';
import { initializeBricks } from '@/utils/bricksUtils';
import { GAME_CONFIG } from '@/constants/bricksConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function BrickBreakerGame() {
  const { score, lives, increaseScore, decreaseLives, resetGame } = useGame();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [paddleX, setPaddleX] = useState(SCREEN_WIDTH / 2 - GAME_CONFIG.PADDLE_WIDTH / 2);

  // Initialize bricks
  const [bricks, setBricks] = useState<BrickType[]>(initializeBricks);

  useEffect(() => {
    if (lives <= 0 && isGameStarted) {
      setIsGameStarted(false);
      setIsGameOver(true); // Show game over modal
    }
  }, [lives, isGameStarted]);

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false); // Close modal when restarting game
  };

  const handleGameOverConfirm = () => {
    resetGame(); // Reset score and lives
    setIsGameOver(false); // Close modal
    setIsGameStarted(true); // Restart game

    // Reset bricks
    setBricks(initializeBricks());
  };

  const handleBrickHit = (brickId: string) => {
    setBricks((prevBricks) =>
      prevBricks.map((brick) =>
        brick.id === brickId ? { ...brick, isVisible: false } : brick
      )
    );
    increaseScore();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Score: {score} | Lives: {lives}</Text>

      {/* Render bricks */}
      <View style={styles.bricksContainer}>
        {bricks.map((brick) =>
          brick.isVisible ? (
            <Brick
              key={brick.id}
              brick={brick}
            />
          ) : null
        )}
      </View>

      {isGameStarted && (
        <Ball
          onMiss={decreaseLives}
          isGameStarted={isGameStarted}
          paddleX={paddleX}
          paddleWidth={GAME_CONFIG.PADDLE_WIDTH}
          bricks={bricks}
          onBrickHit={handleBrickHit}
        />
      )}

      <Paddle onPaddleMove={setPaddleX} />

      {/* Game start prompt */}
      {!isGameStarted && !isGameOver && (
        <View style={styles.overlay}>
          <Text style={styles.startText} onPress={startGame}>
            Tap to Start
          </Text>
        </View>
      )}

      {/* Game Over modal */}
      <ConfirmationModal
        visible={isGameOver}
        message="Game Over! Would you like to restart?"
        onConfirm={handleGameOverConfirm}
        onCancel={() => setIsGameOver(false)}
        confirmText="Restart"
        cancelText="Close"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  statusText: {
    position: 'absolute',
    top: 20,
    left: 10,
    color: '#fff',
    fontSize: 18,
  },
  bricksContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
