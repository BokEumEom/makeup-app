// components/emotions/EmotionsFlow.tsx
import React, { useState } from 'react';
import QuestionSection from './QuestionSection';
import ResultSection from './ResultSection';
import { emotionsData } from '../../constants/emotions';

type EmotionsFlowProps = {
  emotionKey: string;
};

export default function EmotionsFlow({ emotionKey }: EmotionsFlowProps) {
  const emotion = emotionsData[emotionKey as keyof typeof emotionsData]; 
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [conclusion, setConclusion] = useState('');

  const handleNextSection = (answers: boolean[]) => {
    const positiveAnswers = answers.filter((answer) => answer).length;
    const answerRatio = positiveAnswers / answers.length;

    let sectionConclusion = '';
    if (answerRatio >= 0.8) {
      sectionConclusion = emotion.sections[currentSectionIndex].conclusions.high;
    } else if (answerRatio >= 0.4) {
      sectionConclusion = emotion.sections[currentSectionIndex].conclusions.medium;
    } else {
      sectionConclusion = emotion.sections[currentSectionIndex].conclusions.low;
    }

    setConclusion(sectionConclusion);
    setShowResult(true);
  };

  const handleLearnMore = () => {
    setShowResult(false);
    setCurrentSectionIndex(currentSectionIndex + 1);
  };

  if (showResult) {
    return <ResultSection conclusion={conclusion} onLearnMore={handleLearnMore} />;
  }

  return (
    <QuestionSection
      section={emotion.sections[currentSectionIndex]}
      onNext={handleNextSection}
      emotionKey={emotionKey} // emotionKey 전달
    />
  );
}
