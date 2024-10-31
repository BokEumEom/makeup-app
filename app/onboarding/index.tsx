import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onboardingQuestions } from '@/constants/onboardingQuestions';

const OnboardingScreen = () => {
  const router = useRouter();
  const { relationshipType } = useLocalSearchParams(); // 관계 유형 받아오기
  const [step, setStep] = useState(1);// 초기 단계 설정 (1부터 시작)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

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
    if (step > onboardingQuestions.length) return null;

    const currentQuestion = onboardingQuestions[step - 1];
    return (
      <View style={styles.contentContainer}>
        {/* 상단에 말풍선 위치 */}
        <View style={styles.speechBubble}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          <View style={styles.speechBubbleTail} />
        </View>

        {/* 슬라이더 및 버튼 */}
        <Slider
          style={styles.slider}
          minimumValue={currentQuestion.min}
          maximumValue={currentQuestion.max}
          step={1}
          value={answers[currentQuestion.id] ?? 5}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#6F5FD4"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#6F5FD4"
        />
        <Text style={styles.sliderValue}>{answers[currentQuestion.id] ?? 5}</Text>
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color="#6F5FD4" />
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

  return (
    <ImageBackground
  source={require('../../assets/bg/bg_question.png')}
  style={styles.backgroundImage}
>
  {/* 투명한 오버레이 */}
  <View style={styles.overlay} />

  <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {renderQuestion()}
    </ScrollView>
    {step >= 1 && step <= onboardingQuestions.length && (
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${(step / onboardingQuestions.length) * 100}%` }]}
          />
        </View>
        <Text style={styles.progressText}>{`${step} / ${onboardingQuestions.length}`}</Text>
      </View>
    )}
  </SafeAreaView>
</ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // View를 전체 화면에 맞추기 위해
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // 흰색 투명도 0.5 (필요에 따라 조정)
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'center', // 중앙 정렬 유지
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 100, // 말풍선 아래 요소를 떨어뜨리기 위한 여백
  },
  speechBubble: {
    backgroundColor: '#FAFAFF',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    maxWidth: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
    marginBottom: 30, // 슬라이더와의 간격 추가
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -9,
    left: '50%',
    marginLeft: -9,
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
    transform: [{ rotate: '-45deg' }],
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    letterSpacing:-0.75,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 20, // 슬라이더와 말풍선 사이의 간격
  },
  sliderValue: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
    color: '#6F5FD4',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 'auto',
  },
  button: {
    backgroundColor: '#6F5FD4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#9079E9',
    letterSpacing:-0.75,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
  },
  progressContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12, // 조금 더 작게 설정
    color: '#6F5FD4',
  },
  progressBarContainer: {
    width: '40%',
    height: 6, // 더 작게 설정 (기존 16에서 6으로)
    backgroundColor: '#E0E0E0', // 연한 회색
    borderRadius: 3, // 둥근 모서리
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2', // 연한 파란색 (이전 이미지 색상)
    borderRadius: 3, // 둥근 모서리
  },
});

export default OnboardingScreen;
