import { Scenario } from '@/types/scenario';

export const scenario5: Scenario = {
    id: 5,
    title: '중요한 시험을 망쳤을 때',
    description: '중요한 시험에서 실패한 상황입니다. 어떻게 대처할 것인가?',
    chapters: [
      {
        id: 1,
        text: '당신은 중요한 시험에서 실패했습니다. 어떻게 대처하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '실패를 받아들이고 다시 계획을 세운다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, happiness: 10, confidence: 15, anxiety: -5 },
            message: '실패를 교훈 삼아 새로운 계획을 세우고, 자신감을 되찾았습니다.',
          },
          {
            id: 2,
            text: '친구나 가족에게 도움을 요청한다.',
            nextChapterId: 3,
            emotionalImpact: { stress: -5, happiness: 15, confidence: 10, anxiety: -5 },
            message: '친구나 가족의 도움을 받아 기분이 나아지고, 다시 도전할 용기가 생겼습니다.',
          },
          {
            id: 3,
            text: '포기하고 다른 길을 모색한다.',
            nextChapterId: 4,
            emotionalImpact: { stress: 15, happiness: -10, confidence: -15, anxiety: 10 },
            message: '시험을 포기한 결과, 불안과 스트레스가 증가하고 의욕을 잃게 되었습니다.',
          },
        ],
      },
      {
        id: 2,
        text: '새로운 계획을 세운 후 다시 도전을 준비합니다. 무엇을 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '공부 방법을 바꿔본다.',
            nextChapterId: 5,
            emotionalImpact: { stress: -10, happiness: 15, confidence: 20, anxiety: -5 },
            message: '공부 방법을 바꾼 후, 다시 시험에 도전해 성공할 자신감을 얻었습니다.',
          },
          {
            id: 2,
            text: '전문가의 도움을 받는다.',
            nextChapterId: 6,
            emotionalImpact: { stress: -5, happiness: 10, confidence: 15, anxiety: -5 },
            message: '전문가의 도움으로 새로운 전략을 배우며, 준비가 잘 진행되었습니다.',
          },
        ],
      },
      {
        id: 3,
        text: '친구나 가족과 시간을 보내며 어떤 결정을 내리셨습니까?',
        choices: [
          {
            id: 1,
            text: '함께 스터디 그룹을 만든다.',
            nextChapterId: 5,
            emotionalImpact: { stress: -10, happiness: 15, confidence: 20, anxiety: -5 },
            message: '친구들과 스터디 그룹을 만들어 공부의 동기부여가 되었습니다.',
          },
          {
            id: 2,
            text: '잠시 휴식을 취하고 재충전한다.',
            nextChapterId: 6,
            emotionalImpact: { stress: -15, happiness: 10, confidence: 10, anxiety: -10 },
            message: '휴식을 통해 스트레스를 해소하고, 재충전의 시간을 가졌습니다.',
          },
        ],
      },
      {
        id: 4,
        text: '새로운 길을 찾기 위해 어떤 행동을 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '진로 상담을 받아본다.',
            nextChapterId: 7,
            emotionalImpact: { stress: -5, happiness: 10, confidence: 15, anxiety: -5 },
            message: '진로 상담을 통해 새로운 기회를 찾고 긍정적인 방향으로 나아갑니다.',
          },
          {
            id: 2,
            text: '바로 취업을 시도한다.',
            nextChapterId: 8,
            emotionalImpact: { stress: 15, happiness: -10, confidence: -10, anxiety: 15 },
            message: '취업 시도가 어려워지며, 스트레스와 불안감이 증가했습니다.',
          },
        ],
      },
      {
        id: 5,
        text: '다시 도전하여 성공했습니다. 시험을 통과한 기쁨이 느껴집니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 6,
        text: '휴식을 통해 재충전하고 나아갈 준비가 되었습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 7,
        text: '진로 상담 후, 새로운 방향으로 나아가며 긍정적인 미래를 맞이합니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 8,
        text: '취업에 실패하고 스트레스와 좌절감이 커집니다.',
        isEnding: true,
        choices: [],
      },
    ],
};
