// components/emotions/EmotionsSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function EmotionsSelector() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>현재 감정 상태 선택</Text>
      
      <TouchableOpacity
        style={[styles.button, styles.positiveButton]}
        onPress={() => router.push('/emotions/positiveEmotions')}
      >
        <Text style={styles.buttonText}>긍정적 감정</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.sadnessButton]}
        onPress={() => router.push('/emotions/sadness')}
      >
        <Text style={styles.buttonText}>슬픔/우울감</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.angerButton]}
        onPress={() => router.push('/emotions/anger')}
      >
        <Text style={styles.buttonText}>분노/짜증</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.stressButton]}
        onPress={() => router.push('/emotions/stress')}
      >
        <Text style={styles.buttonText}>스트레스/압박감</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.anxietyButton]}
        onPress={() => router.push('/emotions/anxiety')}
      >
        <Text style={styles.buttonText}>불안/불확실감</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.apathyButton]}
        onPress={() => router.push('/emotions/apathy')}
      >
        <Text style={styles.buttonText}>무관심/흥미 상실</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  positiveButton: {
    backgroundColor: '#A5D6A7', // Soft green for positive emotions
  },
  sadnessButton: {
    backgroundColor: '#90CAF9', // Soft blue for sadness
  },
  angerButton: {
    backgroundColor: '#EF9A9A', // Soft red for anger
  },
  stressButton: {
    backgroundColor: '#FFCC80', // Soft orange for stress
  },
  anxietyButton: {
    backgroundColor: '#B39DDB', // Soft purple for anxiety
  },
  apathyButton: {
    backgroundColor: '#B0BEC5', // Soft gray for apathy
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
