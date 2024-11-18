import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Chart from '@/components/resignation/Chart';
import { calculateScore, getRecommendation } from '@/utils/recommendations';

export default function ResultScreen() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const answers = searchParams.answers as string;

  // Parse user response data
  const parsedAnswers = JSON.parse(answers);
  const score = calculateScore(parsedAnswers);
  const recommendation = getRecommendation(score);

  const handleGoHome = () => router.replace('/');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>결과 분석</Text>
      <Chart score={score} />
      <View style={styles.card}>
        <Text style={styles.recommendation}>{recommendation}</Text>
      </View>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/resignation')}
      >
        <Text style={styles.buttonText}>다시 테스트하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/resignation/dashboard')}
      >
        <Text style={styles.buttonText}>대시보드</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={handleGoHome}>
        <Text style={styles.secondaryButtonText}>홈 화면으로 이동</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff', // 부드러운 파스텔톤 배경색
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 20,
    alignItems: 'center',
    width: '90%',
  },
  recommendation: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#f0f8ff',
    borderWidth: 1,
    borderColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});
