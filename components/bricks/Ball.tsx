// components/bricks/Ball.tsx

import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { PADDLE_HEIGHT } from '@/components/bricks/Paddle';
import { Brick as BrickType } from '@/types/bricks';
import { GAME_CONFIG } from '@/constants/bricksConfig';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type BallProps = {
  paddleX: number;
  paddleWidth: number;
  bricks: BrickType[];
  onBrickHit: (brickId: string) => void;
  onMiss: () => void;
  isGameStarted: boolean;
};

export default function Ball({
  paddleX,
  paddleWidth,
  bricks,
  onBrickHit,
  onMiss,
  isGameStarted,
}: BallProps) {
  const ballX = useSharedValue(SCREEN_WIDTH / 2 - GAME_CONFIG.BALL_SIZE / 2);
  const ballY = useSharedValue(SCREEN_HEIGHT * 0.75);
  const velocityX = useSharedValue(Math.random() > 0.5 ? GAME_CONFIG.MAX_VELOCITY : -GAME_CONFIG.MAX_VELOCITY);
  const velocityY = useSharedValue(-GAME_CONFIG.MAX_VELOCITY);

  useEffect(() => {
    let animationFrameId: number;

    const resetBall = () => {
      ballX.value = SCREEN_WIDTH / 2 - GAME_CONFIG.BALL_SIZE / 2;
      ballY.value = SCREEN_HEIGHT * 0.75;
      velocityX.value = Math.random() > 0.5 ? GAME_CONFIG.MAX_VELOCITY : -GAME_CONFIG.MAX_VELOCITY;
      velocityY.value = -GAME_CONFIG.MAX_VELOCITY;
    };

    const animate = () => {
      // 공 위치 업데이트
      ballX.value += velocityX.value;
      ballY.value += velocityY.value;

      // 벽과의 충돌 감지
      if (ballX.value <= 0 || ballX.value + GAME_CONFIG.BALL_SIZE >= SCREEN_WIDTH) {
        velocityX.value *= -1;
      }
      if (ballY.value <= 0) {
        velocityY.value *= -1;
      }

      // 패들과의 충돌 감지
      const paddleY = SCREEN_HEIGHT - PADDLE_HEIGHT - GAME_CONFIG.PADDLE_BOTTOM_MARGIN;
      if (
        ballY.value + GAME_CONFIG.BALL_SIZE >= paddleY &&
        ballY.value + GAME_CONFIG.BALL_SIZE <= paddleY + PADDLE_HEIGHT &&
        ballX.value + GAME_CONFIG.BALL_SIZE >= paddleX &&
        ballX.value <= paddleX + paddleWidth
      ) {
        velocityY.value = -Math.abs(velocityY.value);

        // 패들의 이동 방향에 따라 공의 속도를 조정할 수 있음 (선택 사항)
        // const paddleCenter = paddleX + paddleWidth / 2;
        // const hitPosition = (ballX.value + GAME_CONFIG.BALL_SIZE / 2 - paddleCenter) / (paddleWidth / 2);
        // velocityX.value += hitPosition * 2;
      }

      // 벽돌과의 충돌 감지
      bricks.forEach((brick) => {
        if (
          brick.isVisible &&
          ballX.value + GAME_CONFIG.BALL_SIZE >= brick.x &&
          ballX.value <= brick.x + brick.width &&
          ballY.value + GAME_CONFIG.BALL_SIZE >= brick.y &&
          ballY.value <= brick.y + brick.height
        ) {
          velocityY.value *= -1;
          runOnJS(onBrickHit)(brick.id);
        }
      });

      // 공이 바닥에 닿았는지 확인
      if (ballY.value > SCREEN_HEIGHT) {
        runOnJS(onMiss)();
        resetBall();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isGameStarted) {
      resetBall();
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isGameStarted, paddleX, paddleWidth, bricks]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: ballX.value }, { translateY: ballY.value }],
  }));

  return <Animated.View style={[styles.ball, animatedStyle]} />;
}

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    width: GAME_CONFIG.BALL_SIZE,
    height: GAME_CONFIG.BALL_SIZE,
    borderRadius: GAME_CONFIG.BALL_SIZE / 2,
    backgroundColor: '#FFFFFF',
    // 추가적인 스타일 설정 가능
  },
});
