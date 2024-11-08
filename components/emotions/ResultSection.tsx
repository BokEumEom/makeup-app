// components/emotions/ResultSection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type ResultSectionProps = {
  conclusion: string;
  onLearnMore: () => void;
};

export default function ResultSection({ conclusion, onLearnMore }: ResultSectionProps) {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace('/'); // 홈 화면으로 이동하는 로직
  };

  return (
    <View style={styles.container}>
      <Text style={styles.conclusion}>{conclusion}</Text>
      
      <TouchableOpacity style={styles.button} onPress={onLearnMore}>
        <Text style={styles.buttonText}>내면 더 알아보기</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push('/emotions')}
      >
        <Text style={styles.buttonText}>다른 상태 선택</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.homeButton]}
        onPress={handleGoHome}
      >
        <Text style={styles.buttonText}>홈 화면으로 이동</Text>
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
    backgroundColor: '#F5F5F5',
  },
  conclusion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50', // Main button color (green)
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#1976D2', // Secondary button color (blue)
  },
  homeButton: {
    backgroundColor: '#A7C7E7', // Secondary button color (blue)
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
