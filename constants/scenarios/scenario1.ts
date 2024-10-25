import { Scenario } from '@/types/scenario';

export const scenario1: Scenario = {
  id: 1,
    title: '직장 내 괴롭힘에 대처하기',
    description: '동료가 지속적으로 당신의 업무를 방해하고 부정적인 말을 합니다. 어떻게 대응하시겠습니까?',
    chapters: [
      {
        id: 1,
        text: '동료가 지속적으로 당신의 업무를 방해하고 부정적인 말을 합니다. 어떻게 대응하시겠습니까?',
        choices: [
          { 
            id: 1, 
            text: '동료에게 직접적으로 문제를 제기한다.', 
            nextChapterId: 2, 
            emotionalImpact: { stress: -10, happiness: 0, confidence: 10, anxiety: -5 },
            message: '동료와 대화를 통해 갈등이 해소되었습니다.',
          },
          { 
            id: 2, 
            text: '상사에게 이 문제를 보고한다.', 
            nextChapterId: 3, 
            emotionalImpact: { stress: -5, happiness: 5, confidence: 5, anxiety: -3 },
            message: '상사에게 보고한 후, 문제가 해결되기 시작했습니다.',
          },
          { 
            id: 3, 
            text: '무시하고 업무에 집중한다.', 
            nextChapterId: 4, 
            emotionalImpact: { stress: 10, happiness: -5, confidence: -5, anxiety: 10 },
            message: '무시하였으나, 문제는 더 심화되었습니다.',
          },
        ],
      },
      {
        id: 2,
        text: '동료는 방어적으로 반응합니다. 어떻게 하시겠습니까?',
        choices: [
          { 
            id: 1, 
            text: '중재자를 통해 갈등 해결을 제안한다.', 
            nextChapterId: 5, 
            emotionalImpact: { stress: -5, happiness: 10, confidence: 5, anxiety: -2 },
            message: '중재를 통해 갈등이 해결되었습니다.',
          },
          { 
            id: 2, 
            text: '사과하고 상황을 무마한다.', 
            nextChapterId: 6, 
            emotionalImpact: { stress: 5, happiness: -10, confidence: -5, anxiety: 5 },
            message: '사과하였으나, 상황이 나빠졌습니다.',
          },
        ],
      },
      {
        id: 3,
        text: '상사는 두 사람과의 면담을 계획합니다. 어떻게 준비하시겠습니까?',
        choices: [
          { 
            id: 1, 
            text: '구체적인 사례를 문서화하여 준비한다.', 
            nextChapterId: 5, 
            emotionalImpact: { stress: -5, happiness: 10, confidence: 10, anxiety: -3 },
            message: '상사와의 면담에서 구체적인 사례를 들어 문제를 설명합니다.',
          },
          { 
            id: 2, 
            text: '면담에서 문제를 축소하여 말한다.', 
            nextChapterId: 6, 
            emotionalImpact: { stress: 5, happiness: -10, confidence: -5, anxiety: 10 },
            message: '문제를 축소하여 말했으나, 해결되지 않았습니다.',
          },
        ],
      },
      {
        id: 4,
        text: '동료의 행동이 더 심해져 업무에 지장이 생깁니다. 어떻게 하시겠습니까?',
        choices: [
          { 
            id: 1, 
            text: '결국 문제를 보고하기로 결정한다.', 
            nextChapterId: 5, 
            emotionalImpact: { stress: -10, happiness: 5, confidence: 5, anxiety: -5 },
            message: '결국 상사에게 보고하여 문제가 해결되었습니다.',
          },
          { 
            id: 2, 
            text: '계속해서 아무 행동도 하지 않는다.', 
            nextChapterId: 6, 
            emotionalImpact: { stress: 15, happiness: -10, confidence: -5, anxiety: 15 },
            message: '아무 행동도 하지 않아서 상황이 악화되었습니다.',
          },
        ],
      },
      {
        id: 5,
        text: '갈등이 해결되고 업무가 정상적으로 돌아왔습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 6,
        text: '상황이 악화되었고, 갈등이 해결되지 않았습니다.',
        isEnding: true,
        choices: [],
      },
    ],
};
