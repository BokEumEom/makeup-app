import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ResultCard } from '../../components/onboarding/ResultCard';
import { MissionCard } from '../../components/onboarding/MissionCard';
import { GradientBackground } from '../../components/common/GradientBackground';
import { Button } from '../../components/common/Button';

import { onboardingQuestions } from '../../constants/onboardingQuestions';
import { evaluationCriteria } from '../../constants/evaluationCriteria';
import { missionSuggestions } from '../../constants/missionSuggestions';

import { AnswerScores, EvaluationResult } from '../../types/onboarding';
import { evaluateScores, getAverage, suggestMission } from '../../utils/scoring';
import { getCategoryLabel } from '../../utils/categoryLabels';

const OnboardingResultScreen = () => {
  const router = useRouter();
  const { answers } = useLocalSearchParams();
  const [parsedAnswers, setParsedAnswers] = useState<AnswerScores>({});
  const [evaluationResults, setEvaluationResults] = useState<{ [category: string]: EvaluationResult }>({});
  const [mission, setMission] = useState<string>('');

  useEffect(() => {
    if (answers) {
      try {
        const parsed = JSON.parse(answers as string);
        processAnswers(parsed);
      } catch (error) {
        console.error('Failed to parse answers', error);
      }
    }
  }, [answers]);

  const processAnswers = (answersData: { [key: number]: number }) => {
    const categoryScores: AnswerScores = {};

    onboardingQuestions.forEach((question) => {
      const score = answersData[question.id] ?? 0;
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = [];
      }
      categoryScores[question.category].push(score);
    });

    setParsedAnswers(categoryScores);
    const results = evaluateScores(categoryScores, evaluationCriteria);
    setEvaluationResults(results);
    const suggestedMission = suggestMission(categoryScores, missionSuggestions);
    setMission(suggestedMission);
  };

  const handleFinish = () => {
    console.log('Finishing onboarding, navigating to home');
    router.replace('/'); // router.replace를 사용하여 홈으로 이동
  };

  return (
    <GradientBackground colors={['#A7C7E7', '#FFF']}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
        
          <Ionicons name="checkmark-circle" size={60} color="#6A92B8" style={styles.icon} />
          <Text style={styles.title}>테스트 완료!</Text>
          <Text style={styles.subtitle}>
            당신의 관계 상태를 분석했습니다. 맞춤형 개선 방안을 확인해보세요.
          </Text>

          <ResultCard
            title="카테고리별 평가 결과"
            results={Object.entries(parsedAnswers).map(([category, scores]) => ({
              category: getCategoryLabel(category, true),
              score: getAverage(scores),
              evaluation: evaluationResults[category],
            }))}
          />

          <MissionCard title="추천 미션" mission={mission} />

          <Button
            title="시작하기"
            onPress={handleFinish}
            gradientColors={['#4A90E2', '#4A90E2']}
            style={styles.startButton}
          />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // Distribute content evenly
    alignItems: 'center', // Center content horizontally
    paddingHorizontal: 10, // Adjust padding as needed
  },
  icon: {
    marginBottom: 5,
  },
  title: {
    fontSize: 24, // Adjust title size for better fit
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8, // Reduce margin to save space
    color: '#555',
  },
  startButton: {
    alignSelf: 'center',
    width: '100%', // 버튼 너비를 적절하게 설정
  },
});

export default OnboardingResultScreen;
