export const SCORE_THRESHOLDS = {
  stable: { min: 0, max: 5 }, // 안정적 상태
  slightIssue: { min: 6, max: 10 }, // 약간의 문제
  considerLeaving: { min: 11, max: 15 }, // 이직 고려
  stronglyRecommendLeaving: { min: 16, max: 20 }, // 퇴사 적극 권장
};
