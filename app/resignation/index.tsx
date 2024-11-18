import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ResignationHome() {
  const router = useRouter();

  const handleStartTest = () => {
    router.push('/resignation/questions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>퇴사 고민 중이신가요?</Text>
      <Text style={styles.subtitle}>
        지금 바로 간단한 테스트를 통해 당신의 현재 상황을 분석해보세요.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleStartTest}>
        <Text style={styles.buttonText}>테스트 시작하기</Text>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
