import { EvaluationCriteria } from '../types/onboarding';

export const evaluationCriteria: EvaluationCriteria = {
  satisfaction: [
    { min: 0, max: 3, level: '매우 낮음', description: '관계에 대한 만족도가 매우 낮고 심각한 문제 개선이 필요함' },
    { min: 4, max: 6, level: '보통', description: '관계 만족도가 중간 수준이며, 추가적인 개선이 필요함' },
    { min: 7, max: 10, level: '높음', description: '관계에 대해 전반적으로 만족하고 있는 상태' },
  ],
  communication: [
    { min: 0, max: 3, level: '불량', description: '의사소통에서 심각한 문제가 존재하며, 즉각적인 해결이 필요함' },
    { min: 4, max: 6, level: '보통', description: '의사소통이 중간 정도로 이루어지며 개선의 여지가 있음' },
    { min: 7, max: 10, level: '원활', description: '의사소통이 원활하며, 큰 문제가 없음' },
  ],
  conflict_resolution: [
    { min: 0, max: 3, level: '매우 낮음', description: '갈등 해결 능력이 부족하며 관계 유지에 위험 요소가 있음' },
    { min: 4, max: 6, level: '보통', description: '갈등 해결 능력이 보통 수준이나 개선이 필요함' },
    { min: 7, max: 10, level: '우수', description: '갈등 해결 능력이 매우 뛰어나며 문제가 적음' },
  ],
  trust: [
    { min: 0, max: 3, level: '낮음', description: '상대방에 대한 신뢰가 부족하며 관계의 불안정성 초래' },
    { min: 4, max: 6, level: '보통', description: '신뢰가 중간 수준이며 개선이 필요함' },
    { min: 7, max: 10, level: '높음', description: '신뢰가 높은 상태로 관계가 안정적임' },
  ],
  emotional_support: [
    { min: 0, max: 3, level: '부족', description: '감정적 지지가 부족하여 관계에서 문제가 발생할 가능성이 큼' },
    { min: 4, max: 6, level: '보통', description: '감정적 지지가 중간 수준이며 개선이 필요함' },
    { min: 7, max: 10, level: '강함', description: '상대방에게 강한 정서적 지지를 제공하는 관계' },
  ],
  future_plans: [
    { min: 0, max: 3, level: '불안정', description: '관계의 미래에 대한 확신이 없고 지속 가능성에 의문이 있음' },
    { min: 4, max: 6, level: '보통', description: '관계의 미래에 대해 어느 정도 확신이 있으나 추가적인 신뢰가 필요' },
    { min: 7, max: 10, level: '안정', description: '관계의 장기적인 미래에 대해 확신을 가지고 있는 상태' },
  ],
  emotional_expression: [
    { min: 0, max: 3, level: '부족', description: '감정 표현이 부족하여 오해가 발생할 수 있음' },
    { min: 4, max: 6, level: '보통', description: '감정 표현이 중간 수준이며 개선이 필요함' },
    { min: 7, max: 10, level: '풍부', description: '감정 표현이 원활하여 관계에 긍정적인 영향을 줌' },
  ],
  personal_space: [
    { min: 0, max: 3, level: '부족', description: '개인 시간을 존중하지 않아 갈등이 발생할 수 있음' },
    { min: 4, max: 6, level: '보통', description: '개인 시간 존중이 중간 수준이며 개선이 필요함' },
    { min: 7, max: 10, level: '양호', description: '서로의 개인 시간을 잘 존중하고 있음' },
  ],
  relationship_growth: [
    { min: 0, max: 3, level: '부족', description: '관계 발전을 위한 노력이 부족함' },
    { min: 4, max: 6, level: '보통', description: '관계 발전 노력이 중간 수준이며 개선이 필요함' },
    { min: 7, max: 10, level: '적극적', description: '관계 발전을 위해 적극적으로 노력하고 있음' },
  ],
  gratitude: [
    { min: 0, max: 3, level: '부족', description: '감사 표현이 부족하여 상대방이 소외감을 느낄 수 있음' },
    { min: 4, max: 6, level: '보통', description: '감사 표현이 중간 수준이며 개선이 필요함' },
    { min: 7, max: 10, level: '풍부', description: '감사 표현이 자주 이루어져 관계에 긍정적인 영향을 줌' },
  ],
};

