// app/emotions/index.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header';
import EmotionsSelector from '../../components/emotions/EmotionsSelector';

export default function EmotionsMain() {
  return (
    <View style={styles.container}>
      <Header title="나만의 감정 상태" showBackButton={true} titleColor="#000" />
      <EmotionsSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
});
