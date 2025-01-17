// components/emotions/QuestionSection.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button } from '../common/Button';
import CustomText from '@/components/common/CustomText';

type QuestionSectionProps = {
  section: { title: string; questions: string[]; conclusions: any };
  onNext: (answers: boolean[]) => void;
  emotionKey: string; // EmotionsFlow에서 전달받는 감정 키
};

const emotionStates = [
  { key: 'positiveEmotions', title: '긍정적 감정', icon: require('@/assets/emotions/mint-bear-character.webp') },
  { key: 'sadness', title: '슬픔/우울감', icon: require('@/assets/emotions/mint-bear-struggling.webp') },
  { key: 'anger', title: '분노/짜증', icon: require('@/assets/emotions/two-chibi-characters.webp') },
  { key: 'stress', title: '스트레스', icon: require('@/assets/emotions/mint-bear-cleansing-balm.webp') },
  { key: 'anxiety', title: '불안/불확실감', icon: require('@/assets/emotions/mint-bear-character-balance.webp') },
  { key: 'apathy', title: '무관심/흥미상실', icon: require('@/assets/emotions/mint-colored-bear-character.webp') },
];

export default function QuestionSection({ section, onNext, emotionKey }: QuestionSectionProps) {
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const selectedEmotion = emotionStates.find(e => e.key === emotionKey);

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
    <ImageBackground
      source={selectedEmotion ? selectedEmotion.icon : null} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <CustomText style={styles.title}>{section.title}</CustomText>
        <CustomText style={styles.question}>{section.questions[currentQuestion]}</CustomText>
        
        <Button
          title="Yes"
          onPress={() => handleAnswer(true)}
          gradientColors={['#4CAF50', '#66BB6A']}
          style={styles.button}
          textStyle={styles.buttonText}
        />

        <Button
          title="No"
          onPress={() => handleAnswer(false)}
          gradientColors={['#F44336', '#EF5350']}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center', // 질문, 버튼 중앙 배치
    backgroundColor: 'rgba(255, 241, 230, 0.7)', // 배경 이미지 위에 반투명 레이어로 읽기 쉬운 텍스트 제공
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
    padding:20,
    backgroundColor: '#000',
    borderRadius: 25,
    opacity: 0.5,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});
