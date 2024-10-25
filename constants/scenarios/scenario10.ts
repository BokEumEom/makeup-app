import { Scenario } from '@/types/scenario';

export const scenario10: Scenario = {
  id: 10,
                    title: '이별 후 마음의 치유',
                    description: '갑작스러운 이별 후 슬픔과 배신감을 느끼는 상황입니다. 어떻게 감정을 정리할 것인가?',
                    chapters: [
                      {
                        id: 1,
                        text: '연인과의 갑작스러운 이별로 슬픔과 배신감을 느끼고 있습니다. 어떻게 대처하시겠습니까?',
                        choices: [
                          {
                            id: 1,
                            text: '혼자만의 시간을 가지며 감정을 정리한다.',
                            nextChapterId: 2,
                            emotionalImpact: { stress: -10, confidence: 15, happiness: 10, anxiety: -5 },
                            message: '스스로를 돌보며 감정을 정리하는 시간을 가지며, 차분함과 자기 회복을 느낍니다.',
                          },
                          {
                            id: 2,
                            text: '친구들과 시간을 보내며 위로를 받는다.',
                            nextChapterId: 3,
                            emotionalImpact: { stress: -15, confidence: 10, happiness: 15, anxiety: -10 },
                            message: '친구들의 위로와 함께 시간을 보내며 감정적인 안정감을 되찾습니다.',
                          },
                          {
                            id: 3,
                            text: '연인에게 다시 연락하여 재회를 요청한다.',
                            nextChapterId: 4,
                            emotionalImpact: { stress: 20, confidence: -10, happiness: -20, anxiety: 20 },
                            message: '연인에게 다시 연락을 시도했지만 응답을 받지 못하거나, 관계가 회복되지 않아 상처가 더욱 깊어집니다.',
                          },
                        ],
                      },
                      {
                        id: 2,
                        text: '감정을 정리한 후, 자신을 돌보며 마음의 평화를 찾고 있습니다.',
                        choices: [
                          {
                            id: 1,
                            text: '새로운 취미를 시작해 더 많은 시간을 나에게 쏟는다.',
                            nextChapterId: 5,
                            emotionalImpact: { stress: -10, confidence: 15, happiness: 20, anxiety: -5 },
                            message: '새로운 취미 활동을 시작하며 자신에게 집중하고, 즐거움과 활력을 되찾습니다.',
                          },
                          {
                            id: 2,
                            text: '개인적인 발전에 집중하며 자신감을 키운다.',
                            nextChapterId: 6,
                            emotionalImpact: { stress: -5, confidence: 20, happiness: 15, anxiety: -10 },
                            message: '자기 계발에 집중하며 자존감과 자신감을 회복하고, 성장하는 기회를 찾습니다.',
                          },
                        ],
                      },
                      {
                        id: 3,
                        text: '친구들과의 시간 속에서 위로를 받으며 감정적으로 안정되었습니다.',
                        choices: [
                          {
                            id: 1,
                            text: '다시 사회적인 활동을 시작하며 새로운 사람들과 만남을 추구한다.',
                            nextChapterId: 5,
                            emotionalImpact: { stress: -10, confidence: 10, happiness: 20, anxiety: -5 },
                            message: '사회적 관계를 넓히며 새로운 만남을 통해 감정적으로 치유되고 있습니다.',
                          },
                          {
                            id: 2,
                            text: '여행을 떠나 혼자만의 시간을 보내며 자신을 되돌아본다.',
                            nextChapterId: 6,
                            emotionalImpact: { stress: -15, confidence: 15, happiness: 15, anxiety: -10 },
                            message: '여행을 통해 스스로를 되돌아보며 감정적인 치유와 안정을 찾습니다.',
                          },
                        ],
                      },
                      {
                        id: 4,
                        text: '재회를 시도했지만, 오히려 상처가 깊어졌습니다. 어떻게 하시겠습니까?',
                        choices: [
                          {
                            id: 1,
                            text: '시간을 두고 감정을 천천히 정리한다.',
                            nextChapterId: 5,
                            emotionalImpact: { stress: -10, confidence: 10, happiness: 5, anxiety: -10 },
                            message: '시간을 두고 스스로를 치유하며 감정을 차분하게 정리하고 있습니다.',
                          },
                          {
                            id: 2,
                            text: '모든 것을 포기하고 무기력하게 지낸다.',
                            nextChapterId: 6,
                            emotionalImpact: { stress: 20, confidence: -20, happiness: -20, anxiety: 20 },
                            message: '감정을 정리하지 못한 채 무기력함 속에서 더 큰 고통을 느끼고 있습니다.',
                          },
                        ],
                      },
                      {
                        id: 5,
                        text: '감정적으로 치유가 이루어졌으며, 앞으로 나아갈 준비가 되었습니다.',
                        isEnding: true,
                        choices: [],
                      },
                      {
                        id: 6,
                        text: '감정을 제대로 정리하지 못해 무기력함 속에 빠져 있습니다.',
                        isEnding: true,
                        choices: [],
                      },
                    ],
};
