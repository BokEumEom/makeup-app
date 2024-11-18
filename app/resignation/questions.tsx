import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { QUESTIONS } from '@/constants/resignation/questions';

export default function QuestionsScreen() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [QUESTIONS[currentQuestionIndex].id]: answer });
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push({
        pathname: '/resignation/result',
        params: { answers: JSON.stringify(answers) },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        질문 {currentQuestionIndex + 1}/{QUESTIONS.length}
      </Text>
      <Text style={styles.question}>
        {QUESTIONS[currentQuestionIndex].text}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4CAF50' }]}
          onPress={() => handleAnswer('yes')}
        >
          <Text style={styles.buttonText}>예</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#F44336' }]}
          onPress={() => handleAnswer('no')}
        >
          <Text style={styles.buttonText}>아니오</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  progress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
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
    fontSize: 16,
    fontWeight: '600',
  },
});
