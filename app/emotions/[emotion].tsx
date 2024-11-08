// app/emotions/[emotion].tsx
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import EmotionsFlow from '../../components/emotions/EmotionsFlow';

export default function EmotionScreen() {
  const { emotion } = useLocalSearchParams();

  // Ensure emotion is a string and check if it’s a valid key in emotionsData
  if (!emotion || typeof emotion !== 'string') return null;

  return <EmotionsFlow emotionKey={emotion} />;
}
