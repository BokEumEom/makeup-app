// components/bricks/Brick.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Brick as BrickType } from '@/types/bricks';

type BrickProps = {
  brick: BrickType;
};

export default function Brick({ brick }: BrickProps) {
  return (
    <View
      style={[
        styles.brick,
        {
          width: brick.width,
          height: brick.height,
          left: brick.x,
          top: brick.y,
        },
      ]}
    >
      <LinearGradient
        colors={['#FF5733', '#FFC300']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  brick: {
    position: 'absolute',
    borderRadius: 4,
    overflow: 'hidden',
    // 추가적인 스타일 설정 가능
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
});
