import { Scenario } from '@/types/scenario';

export const scenario3: Scenario = {
  id: 3,
      title: '친구의 비밀을 알게 되었을 때',
      description: '친구가 비밀리에 위험한 행동을 하고 있음을 알게 되었습니다. 어떻게 하시겠습니까?',
      chapters: [
        {
          id: 1,
          text: '친구가 비밀리에 위험한 행동을 하고 있음을 알게 되었습니다. 어떻게 하시겠습니까?',
          choices: [
            {
              id: 1,
              text: '친구와 직접 대화하여 상황을 알아본다.',
              nextChapterId: 2,
              emotionalImpact: { stress: -10, happiness: 5, confidence: 10, anxiety: -5 },
              message: '친구와 진솔하게 대화를 나누어 상황을 이해하고, 도움이 필요한지 확인했습니다.',
            },
            {
              id: 2,
              text: '가족이나 가까운 사람에게 알린다.',
              nextChapterId: 3,
              emotionalImpact: { stress: 5, happiness: -5, confidence: 0, anxiety: 10 },
              message: '친구의 가족에게 알렸고, 친구는 이 사실을 알게 되었습니다.',
            },
            {
              id: 3,
              text: '아무 말도 하지 않고 지켜본다.',
              nextChapterId: 4,
              emotionalImpact: { stress: 15, happiness: -10, confidence: -5, anxiety: 15 },
              message: '아무 말도 하지 않고 지켜본 결과, 친구의 상황이 더 악화되었습니다.',
            },
          ],
        },
        {
          id: 2,
          text: '친구는 문제를 인정하고 도움을 요청합니다. 어떻게 하시겠습니까?',
          choices: [
            {
              id: 1,
              text: '전문가의 도움을 받도록 권유한다.',
              nextChapterId: 5,
              emotionalImpact: { stress: -5, happiness: 15, confidence: 10, anxiety: -5 },
              message: '친구는 전문가의 도움을 받아 상황이 좋아졌습니다. 당신의 관계도 더욱 돈독해졌습니다.',
            },
            {
              id: 2,
              text: '친구를 직접 도와주기로 한다.',
              nextChapterId: 6,
              emotionalImpact: { stress: 10, happiness: -5, confidence: -10, anxiety: 10 },
              message: '친구를 직접 도왔지만, 상황은 개선되지 않았고 부담이 커졌습니다.',
            },
          ],
        },
        {
          id: 3,
          text: '친구는 당신에게 화를 냅니다. 어떻게 하시겠습니까?',
          choices: [
            {
              id: 1,
              text: '친구에게 사과하고 이해를 구한다.',
              nextChapterId: 5,
              emotionalImpact: { stress: -5, happiness: 10, confidence: 5, anxiety: -3 },
              message: '사과하고 친구에게 다시 접근한 결과, 관계가 회복되었습니다.',
            },
            {
              id: 2,
              text: '친구의 안전을 위해 행동이 필요하다고 설명한다.',
              nextChapterId: 6,
              emotionalImpact: { stress: 5, happiness: -5, confidence: -5, anxiety: 10 },
              message: '친구는 당신의 설명을 받아들이지 않았고, 갈등이 지속되었습니다.',
            },
          ],
        },
        {
          id: 4,
          text: '친구의 상황이 더욱 악화되었습니다. 어떻게 하시겠습니까?',
          choices: [
            {
              id: 1,
              text: '지금이라도 도움을 청한다.',
              nextChapterId: 5,
              emotionalImpact: { stress: -5, happiness: 5, confidence: 5, anxiety: -5 },
              message: '지금이라도 도움을 청하여 친구의 상황을 개선할 수 있었습니다.',
            },
            {
              id: 2,
              text: '여전히 아무 말도 하지 않는다.',
              nextChapterId: 6,
              emotionalImpact: { stress: 20, happiness: -10, confidence: -15, anxiety: 20 },
              message: '아무 말도 하지 않아 상황이 더 악화되었습니다.',
            },
          ],
        },
        {
          id: 5,
          text: '친구와의 관계가 회복되고, 문제가 해결되었습니다.',
          isEnding: true,
          choices: [],
        },
        {
          id: 6,
          text: '관계가 회복되지 않았고, 상황이 더욱 악화되었습니다.',
          isEnding: true,
          choices: [],
        },
      ],
};
