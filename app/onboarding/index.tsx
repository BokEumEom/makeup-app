// app/onboarding/index.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onboardingQuestions } from '../../constants/onboardingQuestions';
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const router = useRouter();
  const { relationshipType } = useLocalSearchParams();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const saveAnswers = async (newAnswers: { [key: number]: number }) => {
    try {
      await AsyncStorage.setItem('@onboarding_answers', JSON.stringify(newAnswers));
    } catch (error) {
      console.error('Failed to save answers', error);
    }
  };

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

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSliderChange = (value: number) => {
    if (step <= onboardingQuestions.length) {
      const currentQuestion = onboardingQuestions[step - 1];
      const newAnswers = { ...answers, [currentQuestion.id]: value };
      setAnswers(newAnswers);
    }
  };

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
            <TouchableOpacity style={styles.backButton} onPress={handleBack} accessible accessibilityLabel="이전 단계로 이동">
              <Ionicons name="arrow-back" size={wp('6%')} color="#4A90E2" />
            </TouchableOpacity>
          )}
          <Pressable
            style={({ hovered }) => [
              styles.button,
              hovered && { backgroundColor: '#3A7BD5' },
            ]}
            onPress={handleNext}
            accessible
            accessibilityLabel="다음 단계로 이동"
          >
            <Text style={styles.buttonText}>
              {step === onboardingQuestions.length ? '완료' : '다음'}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderProgressBar = () => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${(step / onboardingQuestions.length) * 100}%` }]} />
    </View>
  );

  return loading ? (
    <ActivityIndicator size="large" color="#4A90E2" style={styles.loadingIndicator} />
  ) : (
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
    maxWidth: wp('90%'),
    marginHorizontal: 'auto',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: wp('5%'),
  },
  contentContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    textAlign: 'center',
    color: '#333',
  },
  slider: {
    width: wp('80%'),
    height: hp('5%'),
  },
  sliderValue: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
    color: '#4A90E2',
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('7%'),
    borderRadius: 25,
    marginTop: hp('3%'),
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  progressContainer: {
    padding: hp('2%'),
    alignItems: 'center',
  },
  progressText: {
    fontSize: wp('4%'),
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('80%'),
    marginTop: hp('3%'),
  },
  backButton: {
    padding: hp('1%'),
  },
  progressBarContainer: {
    width: '100%',
    height: hp('1.2%'),
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    marginBottom: hp('1.5%'),
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 5,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default OnboardingScreen;
