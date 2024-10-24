import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { scenarios } from '../../constants/scenarios';
import { useEmotionContext } from '../../context/EmotionContext';
import { EmotionBar } from '../../components/scenario/EmotionBar';
import { Character } from '../../components/scenario/Character';
import { Header } from '../../components/common/Header';

const StoryScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scenarioId = Number(id);
  const scenario = scenarios.find((s) => s.id === scenarioId);
  const { updateEmotion, resetEmotion } = useEmotionContext();
  const [currentChapter, setCurrentChapter] = useState(scenario?.chapters[0]);

  useEffect(() => {
    resetEmotion();
  }, [scenarioId]);

  const handleChoiceSelect = (choice) => {
    updateEmotion(choice.emotionalImpact);
  
    // nextChapterId가 없거나 null인 경우 엔딩으로 이동
    if (!choice.nextChapterId) {
      router.push({
        pathname: '/scenario/ending',
        params: { message: choice.message },
      });
    } else {
      const nextChapter = scenario?.chapters.find((c) => c.id === choice.nextChapterId);
      setCurrentChapter(nextChapter);
  
      // nextChapter가 엔딩인 경우 처리
      if (nextChapter?.isEnding) {
        router.push({
          pathname: '/scenario/ending',
          params: { message: choice.message },
        });
      }
    }
  };    

  if (!currentChapter) return null;

  return (
    <View style={styles.container}>
      <Header title="스토리 진행" showBackButton={true} />
      
      <Character />
      <EmotionBar />
      
      <ScrollView style={styles.storyContainer}>
        <Text style={styles.storyText}>{currentChapter.text}</Text>
        {currentChapter.choices.map((choice) => (
          <TouchableOpacity
            key={choice.id}
            style={styles.choiceButton}
            onPress={() => handleChoiceSelect(choice)}
          >
            <Text style={styles.choiceText}>{choice.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,  
    backgroundColor: '#F1FAEE',
  },
  storyContainer: { 
    padding: 10, 
  },
  storyText: {
    fontSize: 20,
    color: '#1D3557',
    marginBottom: 30,
    textAlign: 'justify',
  },
  choiceButton: {
    backgroundColor: '#A8DADC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  choiceText: { 
    color: '#1D3557', 
    fontSize: 18, 
    textAlign: 'center',
    fontWeight: '600',
  },
});
