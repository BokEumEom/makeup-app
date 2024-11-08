// components/emotions/QuestionSection.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type QuestionSectionProps = {
  section: { title: string; questions: string[]; conclusions: any };
  onNext: (answers: boolean[]) => void;
};

export default function QuestionSection({ section, onNext }: QuestionSectionProps) {
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (answer: boolean) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onNext(updatedAnswers);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{section.title}</Text>
      <Text style={styles.question}>{section.questions[currentQuestion]}</Text>
      
      <TouchableOpacity
        style={[styles.button, styles.yesButton]}
        onPress={() => handleAnswer(true)}
      >
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.noButton]}
        onPress={() => handleAnswer(false)}
      >
        <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '70%',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#4CAF50', // Green color for "Yes"
  },
  noButton: {
    backgroundColor: '#F44336', // Red color for "No"
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
