// 온보딩 질문 타입
export interface Question {
  id: number;
  text: string;
  min: number;
  max: number;
  category: string;
}

// 답변 점수 타입
export type AnswerScores = {
  [category: string]: number[];
};

// 심각도 레벨 타입
export type SeverityLevel = '매우 낮음' | '낮음' | '보통' | '높음' | '매우 높음';

// 평가 결과 타입
export interface EvaluationResult {
  level: SeverityLevel;
  description: string;
}

// 평가 기준 타입
export interface EvaluationCriterion {
  min: number;
  max: number;
  level: SeverityLevel;
  description: string;
}

// 카테고리별 평가 기준 타입
export type EvaluationCriteria = {
  [category: string]: EvaluationCriterion[];
};

// 결과 항목 타입 (ResultCard 컴포넌트에서 사용)
export interface ResultItem {
  category: string;
  score: number;
  evaluation: EvaluationResult;
}

// 미션 제안 타입
export type MissionSuggestions = {
  [category: string]: string;
};

// 온보딩 상태 타입
export interface OnboardingState {
  step: number;
  answers: { [key: number]: number };
}

// 관계 유형 타입
export type RelationshipType = '연인' | '부부' | '친구' | '가족' | '동료';

