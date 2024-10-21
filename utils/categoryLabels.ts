// utils/categoryLabels.ts

const categoryLabels: { [key: string]: string } = {
  satisfaction: '만족도',
  communication: '의사소통',
  conflict_resolution: '갈등 해결',
  trust: '신뢰',
  emotional_support: '정서적 지지',
  future_plans: '미래 계획',
  emotional_expression: '감정 표현',
  personal_space: '개인 공간',
  relationship_growth: '관계 성장',
  gratitude: '감사 표현'
};

// 축약된 레이블을 제공하는 객체 추가
const shortenedCategoryLabels: { [key: string]: string } = {
  satisfaction: '만족도',
  communication: '소통',
  conflict_resolution: '갈등',
  trust: '신뢰',
  emotional_support: '지지',
  future_plans: '미래',
  emotional_expression: '감정',
  personal_space: '공간',
  relationship_growth: '성장',
  gratitude: '감사'
};

// 일반 레이블 가져오기 함수
export const getCategoryLabel = (category: string, shortened: boolean = false): string => {
  if (shortened) {
    return shortenedCategoryLabels[category] || category; // 축약된 레이블 반환
  }
  return categoryLabels[category] || category; // 기본 레이블 반환
};
