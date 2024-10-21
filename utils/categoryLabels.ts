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

export const getCategoryLabel = (category: string): string => {
  return categoryLabels[category] || category;
};

