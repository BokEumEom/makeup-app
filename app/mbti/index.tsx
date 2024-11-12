import questions from '@/constants/mbtiQuestions';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import bgImage from '../../assets/bg/bg_mbti_question.png';
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

  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <LinearGradient colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.9)']} style={styles.gradient}>
      <ImageBackground
      source={bgImage}
      style={styles.background}
      resizeMode="cover"
      />
      <Animated.View
          style={styles.container}
          entering={SlideInRight.duration(300)}
          exiting={SlideOutLeft.duration(300)}
        >
          {/* 질문 카드 */}
          <View style={styles.card}>
            <Text style={styles.questionText}>{question.text}</Text>
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonPrimary]}
              onPress={() => handleAnswer(question.category, 'A')}
            >
              <Text style={styles.optionText}>{question.options[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonSecondary]}
              onPress={() => handleAnswer(question.category, 'B')}
            >
              <Text style={styles.optionText}>{question.options[1]}</Text>
            </TouchableOpacity>
          </View>
          {/* 진행 바 */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        </Animated.View>
    </LinearGradient>
  );
};

export default MBTISurvey;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
background: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  opacity: 0.6,
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  progressContainer: {
    height: 10,
    width: '80%',
    backgroundColor: '#E0E8F0',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#A1C4FD',
    borderRadius: 10,
  },
  card: {
    width: '100%',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    //backgroundColor: '#FFFFFF',

  },
  questionText: {
    padding:20,
    backgroundColor: '#000',
    borderRadius: 10,
    opacity: 0.7,
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
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#FFFFFF',
  },
  optionButtonSecondary: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#FFFFFF',
  },
  optionText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
});
