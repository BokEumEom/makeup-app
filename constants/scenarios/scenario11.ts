import { Scenario } from '@/types/scenario';

export const scenario11: Scenario = {
    id: 11,
    title: '부당한 지시와 상사와의 갈등 해결',
    description: '상사로부터 부당한 업무 지시를 받았을 때, 어떻게 대처할 것인가?',
    chapters: [
      {
        id: 1,
        text: '상사가 비현실적인 업무 목표를 지시했습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '상사에게 솔직하게 의견을 전달한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, confidence: 15, happiness: 10, anxiety: -5 },
            message: '상사는 당신의 의견을 듣고 목표를 조정하기로 했습니다. 업무 목표가 현실적으로 조정되었습니다.',
          },
          {
            id: 2,
            text: '팀원들과 함께 대안을 마련해 상사에게 제안한다.',
            nextChapterId: 3,
            emotionalImpact: { stress: -5, confidence: 10, happiness: 10, anxiety: -5 },
            message: '팀원들과 함께 준비한 대안을 상사에게 제안했으며, 상사는 이를 긍정적으로 검토하고 있습니다.',
          },
          {
            id: 3,
            text: '지시에 따르고 개인적으로 부담을 감수한다.',
            nextChapterId: 4,
            emotionalImpact: { stress: 15, confidence: -10, happiness: -10, anxiety: 10 },
            message: '당신은 상사의 지시에 따라 일을 진행했지만, 부담이 크게 느껴집니다.',
          },
        ],
      },
      {
        id: 2,
        text: '상사가 당신의 의견을 받아들여 업무 목표를 조정했습니다. 이제 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '새로운 목표에 맞춰 계획을 세운다.',
            nextChapterId: 5,
            emotionalImpact: { stress: -5, confidence: 15, happiness: 15, anxiety: -5 },
            message: '새로운 목표에 맞춰 세운 계획이 순조롭게 진행되고 있습니다.',
          },
          {
            id: 2,
            text: '팀원들과 함께 목표를 공유하고 협력한다.',
            nextChapterId: 6,
            emotionalImpact: { stress: -10, confidence: 20, happiness: 20, anxiety: -10 },
            message: '팀원들과 함께 목표를 공유하며 협력하여, 성공적으로 업무를 진행하고 있습니다.',
          },
        ],
      },
      {
        id: 3,
        text: '상사가 당신의 대안을 듣고 일부 수정하지만, 근본적인 문제는 해결되지 않았습니다.',
        choices: [
          {
            id: 1,
            text: '다시 상사와 대화를 시도한다.',
            nextChapterId: 5,
            emotionalImpact: { stress: -5, confidence: 5, happiness: 5, anxiety: -5 },
            message: '상사와 다시 대화를 시도하여, 일부 문제를 더 해결할 수 있었습니다.',
          },
          {
            id: 2,
            text: '팀원들과 협력하여 문제를 자체적으로 해결한다.',
            nextChapterId: 6,
            emotionalImpact: { stress: -5, confidence: 10, happiness: 10, anxiety: -5 },
            message: '팀원들과 협력하여 문제를 해결하고 업무를 원활하게 진행했습니다.',
          },
        ],
      },
      {
        id: 4,
        text: '상사의 지시에 따라 업무를 진행했으나, 업무 부담이 커져 스트레스가 점점 쌓입니다.',
        choices: [
          {
            id: 1,
            text: '상사에게 다시 의견을 전달하고 조정을 요청한다.',
            nextChapterId: 5,
            emotionalImpact: { stress: -10, confidence: 10, happiness: 5, anxiety: -5 },
            message: '상사와의 추가 대화로 일부 업무 부담이 줄어들었지만, 여전히 해결되지 않은 부분이 남아 있습니다.',
          },
          {
            id: 2,
            text: '그냥 계속해서 업무를 진행한다.',
            nextChapterId: 6,
            emotionalImpact: { stress: 15, confidence: -10, happiness: -10, anxiety: 10 },
            message: '업무를 계속 진행했지만, 점점 더 스트레스와 피로가 누적되고 있습니다.',
          },
        ],
      },
      {
        id: 5,
        text: '상사와의 대화 후, 업무 목표가 현실적으로 조정되었고, 프로젝트가 순조롭게 진행되고 있습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 6,
        text: '업무 부담이 너무 커졌고, 결국 과도한 스트레스로 인해 건강에 문제가 생기기 시작했습니다.',
        isEnding: true,
        choices: [],
      },
    ],
};
