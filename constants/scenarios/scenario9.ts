import { Scenario } from '@/types/scenario';

export const scenario9: Scenario = {
  id: 9,
                  title: '낯선 도시에서 길을 잃었을 때',
                  description: '낯선 도시에서 혼자 길을 잃은 상황입니다. 어떻게 대처할 것인가?',
                  chapters: [
                    {
                      id: 1,
                      text: '낯선 도시에서 길을 잃었습니다. 주변 환경이 낯설고, 당신은 혼란스러워합니다. 어떻게 하시겠습니까?',
                      choices: [
                        {
                          id: 1,
                          text: '현지인에게 도움을 요청한다.',
                          nextChapterId: 2,
                          emotionalImpact: { stress: -10, confidence: 10, happiness: 15, anxiety: -5 },
                          message: '현지인의 도움을 받아 길을 찾았고, 친절함에 기분이 좋아졌습니다.',
                        },
                        {
                          id: 2,
                          text: '기억을 되짚으며 스스로 길을 찾는다.',
                          nextChapterId: 3,
                          emotionalImpact: { stress: -5, confidence: 15, happiness: 10, anxiety: -5 },
                          message: '혼자서 길을 찾으며 자신감이 상승하고 성취감을 느낍니다.',
                        },
                        {
                          id: 3,
                          text: '무작정 걸으며 길을 찾는다.',
                          nextChapterId: 4,
                          emotionalImpact: { stress: 15, confidence: -10, happiness: -10, anxiety: 20 },
                          message: '길을 찾지 못하고 불안감과 스트레스가 증가합니다.',
                        },
                      ],
                    },
                    {
                      id: 2,
                      text: '현지인의 도움을 받아 길을 찾았고, 좋은 인연을 맺게 되었습니다.',
                      choices: [
                        {
                          id: 1,
                          text: '현지인과 함께 새로운 장소를 탐험한다.',
                          nextChapterId: 5,
                          emotionalImpact: { stress: -15, confidence: 10, happiness: 20, anxiety: -5 },
                          message: '현지인의 도움으로 예상치 못한 모험을 즐기며 새로운 친구를 사귀었습니다.',
                        },
                        {
                          id: 2,
                          text: '원래 목적지로 돌아간다.',
                          nextChapterId: 6,
                          emotionalImpact: { stress: -5, confidence: 5, happiness: 10, anxiety: -10 },
                          message: '원래 가고자 했던 목적지에 무사히 도착했으며, 안도감을 느낍니다.',
                        },
                      ],
                    },
                    {
                      id: 3,
                      text: '혼자서 길을 찾았으며, 자신감이 생기고 새로운 도전에 대한 준비가 되었습니다.',
                      choices: [
                        {
                          id: 1,
                          text: '도시에 대한 더 많은 정보를 찾아 탐험을 이어간다.',
                          nextChapterId: 5,
                          emotionalImpact: { stress: -10, confidence: 15, happiness: 15, anxiety: -5 },
                          message: '자신의 힘으로 길을 찾은 후, 더 많은 장소를 탐험하며 즐거움을 느낍니다.',
                        },
                        {
                          id: 2,
                          text: '계획을 조정하고 숙소로 돌아간다.',
                          nextChapterId: 6,
                          emotionalImpact: { stress: -5, confidence: 10, happiness: 10, anxiety: -5 },
                          message: '무리하지 않고 휴식을 취하기로 결심하며 안도감을 느낍니다.',
                        },
                      ],
                    },
                    {
                      id: 4,
                      text: '길을 잃고 무작정 걸어가다가 점점 더 지치고 혼란스러워졌습니다.',
                      choices: [
                        {
                          id: 1,
                          text: '도움을 요청하기로 결심한다.',
                          nextChapterId: 5,
                          emotionalImpact: { stress: -10, confidence: -5, happiness: 5, anxiety: -5 },
                          message: '결국 도움을 요청해 길을 찾았고, 늦게나마 안정감을 찾았습니다.',
                        },
                        {
                          id: 2,
                          text: '계속 혼자서 길을 찾으려 한다.',
                          nextChapterId: 6,
                          emotionalImpact: { stress: 20, confidence: -15, happiness: -20, anxiety: 20 },
                          message: '혼자 길을 찾으려 하다가 더욱 길을 잃고 불안감과 스트레스가 극대화되었습니다.',
                        },
                      ],
                    },
                    {
                      id: 5,
                      text: '새로운 사람들과의 만남이나 혼자서 길을 찾는 경험을 통해 자신감과 행복감을 되찾았습니다.',
                      isEnding: true,
                      choices: [],
                    },
                    {
                      id: 6,
                      text: '혼자 길을 찾으려다 점점 지치고 스트레스를 많이 받았습니다.',
                      isEnding: true,
                      choices: [],
                    },
                  ],
};
