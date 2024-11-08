// components/emotions/QuestionSection.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../common/Button'; // Assuming you have a common Button component with custom styles

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
      
      <Button
        title="Yes"
        onPress={() => handleAnswer(true)}
        gradientColors={['#4CAF50', '#66BB6A']} // Gradient for "Yes" button
        style={styles.button}
        textStyle={styles.buttonText}
      />

      <Button
        title="No"
        onPress={() => handleAnswer(false)}
        gradientColors={['#F44336', '#EF5350']} // Gradient for "No" button
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF1E6', // Light, warm background color
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 30,
  },
  question: {
    fontSize: 18,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '80%',
    marginBottom: 15,
    borderRadius: 25, // Softer rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});
