// utils/scoring.ts

import { AnswerScores, EvaluationResult } from '../types/onboarding';
import { evaluationCriteria } from '../constants/evaluationCriteria';
import { missionSuggestions } from '../constants/missionSuggestions';

export const getAverage = (scores: number[]): number => {
  if (scores.length === 0) return 0; // 배열이 비어있을 경우 0 반환
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  const average = sum / scores.length;
  return isNaN(average) || !isFinite(average) ? 0 : average; // NaN 또는 Infinity 체크
};

export const evaluateScores = (scores: AnswerScores): { [category: string]: EvaluationResult } => {
  const results: { [category: string]: EvaluationResult } = {};

  Object.entries(scores).forEach(([category, categoryScores]) => {
    const averageScore = getAverage(categoryScores);
    const criteria = evaluationCriteria[category]; // 객체 키 접근

    if (!criteria) {
      results[category] = { level: '보통', description: '평가 기준 없음' };
      return;
    }

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
    average: getAverage(categoryScores),
  }));

  const lowestCategory = averages.reduce((min, current) =>
    current.average < min.average ? current : min
  );

  return (
    missionSuggestions[lowestCategory.category] ||
    '기본 미션: 오늘 하루 상대방과 함께 즐거운 시간을 보내세요.'
  );
};
