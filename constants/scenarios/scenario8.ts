import { Scenario } from '@/types/scenario';

export const scenario8: Scenario = {
  id: 8,
                title: '중요한 사람과의 관계에서 신뢰가 깨졌을 때',
                description: '친구나 연인의 배신으로 인해 신뢰가 깨진 상황에서, 어떻게 대처할 것인가?',
                chapters: [
                  {
                    id: 1,
                    text: '중요한 사람과의 관계에서 신뢰가 깨졌습니다. 상대방이 당신을 배신한 것 같습니다. 어떻게 하시겠습니까?',
                    choices: [
                      {
                        id: 1,
                        text: '상대방과 솔직하게 대화하며 문제를 해결한다.',
                        nextChapterId: 2,
                        emotionalImpact: { stress: -10, confidence: 10, happiness: 5, anxiety: -5 },
                        message: '상대방과의 솔직한 대화로 서로의 오해를 풀고 관계를 회복했습니다.',
                      },
                      {
                        id: 2,
                        text: '상대방과 거리를 두고 시간을 가지며 감정을 정리한다.',
                        nextChapterId: 3,
                        emotionalImpact: { stress: -5, confidence: 5, happiness: 0, anxiety: -5 },
                        message: '시간을 가지면서 감정을 정리하는 동안 마음의 평화를 찾습니다.',
                      },
                      {
                        id: 3,
                        text: '즉시 관계를 끊고 더 이상 교류하지 않는다.',
                        nextChapterId: 4,
                        emotionalImpact: { stress: 10, confidence: -5, happiness: -10, anxiety: 10 },
                        message: '관계를 끊고 상실감을 느끼지만 새로운 결심을 하게 됩니다.',
                      },
                    ],
                  },
                  {
                    id: 2,
                    text: '상대방과 솔직하게 대화를 나눈 후 관계가 회복되었습니다. 다음으로 어떻게 하시겠습니까?',
                    choices: [
                      {
                        id: 1,
                        text: '관계를 더 깊게 발전시키고 신뢰를 쌓는다.',
                        nextChapterId: 5,
                        emotionalImpact: { stress: -5, confidence: 10, happiness: 15, anxiety: -5 },
                        message: '관계가 더 발전하고 상호 신뢰가 깊어졌습니다.',
                      },
                      {
                        id: 2,
                        text: '상대방과의 관계를 서서히 유지하면서 거리를 둔다.',
                        nextChapterId: 6,
                        emotionalImpact: { stress: 0, confidence: 5, happiness: 5, anxiety: 0 },
                        message: '관계는 유지되었지만 거리를 두면서 조심스럽게 진행되고 있습니다.',
                      },
                    ],
                  },
                  {
                    id: 3,
                    text: '거리를 두고 시간을 가진 후 상대방과 다시 대화를 나눌 기회를 가졌습니다.',
                    choices: [
                      {
                        id: 1,
                        text: '상대방과 다시 만나 신뢰를 회복하려 노력한다.',
                        nextChapterId: 5,
                        emotionalImpact: { stress: -5, confidence: 10, happiness: 10, anxiety: -5 },
                        message: '시간이 흐르면서 서로를 이해하게 되었고, 신뢰를 회복했습니다.',
                      },
                      {
                        id: 2,
                        text: '관계를 끊기로 결정하고 새로운 사람을 찾는다.',
                        nextChapterId: 6,
                        emotionalImpact: { stress: 10, confidence: -5, happiness: -10, anxiety: 10 },
                        message: '관계를 완전히 끊고 새로운 삶을 시작하려 노력합니다.',
                      },
                    ],
                  },
                  {
                    id: 4,
                    text: '관계를 끊은 후 상실감이 커졌고, 혼자 남겨진 기분이 듭니다.',
                    choices: [
                      {
                        id: 1,
                        text: '시간을 가지며 혼자서 감정을 정리한다.',
                        nextChapterId: 5,
                        emotionalImpact: { stress: -10, confidence: 5, happiness: 0, anxiety: -5 },
                        message: '혼자만의 시간을 가지며 상실감을 극복하려 노력합니다.',
                      },
                      {
                        id: 2,
                        text: '친구나 가족과 시간을 보내며 위로를 받는다.',
                        nextChapterId: 6,
                        emotionalImpact: { stress: -5, confidence: 5, happiness: 5, anxiety: -5 },
                        message: '친구나 가족과의 시간을 통해 위로를 받고 안정을 되찾습니다.',
                      },
                    ],
                  },
                  {
                    id: 5,
                    text: '당신은 관계에서 신뢰를 회복하고, 서로의 이해와 배려를 통해 관계가 더욱 깊어졌습니다.',
                    isEnding: true,
                    choices: [],
                  },
                  {
                    id: 6,
                    text: '관계를 끊고 나서 새로운 시작을 준비 중이지만, 상실감이 여전히 남아있습니다.',
                    isEnding: true,
                    choices: [],
                  },
                ],
};
