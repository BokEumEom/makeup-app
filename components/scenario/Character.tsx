import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';  // expo-image 컴포넌트로 변경
import { EmotionContext } from '../../context/EmotionContext';

export const Character = () => {
  const { emotionState } = useContext(EmotionContext);

  const getCharacterImage = () => {
    const emotions = [
      { condition: emotionState.stress > 70, image: require('../../assets/character-images/character_stressed.png') },
      { condition: emotionState.happiness > 70, image: require('../../assets/character-images/character_happy.png') },
      { condition: emotionState.anxiety > 70, image: require('../../assets/character-images/character_anxious.png') },
      { condition: emotionState.confidence > 70, image: require('../../assets/character-images/character_confident.png') },
    ];

    const defaultImage = require('../../assets/character-images/character_neutral.png');
    return emotions.find(emotion => emotion.condition)?.image || defaultImage;
  };

  return <Image source={getCharacterImage()} style={styles.character} />;
};

const styles = StyleSheet.create({
  character: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 20, // Increased margin for better spacing
  },
});
