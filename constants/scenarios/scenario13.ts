import { Scenario } from '@/types/scenario';

export const scenario13: Scenario = {
  id: 13,
  title: '새로운 도시에 이사한 후 외로움을 느낄 때',
  description: '새로운 도시에 이사한 후 외로움을 느끼는 상황에서 어떻게 사회적 관계를 형성하고 적응할지 선택해야 합니다.',
  chapters: [
    {
      id: 1,
      text: '새로운 도시에 이사했지만 외로움을 느끼고 있습니다. 어떻게 하시겠습니까?',
      choices: [
        {
          id: 1,
          text: '지역 모임이나 동호회에 가입한다.',
          nextChapterId: 2,
          emotionalImpact: { stress: -10, confidence: 10, happiness: 15, anxiety: -5 },
          message: '지역 모임에서 새로운 사람들과 친해지며 외로움을 해소하고 긍정적인 에너지를 얻습니다.',
        },
        {
          id: 2,
          text: '직장 동료들과 가까워지기 위해 노력을 기울인다.',
          nextChapterId: 3,
          emotionalImpact: { stress: -5, confidence: 5, happiness: 10, anxiety: -5 },
          message: '직장 동료들과 더 친해져 직장 생활이 즐거워지고 외로움이 조금씩 해소됩니다.',
        },
        {
          id: 3,
          text: '혼자 시간을 보내며 적응해 나간다.',
          nextChapterId: 4,
          emotionalImpact: { stress: 5, confidence: -5, happiness: -10, anxiety: 10 },
          message: '혼자 보내는 시간이 많아지면서 외로움이 커지고 적응에 어려움을 느낍니다.',
        },
      ],
    },
    {
      id: 2,
      text: '새로운 사람들과의 관계가 형성되었습니다. 계속해서 어떻게 하시겠습니까?',
      choices: [
        {
          id: 1,
          text: '지역 모임을 꾸준히 참석하며 사회적 관계를 강화한다.',
          nextChapterId: 5,
          emotionalImpact: { stress: -10, confidence: 15, happiness: 20, anxiety: -5 },
          message: '모임을 통해 다양한 사람들과 친해지며 즐거운 시간을 보내고 외로움이 완전히 해소됩니다.',
        },
        {
          id: 2,
          text: '새로운 친구들과 더 깊은 관계를 쌓기 위해 개별적으로 만난다.',
          nextChapterId: 5,
          emotionalImpact: { stress: -5, confidence: 10, happiness: 15, anxiety: -5 },
          message: '개별적으로 만나면서 더욱 깊은 관계를 맺고 외로움이 점차 사라집니다.',
        },
      ],
    },
    {
      id: 3,
      text: '직장 동료들과의 관계가 개선되었습니다. 외로움은 조금씩 해소되고 있습니다. 계속해서 어떻게 하시겠습니까?',
      choices: [
        {
          id: 1,
          text: '동료들과 사적인 시간을 보내며 더 가까워진다.',
          nextChapterId: 5,
          emotionalImpact: { stress: -5, confidence: 10, happiness: 15, anxiety: -5 },
          message: '동료들과 더 많은 사적인 시간을 보내며 우정을 쌓고 외로움을 해소합니다.',
        },
        {
          id: 2,
          text: '직장 외부에서도 새로운 인맥을 넓혀본다.',
          nextChapterId: 5,
          emotionalImpact: { stress: -10, confidence: 15, happiness: 20, anxiety: -5 },
          message: '직장 외부에서도 새로운 사람들을 만나 외로움을 극복하고 사회적 관계가 풍부해집니다.',
        },
      ],
    },
    {
      id: 4,
      text: '혼자 시간을 보내며 적응하는 동안 외로움이 더 심해졌습니다. 어떻게 하시겠습니까?',
      choices: [
        {
          id: 1,
          text: '혼자 보내는 시간을 줄이고 사회적 활동을 시작한다.',
          nextChapterId: 5,
          emotionalImpact: { stress: -10, confidence: 10, happiness: 15, anxiety: -5 },
          message: '사회적 활동을 시작하면서 외로움이 점차 해소되고 마음의 평화를 찾습니다.',
        },
        {
          id: 2,
          text: '여전히 혼자 지내며 적응을 기다린다.',
          nextChapterId: 6,
          emotionalImpact: { stress: 10, confidence: -10, happiness: -15, anxiety: 10 },
          message: '혼자 시간을 보내는 것이 계속되면서 외로움과 우울감이 더 심해졌습니다.',
        },
      ],
    },
    {
      id: 5,
      text: '사회적 관계를 형성하고 외로움을 극복했습니다. 이제 새로운 환경에 완전히 적응했습니다.',
      isEnding: true,
      choices: [],
    },
    {
      id: 6,
      text: '외로움이 해소되지 않았고 우울감이 커졌습니다. 새로운 사람들과 관계를 맺지 못한 채 힘든 시간을 보내고 있습니다.',
      isEnding: true,
      choices: [],
    },
  ],
};
