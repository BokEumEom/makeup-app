import { useState, useEffect } from 'react';
import { chatQuizData, ChatQuizItem } from '@/constants/chatQuizData';

export const useChatQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<ChatQuizItem[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isOptionVisible, setIsOptionVisible] = useState(false);

  // 점수 및 스탯/스킬 상태 관리
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState<{ [key: string]: number }>({
    탐험력: 0,
    관찰력: 0,
    지혜: 0,
  });
  const [skills, setSkills] = useState<{ [key: string]: number }>({
    "마음 다스리기": 1,
    "스트레스 해소": 1,
    "감정 표현": 1,
  });

  const currentData = chatQuizData[currentStep];

  useEffect(() => {
    if (currentStep === 0) {
      advanceStep();
    }
  }, []);

  useEffect(() => {
    if (currentStep > 0) {
      advanceStep();
    }
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep + 1 < chatQuizData.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log('Game over');
    }
  };

  const advanceStep = () => {
    if (currentStep >= chatQuizData.length) {
      console.log('Game over');
      return;
    }

    const nextData = chatQuizData[currentStep];

    if (nextData.type === 'story' || nextData.type === 'feedback') {
      setIsTyping(true);
      setIsOptionVisible(false);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, nextData]);

        setTimeout(() => {
          nextStep();
        }, 1000);
      }, 1000);
    } else if (nextData.type === 'question') {
      setIsOptionVisible(false);
      setMessages((prev) => [...prev, nextData]);

      setTimeout(() => {
        setIsOptionVisible(true);
      }, 300);
    }
  };

  const handleOptionSelect = (index: number) => {
    if (currentData?.type === 'question' && isOptionVisible) {
      const isCorrect = currentData.correct === index;

      setMessages((prev) => [
        ...prev,
        { type: 'player', content: currentData.options[index] },
      ]);

      setIsTyping(true);
      setIsOptionVisible(false);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: 'feedback',
            content: isCorrect
              ? currentData.feedback.correct
              : currentData.feedback.incorrect,
          },
        ]);

        setFeedbackMessage(isCorrect ? '정답입니다!' : '틀렸습니다!');
        setSelectedOption(index);

        if (isCorrect) {
          // 점수 및 스탯 업데이트
          setScore((prev) => prev + 10);
          setStats((prev) => ({
            ...prev,
            탐험력: Math.min(prev.탐험력 + 5, 100),
            관찰력: Math.min(prev.관찰력 + 3, 100),
            지혜: Math.min(prev.지혜 + 2, 100),
          }));

          // 스킬 레벨 증가 (무작위로 1개 선택)
          const randomSkill = Object.keys(skills)[
            Math.floor(Math.random() * Object.keys(skills).length)
          ];
          setSkills((prev) => ({
            ...prev,
            [randomSkill]: prev[randomSkill] + 1,
          }));
        }

        setTimeout(() => {
          setSelectedOption(null);
          setFeedbackMessage(null);
          nextStep();
        }, 1500);
      }, 1500);
    }
  };

  return {
    messages,
    currentData,
    selectedOption,
    feedbackMessage,
    handleOptionSelect,
    isTyping,
    isOptionVisible,
    score,
    stats,
    skills,
  };
};
