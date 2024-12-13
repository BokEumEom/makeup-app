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
        style={styles.secondaryButton}
        onPress={() => router.push('/resignation/dashboard')}
      >
        <Text style={styles.secondaryButtonText}>대시보드 보기</Text>
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
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginVertical: 20,
    alignItems: 'center',
    width: '90%',
  },
  recommendation: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    textAlign: 'center',
    lineHeight: 26,
  },
  primaryButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#3498DB',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#3498DB',
    fontSize: 16,
    fontWeight: '600',
  },
});
