import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { Question } from '../../types/onboarding';

interface QuestionScreenProps {
  question: Question;
  value: number;
  onValueChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
  isLastQuestion: boolean;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  value,
  onValueChange,
  onNext,
  onBack,
  isLastQuestion,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>
      <Slider
        style={styles.slider}
        minimumValue={question.min}
        maximumValue={question.max}
        step={1}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#6A92B8"
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor="#6A92B8"
      />
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{question.min}</Text>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.valueText}>{question.max}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#6A92B8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>
            {isLastQuestion ? '완료' : '다음'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  valueText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  backButton: {
    padding: 10,
  },
  nextButton: {
    backgroundColor: '#6A92B8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
