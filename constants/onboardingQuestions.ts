import { Question } from '../types/onboarding';

export const onboardingQuestions: Question[] = [
  {
    id: 1,
    text: '현재 관계에 얼마나 만족하시나요?',
    min: 0,
    max: 10,
    category: 'satisfaction'
  },
  {
    id: 2,
    text: '상대방과의 의사소통이 얼마나 원활하다고 느끼시나요?',
    min: 0,
    max: 10,
    category: 'communication'
  },
  {
    id: 3,
    text: '갈등이 발생했을 때 얼마나 잘 해결하시나요?',
    min: 0,
    max: 10,
    category: 'conflict_resolution'
  },
  {
    id: 4,
    text: '상대방을 얼마나 신뢰하시나요?',
    min: 0,
    max: 10,
    category: 'trust'
  },
  {
    id: 5,
    text: '상대방에게 얼마나 정서적 지지를 받고 있다고 느끼시나요?',
    min: 0,
    max: 10,
    category: 'emotional_support'
  },
  {
    id: 6,
    text: '관계의 미래에 대해 얼마나 긍정적으로 생각하시나요?',
    min: 0,
    max: 10,
    category: 'future_plans'
  },
  {
    id: 7,
    text: '상대방에게 감정을 표현하는 것이 얼마나 편안하신가요?',
    min: 0,
    max: 10,
    category: 'emotional_expression'
  },
  {
    id: 8,
    text: '서로의 개인 시간을 얼마나 잘 존중한다고 생각하시나요?',
    min: 0,
    max: 10,
    category: 'personal_space'
  },
  {
    id: 9,
    text: '관계 발전을 위해 얼마나 노력하고 계신가요?',
    min: 0,
    max: 10,
    category: 'relationship_growth'
  },
  {
    id: 10,
    text: '상대방에게 얼마나 자주 감사함을 표현하시나요?',
    min: 0,
    max: 10,
    category: 'gratitude'
  }
];

