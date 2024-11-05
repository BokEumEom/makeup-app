// components/Controls.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '@/contexts/TetrisContext';
import AnimatedButton from '@/components/tetris/Button';

const Controls = () => {
  const { moveBlock, rotateBlock, resetGame, toggleSound, pauseGame } = useGame();

  return (
    <View style={styles.container}>
      {/* Action Buttons (Pause, Sound, Reset) */}
      <View style={styles.actionButtons}>
        <AnimatedButton label="Pause(P)" onPress={pauseGame} style={[styles.button, styles.greenButton]} />
        <AnimatedButton label="Sound(S)" onPress={toggleSound} style={[styles.button, styles.greenButton]} />
        <AnimatedButton label="Reset(R)" onPress={resetGame} style={[styles.button, styles.redButton]} />
      </View>

      {/* Game Controls */}
      <View style={styles.gameControls}>
        {/* Drop Button */}
        <AnimatedButton label="Drop" onPress={() => moveBlock('down')} style={styles.dropButton} />

        {/* Directional Pad */}
        <View style={styles.dPad}>
          <View style={styles.dPadRow}>
            <View style={styles.spacer} />
            <AnimatedButton label="↑" onPress={rotateBlock} style={styles.directionButton} />
            <View style={styles.spacer} />
          </View>
          <View style={styles.dPadRow}>
            <AnimatedButton label="←" onPress={() => moveBlock('left')} style={styles.directionButton} />
            <AnimatedButton label="↓" onPress={() => moveBlock('down')} style={styles.directionButton} />
            <AnimatedButton label="→" onPress={() => moveBlock('right')} style={styles.directionButton} />
          </View>
        </View>

        {/* Labels */}
        <View style={styles.labelContainer}>
          <Text style={[styles.label, styles.rotationLabel]}>Rotation</Text>
          <Text style={[styles.label, styles.leftLabel]}>Left</Text>
          <Text style={[styles.label, styles.rightLabel]}>Right</Text>
          <Text style={[styles.label, styles.downLabel]}>Down</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFD700',
    borderRadius: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    marginRight: 20,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  greenButton: {
    backgroundColor: '#4CAF50',
  },
  redButton: {
    backgroundColor: '#f44336',
  },
  gameControls: {
    position: 'relative',
  },
  dropButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: -130,
    bottom: -100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  dPad: {
    width: 120,
    marginLeft: 80,
  },
  dPadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  spacer: {
    width: 48,
    height: 48,
  },
  directionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  labelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    position: 'absolute',
  },
  rotationLabel: {
    top: -30,
    left: 38,
  },
  leftLabel: {
    top: 24,
    left: -50,
  },
  rightLabel: {
    top: 24,
    right: -50,
  },
  downLabel: {
    bottom: -24,
    left: 40,
  },
});

export default Controls;
