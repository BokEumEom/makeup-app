import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onboardingQuestions } from '@/constants/onboardingQuestions';
import { Indicator } from '@/components/onboarding/Indicator'; // Import Indicator component

const OnboardingScreen = () => {
  const router = useRouter();
  const { relationshipType } = useLocalSearchParams();
  const [step, setStep] = useState(1);
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

  const handleSliderChange = (value: number) => {
    if (step <= onboardingQuestions.length) {
      const currentQuestion = onboardingQuestions[step - 1];
      const newAnswers = { ...answers, [currentQuestion.id]: value };
      setAnswers(newAnswers);
      saveAnswers(newAnswers);
    }
  };

  const renderQuestion = () => {
    if (step > onboardingQuestions.length) return null;

    const currentQuestion = onboardingQuestions[step - 1];
    return (
      <View style={styles.contentContainer}>
        <View style={styles.speechBubble}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          <View style={styles.speechBubbleTail} />
        </View>

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
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('@/assets/bg/bg_question.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {renderQuestion()}
        </ScrollView>
        <Indicator
          total={onboardingQuestions.length}
          selectedIndex={step - 1}
          onIndexChange={(index) => setStep(index + 1)}
          onFinish={() => {
            saveAnswers(answers);
            router.push({
              pathname: '/onboarding/result',
              params: {
                answers: JSON.stringify(answers),
                relationshipType: relationshipType,
              },
            });
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 100,
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
    marginBottom: 30,
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
    letterSpacing: -0.75,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 20,
  },
  sliderValue: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
    color: '#6F5FD4',
  },
});

export default OnboardingScreen;
