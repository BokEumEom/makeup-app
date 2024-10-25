import { Scenario } from '@/types/scenario';

export const scenario2: Scenario = {
  id: 2,
    title: '업무 중 윤리적 딜레마',
    description: '동료가 회사의 기밀 정보를 외부에 유출하는 것을 목격했습니다. 어떻게 하시겠습니까?',
    chapters: [
      {
        id: 1,
        text: '동료가 회사의 기밀 정보를 외부에 유출하는 것을 목격했습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '즉시 상사에게 보고한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, happiness: 0, confidence: 10, anxiety: -5 },
            message: '상사에게 즉시 보고하여 조사가 시작되었습니다.',
          },
          {
            id: 2,
            text: '동료에게 직접 이유를 묻는다.',
            nextChapterId: 3,
            emotionalImpact: { stress: -5, happiness: 5, confidence: 5, anxiety: -3 },
            message: '동료에게 직접 이유를 물어보았습니다.',
          },
          {
            id: 3,
            text: '아무 행동도 하지 않고 지켜본다.',
            nextChapterId: 4,
            emotionalImpact: { stress: 10, happiness: -5, confidence: -5, anxiety: 10 },
            message: '아무 행동도 하지 않았으나, 상황이 점점 심각해집니다.',
          },
        ],
      },
      {
        id: 2,
        text: '상사는 조사에 착수했습니다. 이후 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '조사에 적극 협조한다.',
            nextChapterId: 5,
            emotionalImpact: { stress: -5, happiness: 10, confidence: 5, anxiety: -3 },
            message: '조사에 적극적으로 협조하여 사건이 해결되었습니다.',
          },
          {
            id: 2,
            text: '동료들과의 관계를 고려해 거리를 둔다.',
            nextChapterId: 6,
            emotionalImpact: { stress: 5, happiness: -10, confidence: -5, anxiety: 5 },
            message: '동료들과의 관계가 소원해졌습니다.',
          },
        ],
      },
      {
        id: 3,
        text: '동료는 개인적인 문제가 있다고 말합니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '상사에게 이 사실을 보고한다.',
            nextChapterId: 5,
            emotionalImpact: { stress: -5, happiness: 10, confidence: 5, anxiety: -2 },
            message: '상사에게 사실을 보고하여 문제를 해결했습니다.',
          },
          {
            id: 2,
            text: '동료를 도와 문제를 해결하려 한다.',
            nextChapterId: 6,
            emotionalImpact: { stress: 10, happiness: -5, confidence: -10, anxiety: 15 },
            message: '동료를 도왔으나 문제가 해결되지 않았습니다.',
          },
        ],
      },
      {
        id: 4,
        text: '기밀 정보 유출로 회사에 큰 피해가 발생했습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '뒤늦게 사실을 보고한다.',
            nextChapterId: 5,
            emotionalImpact: { stress: -10, happiness: 0, confidence: 5, anxiety: -5 },
            message: '뒤늦게 보고했으나 피해가 컸습니다.',
          },
          {
            id: 2,
            text: '여전히 아무 말도 하지 않는다.',
            nextChapterId: 6,
            emotionalImpact: { stress: 15, happiness: -10, confidence: -10, anxiety: 20 },
            message: '아무 행동도 하지 않아 회사에 큰 피해가 발생했습니다.',
          },
        ],
      },
      {
        id: 5,
        text: '문제가 해결되었습니다. 회사는 기밀 정보를 보호하기 위한 조치를 취했습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 6,
        text: '문제가 해결되지 않았고, 회사는 큰 피해를 입었습니다.',
        isEnding: true,
        choices: [],
      },
    ],
};
