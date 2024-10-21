// app/onboarding/index.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onboardingQuestions } from '../../constants/onboardingQuestions';

const OnboardingScreen = () => {
  const router = useRouter();
  const { relationshipType } = useLocalSearchParams(); // 관계 유형 받아오기
  const [step, setStep] = useState(1); // 초기 단계 설정 (1부터 시작)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  // 앱 실행 시 저장된 답변 불러오기
  useEffect(() => {
    loadAnswers();
  }, []);

  const loadAnswers = async () => {
    try {
      const savedAnswers = await AsyncStorage.getItem('@onboarding_answers');
      if (savedAnswers !== null) {
        setAnswers(JSON.parse(savedAnswers));
      }
    } catch (error) {
      console.error('Failed to load answers', error);
    }
  };

  const saveAnswers = async (newAnswers: { [key: number]: number }) => {
    try {
      await AsyncStorage.setItem('@onboarding_answers', JSON.stringify(newAnswers));
    } catch (error) {
      console.error('Failed to save answers', error);
    }
  };

  // 다음 버튼 클릭 시 동작
  const handleNext = () => {
    if (step < onboardingQuestions.length) {
      setStep(step + 1);
    } else {
      saveAnswers(answers);
      router.push({
        pathname: '/onboarding/result',
        params: {
          answers: JSON.stringify(answers),
          relationshipType: relationshipType,
        },
      });
    }
  };

  // 이전 버튼 클릭 시 동작
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // 슬라이더 값 변경 시 동작
  const handleSliderChange = (value: number) => {
    if (step <= onboardingQuestions.length) {
      const currentQuestion = onboardingQuestions[step - 1];
      const newAnswers = { ...answers, [currentQuestion.id]: value };
      setAnswers(newAnswers);
      saveAnswers(newAnswers);
    }
  };

  // 질문 화면 렌더링
  const renderQuestion = () => {
    if (step > onboardingQuestions.length) {
      return null;
    }

    const currentQuestion = onboardingQuestions[step - 1];
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
        <Slider
          style={styles.slider}
          minimumValue={currentQuestion.min}
          maximumValue={currentQuestion.max}
          step={1}
          value={answers[currentQuestion.id] ?? 5}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#4A90E2"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#4A90E2"
        />
        <Text style={styles.sliderValue}>{answers[currentQuestion.id] ?? 5}</Text>
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color="#4A90E2" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {step === onboardingQuestions.length ? '완료' : '다음'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // 진행 바 렌더링
  const renderProgressBar = () => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${(step / onboardingQuestions.length) * 100}%` }]} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderQuestion()}
      </ScrollView>
      {step >= 1 && step <= onboardingQuestions.length && (
        <View style={styles.progressContainer}>
          {renderProgressBar()}
          <Text style={styles.progressText}>{`${step} / ${onboardingQuestions.length}`}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    contentContainer: {
      alignItems: 'center',
    },
    gradientContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      padding: 20,
    },
    logo: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#FFFFFF',
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 30,
      color: '#FFFFFF',
    },
    questionText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    slider: {
      width: '100%',
      height: 40,
    },
    sliderValue: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
      color: '#4A90E2',
    },
    button: {
      backgroundColor: '#4A90E2',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      marginTop: 30,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    progressContainer: {
      padding: 20,
      alignItems: 'center',
    },
    progressText: {
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
    progressBarContainer: {
      width: '100%',
      height: 10,
      backgroundColor: '#D3D3D3',
      borderRadius: 5,
      marginBottom: 10,
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#4A90E2',
      borderRadius: 5,
    },
  });
  
  export default OnboardingScreen;
