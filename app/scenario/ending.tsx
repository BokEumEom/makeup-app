import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEmotionContext } from '../../context/EmotionContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button'; // Button 컴포넌트 사용
import { EmotionBar } from '../../components/scenario/EmotionBar';

export const EndingScreen = () => {
  const { emotionState } = useEmotionContext();
  const { message } = useLocalSearchParams(); // 쿼리에서 전달된 message 받기
  const router = useRouter();

  const handleScenarioSelect = () => {
    router.push('/scenario');
  };

  const handleGoHome = () => {
    router.replace('/'); // 홈 화면으로 이동하는 로직
  };

  return (
    <View style={styles.container}>
      <Header title="결과 요약" showBackButton={false} /> 

      {/* 쿼리에서 받은 메시지 표시 */}
      <View style={styles.messageContainer}>
        <Text style={styles.resultMessage}>{message}</Text>
      </View>

      {/* 감정 변화 그래프 (EmotionBar) */}
      <EmotionBar />

      <View style={styles.emotionSummary}>
        <Text style={styles.summaryText}>감정 변화 요약</Text>
        <View style={styles.emotionRow}>
          <Text style={styles.emotionLabel}>스트레스:</Text>
          <Text style={styles.emotionValue}>{emotionState.stress}</Text>
        </View>
        <View style={styles.emotionRow}>
          <Text style={styles.emotionLabel}>행복:</Text>
          <Text style={styles.emotionValue}>{emotionState.happiness}</Text>
        </View>
        <View style={styles.emotionRow}>
          <Text style={styles.emotionLabel}>자신감:</Text>
          <Text style={styles.emotionValue}>{emotionState.confidence}</Text>
        </View>
        <View style={styles.emotionRow}>
          <Text style={styles.emotionLabel}>불안감:</Text>
          <Text style={styles.emotionValue}>{emotionState.anxiety}</Text>
        </View>
      </View>

      <Button
        title="다른 시나리오 선택"
        onPress={handleScenarioSelect}
        gradientColors={['#4A90E2', '#A7C7E7']} // 더 명확한 색상 대비 제공
        style={styles.button}
        textStyle={styles.buttonText}
      />

      {/* 홈 화면으로 이동 버튼 */}
      <Button
        title="홈 화면으로 이동"
        onPress={handleGoHome}
        gradientColors={['#FF6347', '#FF7F50']}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  resultMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#1D3557',
    fontWeight: 'bold',
    
  },
  emotionSummary: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  summaryText: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '600',
    color: '#1D3557',
    textAlign: 'center',
  },
  emotionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  emotionLabel: {
    fontSize: 16,
    color: '#333',
  },
  emotionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3557',
  },
  button: {
    borderRadius: 25,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default EndingScreen;
