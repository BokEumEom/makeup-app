import { Scenario } from '@/types/scenario';

export const scenario12: Scenario = {
  id: 12,
                        title: '친구와의 관계 회복',
                        description: '오해로 인해 친구와 멀어진 상황에서 관계를 회복하는 방법을 선택해야 합니다.',
                        chapters: [
                          {
                            id: 1,
                            text: '친구와 오해가 생겨 관계가 소원해졌습니다. 어떻게 하시겠습니까?',
                            choices: [
                              {
                                id: 1,
                                text: '친구에게 연락하여 오해를 풀기 위해 대화한다.',
                                nextChapterId: 2,
                                emotionalImpact: { stress: -10, confidence: 10, happiness: 15, anxiety: -5 },
                                message: '친구는 당신의 진심을 이해하고 오해가 풀리기 시작했습니다. 관계가 회복될 가능성이 보입니다.',
                              },
                              {
                                id: 2,
                                text: '시간을 두고 친구와의 거리를 유지한다.',
                                nextChapterId: 3,
                                emotionalImpact: { stress: 5, confidence: -5, happiness: -5, anxiety: 5 },
                                message: '시간을 두었지만 관계는 여전히 어색합니다. 갈등 해결에 큰 진전이 없습니다.',
                              },
                              {
                                id: 3,
                                text: '공통 친구에게 중재를 부탁한다.',
                                nextChapterId: 4,
                                emotionalImpact: { stress: -5, confidence: 5, happiness: 10, anxiety: -5 },
                                message: '공통 친구의 도움으로 대화가 이어졌습니다. 갈등 해결에 긍정적인 변화가 있습니다.',
                              },
                            ],
                          },
                          {
                            id: 2,
                            text: '친구는 대화에 응하며 관계를 회복할 의향을 보였습니다. 다음으로 어떻게 하시겠습니까?',
                            choices: [
                              {
                                id: 1,
                                text: '진심으로 사과하고 오해를 풀기 위한 대화를 계속 이어간다.',
                                nextChapterId: 5,
                                emotionalImpact: { stress: -10, confidence: 15, happiness: 20, anxiety: -5 },
                                message: '당신의 사과와 진심 어린 대화로 친구와의 관계가 회복되었습니다. 서로 이해하게 되었습니다.',
                              },
                              {
                                id: 2,
                                text: '대화를 멈추고 다시 한번 시간을 두어본다.',
                                nextChapterId: 6,
                                emotionalImpact: { stress: 5, confidence: -5, happiness: -10, anxiety: 5 },
                                message: '시간이 지나도 관계는 여전히 어색합니다. 다시 다가가기 어렵습니다.',
                              },
                            ],
                          },
                          {
                            id: 3,
                            text: '친구와의 거리감을 유지하는 동안 갈등이 계속되고 있습니다.',
                            choices: [
                              {
                                id: 1,
                                text: '결국 친구에게 먼저 연락해보며 대화를 시도한다.',
                                nextChapterId: 5,
                                emotionalImpact: { stress: -5, confidence: 10, happiness: 15, anxiety: -5 },
                                message: '친구는 당신의 연락을 받았고 대화가 진행됩니다. 갈등 해결의 실마리를 찾았습니다.',
                              },
                              {
                                id: 2,
                                text: '아무런 행동도 하지 않고 기다린다.',
                                nextChapterId: 6,
                                emotionalImpact: { stress: 10, confidence: -10, happiness: -10, anxiety: 10 },
                                message: '시간이 지남에 따라 관계는 더 소원해지고 멀어졌습니다.',
                              },
                            ],
                          },
                          {
                            id: 4,
                            text: '공통 친구의 중재로 인해 친구와의 대화가 시작되었습니다.',
                            choices: [
                              {
                                id: 1,
                                text: '대화를 통해 친구의 감정을 이해하고 사과한다.',
                                nextChapterId: 5,
                                emotionalImpact: { stress: -10, confidence: 10, happiness: 20, anxiety: -5 },
                                message: '서로의 감정을 이해하며 관계가 회복되었습니다.',
                              },
                              {
                                id: 2,
                                text: '대화를 멈추고 더 이상 관계를 유지하지 않는다.',
                                nextChapterId: 6,
                                emotionalImpact: { stress: 5, confidence: -10, happiness: -10, anxiety: 5 },
                                message: '관계를 회복하지 못하고 서로의 거리는 더 멀어졌습니다.',
                              },
                            ],
                          },
                          {
                            id: 5,
                            text: '친구와의 관계가 회복되었습니다. 오해가 풀리고 더 깊은 이해가 생겼습니다.',
                            isEnding: true,
                            choices: [],
                          },
                          {
                            id: 6,
                            text: '친구와의 관계는 여전히 회복되지 않았습니다. 갈등이 해결되지 않고 더 멀어졌습니다.',
                            isEnding: true,
                            choices: [],
                          },
                        ],
};
