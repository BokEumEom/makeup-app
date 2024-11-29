import React, { useState, useEffect, useCallback, useMemo, useReducer } from 'react';
import { FlatList, StyleSheet, ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onboardingQuestions } from '@/constants/onboardingQuestions';
import { Indicator } from '@/components/onboarding/Indicator';
import { QuestionView } from '@/components/onboarding/QuestionView';

// 타입 정의
interface AnswerState {
  [key: number]: number; // 질문 ID와 그에 해당하는 답변 값
}

interface UpdateAnswerAction {
  type: 'UPDATE_ANSWER';
  id: number;
  value: number;
}

type AnswerAction = UpdateAnswerAction;

const QuestionScreen = () => {
  const router = useRouter();
  const { relationshipType } = useLocalSearchParams();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const answersReducer = (state: AnswerState, action: AnswerAction): AnswerState => {
    switch (action.type) {
      case 'UPDATE_ANSWER':
        return { ...state, [action.id]: action.value };
      default:
        return state;
    }
  };

  const [answers, dispatch] = useReducer(answersReducer, {});

  useEffect(() => {
    loadAnswers();
  }, []);

  const loadAnswers = async () => {
    setIsLoading(true);
    try {
      const savedAnswers = await AsyncStorage.getItem('@onboarding_answers');
      if (savedAnswers !== null) {
        const parsedAnswers = JSON.parse(savedAnswers);
        Object.keys(parsedAnswers).forEach((key) => {
          dispatch({ type: 'UPDATE_ANSWER', id: Number(key), value: parsedAnswers[key] });
        });
      }
    } catch (error) {
      console.error('Failed to load answers', error);
      alert('데이터를 불러오는 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveAnswers = async (newAnswers: AnswerState) => {
    try {
      await AsyncStorage.setItem('@onboarding_answers', JSON.stringify(newAnswers));
    } catch (error) {
      console.error('Failed to save answers', error);
    }
  };

  const handleSliderChange = useCallback(
    (value: number) => {
      const currentQuestion = onboardingQuestions[step - 1];
      dispatch({ type: 'UPDATE_ANSWER', id: currentQuestion.id, value });
    },
    [step]
  );

  const handleNext = useCallback(async () => {
    if (step < onboardingQuestions.length) {
      setStep(step + 1);
    } else {
      // answers 데이터 검증
      const isValidAnswers = Object.values(answers).every((value) => typeof value === 'number' && isFinite(value));
      if (!isValidAnswers) {
        alert('응답 데이터에 문제가 있습니다. 다시 시도해주세요.');
        return;
      }
  
      await saveAnswers(answers);
      router.push({
        pathname: '/onboarding/result',
        params: {
          answers: JSON.stringify(answers),
          relationshipType,
        },
      });
    }
  }, [step, answers]);  

  const currentQuestion = useMemo(() => onboardingQuestions[step - 1], [step]);
  const currentValue = useMemo(() => answers[currentQuestion.id] ?? currentQuestion.min, [answers, currentQuestion]);

  return (
    <ImageBackground
      source={require('@/assets/bg/bg_question.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={[currentQuestion]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <QuestionView
              question={item}
              value={currentValue}
              onValueChange={handleSliderChange}
            />
          )}
          contentContainerStyle={styles.scrollContent}
        />
        <Indicator
          total={onboardingQuestions.length}
          selectedIndex={step - 1}
          onIndexChange={(index) => setStep(index + 1)}
          onFinish={handleNext}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1, // 콘텐츠가 중앙에 위치하도록 높이 확장
    justifyContent: 'center', // 세로 방향 가운데 정렬
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});

export default QuestionScreen;
