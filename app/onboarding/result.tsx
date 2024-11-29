// app/onboarding/result.tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/common/Button';
import { GradientBackground } from '@/components/common/GradientBackground';
import { MissionCard } from '@/components/onboarding/MissionCard';
import { ResultCard } from '@/components/onboarding/ResultCard';

import { onboardingQuestions } from '@/constants/onboardingQuestions';

import { AnswerScores, EvaluationResult } from '@/types/onboarding';
import { getCategoryLabel } from '@/utils/categoryLabels';
import { evaluateScores, getAverage, suggestMission } from '@/utils/scoring';

// ResultItem 타입 정의
interface ResultItem {
  category: string;
  score: number;
  evaluation: EvaluationResult;
}

const OnboardingResultScreen = () => {
  const router = useRouter();
  const { answers } = useLocalSearchParams();

  const [parsedAnswers, setParsedAnswers] = useState<AnswerScores>({});
  const [evaluationResults, setEvaluationResults] = useState<{ [category: string]: EvaluationResult }>({});
  const [mission, setMission] = useState<string>('');
  const [isDataReady, setIsDataReady] = useState(false);
  const [results, setResults] = useState<ResultItem[] | null>(null);

  // processAnswers 함수를 useCallback으로 감싸고 의존성 배열에 추가
  const processAnswers = useCallback((answersData: { [key: number]: number }) => {
    const categoryScores: AnswerScores = {};

    onboardingQuestions.forEach((question) => {
      const score = answersData[question.id];
      const validScore = typeof score === 'number' && isFinite(score) ? score : question.min; // 유효성 검사 및 기본값 설정
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = [];
      }
      categoryScores[question.category].push(validScore);
    });

    setParsedAnswers(categoryScores);
    const results = evaluateScores(categoryScores);
    setEvaluationResults(results);
    const suggestedMission = suggestMission(categoryScores);
    setMission(suggestedMission);

    // 결과 계산 및 설정
    const computedResults = Object.entries(categoryScores).map(([category, scores]) => ({
      category: getCategoryLabel(category, true),
      score: getAverage(scores),
      evaluation: results[category],
    }));
    setResults(computedResults);
  }, []);

  // 데이터 로딩 및 처리
  useEffect(() => {
    if (answers) {
      try {
        const parsed = JSON.parse(answers as string);
        processAnswers(parsed);
        setIsDataReady(true); // 데이터 로딩 완료 설정
      } catch (error) {
        console.error('Failed to parse answers', error);
        alert('결과 데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  }, [answers, processAnswers]);

  const handleFinish = useCallback(() => {
    router.replace('/');
  }, [router]);

  // 데이터가 준비되지 않았을 때 로딩 스피너 표시
  if (!isDataReady || !results) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GradientBackground colors={['#A7C7E7', '#E3F2FD']}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Ionicons name="checkmark-circle" size={40} color="#4A90E2" style={styles.icon} />
          <Text style={styles.title}>테스트 완료!</Text>
          <Text style={styles.subtitle}>
            당신의 관계 상태를 분석했습니다. 맞춤형 개선 방안을 확인해보세요.
          </Text>

          {/* Mission Suggestion */}
          <MissionCard title="추천 미션" mission={mission} style={styles.card} />

          {/* Evaluation Results */}
          <ResultCard
            title="카테고리별 평가 결과"
            results={results}
            style={styles.card}
          />
        </ScrollView>

        {/* Start Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="시작하기"
            onPress={handleFinish}
            gradientColors={['#4A90E2', '#4A90E2']}
            style={styles.startButton}
            textStyle={styles.buttonText}
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, // 화면 전체를 채우도록 설정
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  card: {
    width: '100%',
    marginVertical: 12,
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContainer: {
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  startButton: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default OnboardingResultScreen;
