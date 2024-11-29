// 질문 타입
export interface Question {
  id: number; // 질문 고유 ID
  text: string; // 질문 텍스트
  min: number; // 최소값
  max: number; // 최대값
  category: string; // 카테고리 이름
}

// 답변 점수 타입
export type AnswerScores = {
  [category: string]: number[]; // 각 카테고리에 속한 점수 배열
};

// 심각도 레벨 타입
export type SeverityLevel =
  | '매우 낮음'
  | '낮음'
  | '보통'
  | '높음'
  | '매우 높음'
  | '부족'
  | '강함'
  | '우수'
  | '불량'
  | '원활'
  | '안정'
  | '불안정'
  | '양호'
  | '적극적'
  | '풍부';

// 평가 결과 타입
export interface EvaluationResult {
  level: SeverityLevel; // 심각도 레벨
  description: string; // 해당 레벨에 대한 설명
}

// 평가 기준 타입
export interface EvaluationCriterion {
  min: number; // 최소 점수
  max: number; // 최대 점수
  level: SeverityLevel; // 심각도 레벨
  description: string; // 평가 설명
}

// 카테고리별 평가 기준 타입
export type EvaluationCriteria = {
  [category: string]: EvaluationCriterion[]; // 카테고리별 평가 기준 배열
};

// 결과 항목 타입
export interface ResultItem {
  category: string; // 카테고리 이름
  score: number; // 평균 점수
  evaluation: EvaluationResult; // 평가 결과
}

// 미션 제안 타입
export type MissionSuggestions = {
  [category: string]: string; // 카테고리별 미션 텍스트
};

// 온보딩 상태 타입
export interface OnboardingState {
  step: number; // 현재 단계
  answers: { [key: number]: number }; // 질문 ID별 답변 점수
}

// 관계 유형 타입
export type RelationshipType =
  | '연인'
  | '부부'
  | '친구'
  | '가족'
  | '동료'; // 관계 유형
