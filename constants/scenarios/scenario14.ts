import { Scenario } from '@/types/scenario';

export const scenario14: Scenario = {
  id: 14,
  title: '모르는 사람에게 도움을 요청받았을 때',
  description: '길을 가던 중 모르는 사람이 도움을 요청하는 상황입니다. 이때 어떻게 대처할 것인지 선택합니다.',
  chapters: [
    {
      id: 1,
      text: '길을 가던 중 낯선 사람이 도움을 요청합니다. 어떻게 하시겠습니까?',
      choices: [
        {
          id: 1,
          text: '도와주기로 결심하고 필요한 도움을 제공한다.',
          nextChapterId: 2,
          emotionalImpact: { stress: -5, confidence: 10, happiness: 15, anxiety: -5 },
          message: '도움을 주었고 상대방은 매우 감사해했습니다. 자신감이 상승하고 기분이 좋아졌습니다.',
        },
        {
          id: 2,
          text: '정중하게 거절한다.',
          nextChapterId: 3,
          emotionalImpact: { stress: 0, confidence: 5, happiness: 5, anxiety: 0 },
          message: '정중하게 거절했으며 상대방도 이해했습니다. 크게 기분이 나빠지지 않았습니다.',
        },
        {
          id: 3,
          text: '무시하고 그냥 지나간다.',
          nextChapterId: 4,
          emotionalImpact: { stress: 5, confidence: -5, happiness: -10, anxiety: 10 },
          message: '그냥 지나쳤지만 마음에 불편함이 남고 스트레스가 조금 증가했습니다.',
        },
      ],
    },
    {
      id: 2,
      text: '도움을 준 후 상대방이 매우 고마워하고 기분이 좋아졌습니다. 그 후 어떻게 하시겠습니까?',
      choices: [
        {
          id: 1,
          text: '도움받은 사람과 잠시 이야기를 나눈다.',
          nextChapterId: 5,
          emotionalImpact: { stress: -10, confidence: 15, happiness: 20, anxiety: -10 },
          message: '상대방과 대화를 나누며 친밀감을 느끼고 새로운 인연을 형성했습니다.',
        },
        {
          id: 2,
          text: '도움만 주고 길을 떠난다.',
          nextChapterId: 5,
          emotionalImpact: { stress: -5, confidence: 10, happiness: 10, anxiety: -5 },
          message: '도움만 주고 헤어졌으며, 자신이 한 선행에 만족감을 느꼈습니다.',
        },
      ],
    },
    {
      id: 3,
      text: '정중하게 거절한 후에도 상대방이 계속 도움을 요청합니다. 어떻게 하시겠습니까?',
      choices: [
        {
          id: 1,
          text: '마음을 바꾸고 도와주기로 한다.',
          nextChapterId: 5,
          emotionalImpact: { stress: -5, confidence: 10, happiness: 15, anxiety: -5 },
          message: '결국 도움을 주었고 기분이 좋아졌습니다. 상황이 잘 마무리되었습니다.',
        },
        {
          id: 2,
          text: '계속해서 거절하고 자리를 떠난다.',
          nextChapterId: 6,
          emotionalImpact: { stress: 10, confidence: -10, happiness: -10, anxiety: 10 },
          message: '계속 거절했지만 불편한 마음이 남아 기분이 나빠졌습니다.',
        },
      ],
    },
    {
      id: 4,
      text: '도움을 무시한 후에도 계속해서 마음에 불편함이 남아 있습니다. 어떻게 하시겠습니까?',
      choices: [
        {
          id: 1,
          text: '후회하며 다시 돌아가 도와준다.',
          nextChapterId: 5,
          emotionalImpact: { stress: -5, confidence: 10, happiness: 10, anxiety: -5 },
          message: '다시 돌아가 도움을 주었고 기분이 좋아졌습니다. 후회가 사라졌습니다.',
        },
        {
          id: 2,
          text: '계속 무시하고 마음을 정리한다.',
          nextChapterId: 6,
          emotionalImpact: { stress: 10, confidence: -10, happiness: -10, anxiety: 10 },
          message: '결국 도움을 주지 않았고 기분이 나빠지며 스트레스가 계속 남았습니다.',
        },
      ],
    },
    {
      id: 5,
      text: '도움을 주며 좋은 경험을 하였습니다. 만족감과 자신감이 상승했습니다.',
      isEnding: true,
      choices: [],
    },
    {
      id: 6,
      text: '도움을 주지 않아 불편한 감정과 스트레스가 남아 있습니다.',
      isEnding: true,
      choices: [],
    },
  ],
};
