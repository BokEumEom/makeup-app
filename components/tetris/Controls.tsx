// components/Controls.tsx

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useGame } from '@/contexts/TetrisContext';
import AnimatedButton from '@/components/tetris/Button';

const Controls = () => {
  const {
    moveBlock,
    rotateBlock,
    resetGame,
    toggleSound,
    pauseGame,
    dropBlock,
    isGameOver,
    isPaused,
    isSoundOn,
  } = useGame();

  // 안전하게 버튼 이벤트를 처리하는 헬퍼 함수
  const handleButtonPress = (callback: () => void) => {
    return () => {
      if (isGameOver || isPaused) return;
      callback();
    };
  };

  return (
    <View style={styles.container}>
      {/* 액션 버튼 (Pause, Sound, Reset) */}
      <View style={styles.actionButtons}>
        <AnimatedButton
          label="Pause(P)"
          onPress={pauseGame}
          style={[styles.button, styles.greenButton] as ViewStyle}
        />
        <AnimatedButton
          label={`Sound(${isSoundOn ? 'On' : 'Off'})`}
          onPress={toggleSound}
          style={[styles.button, styles.greenButton] as ViewStyle}
        />
        <AnimatedButton
          label="Reset(R)"
          onPress={resetGame}
          style={[styles.button, styles.redButton] as ViewStyle}
        />
      </View>

      {/* 게임 조작 버튼 */}
      <View style={styles.gameControls}>
        {/* 블록 드롭 버튼 */}
        <AnimatedButton
          label="Drop"
          onPress={dropBlock}
          style={styles.dropButton as ViewStyle}
        />

        {/* 방향 패드 */}
        <View style={styles.dPad}>
          <View style={styles.dPadRow}>
            <View style={styles.spacer} />
            <AnimatedButton
              label="↑"
              onPress={handleButtonPress(rotateBlock)}
              style={styles.directionButton as ViewStyle}
            />
            <View style={styles.spacer} />
          </View>
          <View style={styles.dPadRow}>
            <AnimatedButton
              label="←"
              onPress={handleButtonPress(() => moveBlock('left'))}
              style={styles.directionButton as ViewStyle}
            />
            <AnimatedButton
              label="↓"
              onPress={handleButtonPress(() => moveBlock('down'))}
              style={styles.directionButton as ViewStyle}
            />
            <AnimatedButton
              label="→"
              onPress={handleButtonPress(() => moveBlock('right'))}
              style={styles.directionButton as ViewStyle}
            />
          </View>
        </View>

        {/* 방향 버튼 라벨 */}
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
    left: -150,
    bottom: -100,
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
    top: -15,
    left: 120,
  },
  leftLabel: {
    top: 24,
    left: 70,
  },
  rightLabel: {
    top: 24,
    right: -10,
  },
  downLabel: {
    bottom: -24,
    left: 130,
  },
});

export default Controls;
