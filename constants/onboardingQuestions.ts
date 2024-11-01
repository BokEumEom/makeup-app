import { Question } from '../types/onboarding';

export const onboardingQuestions: Question[] = [
  {
    id: 1,
    text: '지금의 관계가 얼마나 만족스러우신가요?',
    min: 0,
    max: 10,
    category: 'satisfaction'
  },
  {
    id: 2,
    text: '상대방과 대화가 잘 통한다고 느끼시나요?',
    min: 0,
    max: 10,
    category: 'communication'
  },
  {
    id: 3,
    text: '갈등이 생기면 얼마나 잘 해결해 나가시나요?',
    min: 0,
    max: 10,
    category: 'conflict_resolution'
  },
  {
    id: 4,
    text: '상대방을 얼마나 믿고 의지하시나요?',
    min: 0,
    max: 10,
    category: 'trust'
  },
  {
    id: 5,
    text: '상대방에게서 충분한 정서적 지지를 받고 있다고 느끼시나요?',
    min: 0,
    max: 10,
    category: 'emotional_support'
  },
  {
    id: 6,
    text: '이 관계의 미래에 대해 얼마나 긍정적으로 생각하시나요?',
    min: 0,
    max: 10,
    category: 'future_plans'
  },
  {
    id: 7,
    text: '상대방에게 감정을 솔직하게 표현하는 게 편하신가요?',
    min: 0,
    max: 10,
    category: 'emotional_expression'
  },
  {
    id: 8,
    text: '서로의 개인 시간을 존중해 주고 있다고 생각하시나요?',
    min: 0,
    max: 10,
    category: 'personal_space'
  },
  {
    id: 9,
    text: '이 관계를 더 나아지게 하기 위해 노력하고 계신가요?',
    min: 0,
    max: 10,
    category: 'relationship_growth'
  },
  {
    id: 10,
    text: '상대방에게 자주 감사의 마음을 표현하고 계신가요?',
    min: 0,
    max: 10,
    category: 'gratitude'
  }
];
