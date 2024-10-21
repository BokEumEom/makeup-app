import { AnswerScores, EvaluationResult, EvaluationCriteria, MissionSuggestions } from '../types/onboarding';
import { evaluationCriteria } from '../constants/evaluationCriteria';
import { missionSuggestions } from '../constants/missionSuggestions';

export const getAverage = (scores: number[]): number => {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
};

export const evaluateScores = (scores: AnswerScores): { [category: string]: EvaluationResult } => {
  const results: { [category: string]: EvaluationResult } = {};

  Object.entries(scores).forEach(([category, categoryScores]) => {
    const averageScore = getAverage(categoryScores);
    const criteria = evaluationCriteria[category];

    let evaluation: EvaluationResult = { level: '보통', description: '평가 기준 없음' };

    for (const criterion of criteria) {
      if (averageScore >= criterion.min && averageScore <= criterion.max) {
        evaluation = { level: criterion.level, description: criterion.description };
        break;
      }
    }

    results[category] = evaluation;
  });

  return results;
};

export const suggestMission = (scores: AnswerScores): string => {
  const averages = Object.entries(scores).map(([category, categoryScores]) => ({
    category,
    average: getAverage(categoryScores)
  }));

  const lowestCategory = averages.reduce((min, current) => 
    current.average < min.average ? current : min
  );

  return missionSuggestions[lowestCategory.category] || '일반적인 미션: 오늘 하루 상대방과 함께 즐거운 시간을 보내세요.';
};

export const calculateOverallScore = (scores: AnswerScores): number => {
  const allScores = Object.values(scores).flat();
  return getAverage(allScores);
};

