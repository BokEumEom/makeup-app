// components/common/ProgressBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number; // 진행률을 퍼센트(0-100)로 받음
  height?: number; // 프로그레스 바의 높이
  backgroundColor?: string; // 전체 배경 색상
  fillColor?: string; // 채워지는 색상
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 10,
  backgroundColor = '#D3D3D3',
  fillColor = '#4A90E2',
}) => {
  return (
    <View style={[styles.progressBarContainer, { height, backgroundColor }]}>
      <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: fillColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
});
