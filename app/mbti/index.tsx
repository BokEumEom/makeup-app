// app/mbti/index.tsx
import questions from '@/constants/mbtiQuestions';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const bgImage = require('@/assets/bg/mint-bear-character-enthusiastic.webp');

const MBTISurvey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const router = useRouter();

  const handleAnswer = (category: string, option: 'A' | 'B') => {
    setAnswers((prev) => ({
      ...prev,
      [category]: (prev[category] || 0) + (option === 'A' ? 1 : -1),
    }));

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      router.push({
        pathname: '/mbti/result',
        params: { answers: JSON.stringify(answers) },
      });
    }
  };

  // 만약 questions가 비어있다면 처리
  if (questions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>질문이 없습니다.</Text>
      </View>
    );
  }

  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
      {/* 반투명 오버레이 */}
      <View style={styles.overlay} />

      <View style={styles.contentContainer}>
        <Animated.View
          style={styles.cardContainer}
          entering={SlideInRight.duration(300)}
          exiting={SlideOutLeft.duration(300)}
        >
          <View style={styles.card}>
            <Text style={styles.questionText}>{question.text}</Text>
            <TouchableOpacity
              accessibilityRole="button"
              style={[styles.optionButton, styles.optionButtonPrimary]}
              onPress={() => handleAnswer(question.category, 'A')}
            >
              <Text style={styles.optionText}>{question.options[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              style={[styles.optionButton, styles.optionButtonSecondary]}
              onPress={() => handleAnswer(question.category, 'B')}
            >
              <Text style={styles.optionText}>{question.options[1]}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default MBTISurvey;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // 화면 전체 덮기
    backgroundColor: 'rgba(255,255,255,0.7)', // 반투명 흰색 오버레이
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    opacity: 0.7,
  },
  card: {
    width: '100%',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  questionText: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)', // rgba로 반투명 처리
    borderRadius: 10,
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
    padding: 18,
    borderRadius: 15,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  optionButtonPrimary: {
    borderColor: '#333',
    backgroundColor: '#FFFFFF',
  },
  optionButtonSecondary: {
    borderColor: '#333',
    backgroundColor: '#FFFFFF',
  },
  optionText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    height: 10,
    width: '80%',
    backgroundColor: '#E0E8F0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#A1C4FD',
    borderRadius: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
