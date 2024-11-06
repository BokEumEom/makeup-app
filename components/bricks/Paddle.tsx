// components/bricks/Paddle.tsx

import React from 'react';
import { StyleSheet, PanResponder, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { GAME_CONFIG } from '@/constants/bricksConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type PaddleProps = {
  onPaddleMove: (x: number) => void;
};

export default function Paddle({ onPaddleMove }: PaddleProps) {
  const position = useSharedValue(SCREEN_WIDTH / 2 - GAME_CONFIG.PADDLE_WIDTH / 2);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      position.value = Math.max(
        0,
        Math.min(SCREEN_WIDTH - GAME_CONFIG.PADDLE_WIDTH, gestureState.moveX - GAME_CONFIG.PADDLE_WIDTH / 2)
      );
      onPaddleMove(position.value);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <Animated.View {...panResponder.panHandlers} style={[styles.paddle, animatedStyle]}>
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.paddleGradient}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  paddle: {
    position: 'absolute',
    bottom: GAME_CONFIG.PADDLE_BOTTOM_MARGIN,
    width: GAME_CONFIG.PADDLE_WIDTH,
    height: GAME_CONFIG.PADDLE_HEIGHT,
    borderRadius: GAME_CONFIG.PADDLE_HEIGHT / 2,
    overflow: 'hidden',
    // 추가적인 스타일 설정 가능
  },
  paddleGradient: {
    width: '100%',
    height: '100%',
  },
});
