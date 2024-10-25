import { Scenario } from '@/types/scenario';

export const scenario7: Scenario = {
  id: 7,
              title: '중대한 실수를 저질렀을 때',
              description: '업무에서 중대한 실수를 저지른 상황입니다. 어떻게 이 상황을 극복할 것인가?',
              chapters: [
                {
                  id: 1,
                  text: '당신은 업무에서 중대한 실수를 저질렀습니다. 어떻게 하시겠습니까?',
                  choices: [
                    {
                      id: 1,
                      text: '즉시 상사에게 보고하고 해결 방안을 찾는다.',
                      nextChapterId: 2,
                      emotionalImpact: { stress: -10, happiness: 5, confidence: 10, anxiety: -5 },
                      message: '상사에게 상황을 보고하고, 해결책을 모색합니다. 스트레스가 줄어들고 자신감이 회복됩니다.',
                    },
                    {
                      id: 2,
                      text: '스스로 해결하려고 노력한다.',
                      nextChapterId: 3,
                      emotionalImpact: { stress: 10, happiness: -5, confidence: -10, anxiety: 15 },
                      message: '혼자 해결하려고 노력했지만 문제는 더 악화되었습니다. 불안과 스트레스가 증가합니다.',
                    },
                    {
                      id: 3,
                      text: '실수를 숨기고 지나간다.',
                      nextChapterId: 4,
                      emotionalImpact: { stress: 20, happiness: -10, confidence: -15, anxiety: 20 },
                      message: '실수를 숨기고 넘기려고 했으나, 나중에 문제가 커져 책임이 더 크게 돌아옵니다. 불안과 스트레스가 극심해집니다.',
                    },
                  ],
                },
                {
                  id: 2,
                  text: '상사는 상황을 이해하고 해결책을 함께 모색합니다. 당신은 어떤 선택을 하시겠습니까?',
                  choices: [
                    {
                      id: 1,
                      text: '팀원들과 협력하여 문제를 해결한다.',
                      nextChapterId: 5,
                      emotionalImpact: { stress: -10, happiness: 10, confidence: 15, anxiety: -5 },
                      message: '팀원들과의 협력을 통해 문제를 해결하고 자신감이 크게 회복되었습니다.',
                    },
                    {
                      id: 2,
                      text: '향후 실수를 방지하기 위한 계획을 세운다.',
                      nextChapterId: 6,
                      emotionalImpact: { stress: -5, happiness: 5, confidence: 15, anxiety: -5 },
                      message: '실수를 방지하기 위한 계획을 세우며, 다시는 같은 문제가 발생하지 않도록 대비했습니다. 자신감이 높아졌습니다.',
                    },
                  ],
                },
                {
                  id: 3,
                  text: '문제를 해결하지 못해 상황이 악화되었습니다. 어떻게 하시겠습니까?',
                  choices: [
                    {
                      id: 1,
                      text: '늦었지만 상사에게 보고한다.',
                      nextChapterId: 7,
                      emotionalImpact: { stress: 10, happiness: -5, confidence: -10, anxiety: 15 },
                      message: '늦게나마 상사에게 보고했지만 상황이 많이 악화되어 스트레스가 지속됩니다.',
                    },
                    {
                      id: 2,
                      text: '계속해서 혼자 해결하려고 한다.',
                      nextChapterId: 8,
                      emotionalImpact: { stress: 20, happiness: -15, confidence: -20, anxiety: 20 },
                      message: '혼자 해결하려는 시도가 실패하여, 문제는 더욱 악화되었습니다. 스트레스와 불안이 극심합니다.',
                    },
                  ],
                },
                {
                  id: 4,
                  text: '실수가 드러나 회사에 큰 피해가 발생했습니다. 어떻게 하시겠습니까?',
                  choices: [
                    {
                      id: 1,
                      text: '책임을 인정하고 사과한다.',
                      nextChapterId: 7,
                      emotionalImpact: { stress: 15, happiness: -10, confidence: -10, anxiety: 20 },
                      message: '책임을 인정했으나 회사에 큰 피해가 발생하여 스트레스와 불안이 증가합니다.',
                    },
                    {
                      id: 2,
                      text: '책임을 회피하고 변명한다.',
                      nextChapterId: 8,
                      emotionalImpact: { stress: 20, happiness: -15, confidence: -20, anxiety: 25 },
                      message: '책임을 회피했으나, 문제가 더 커지고 신뢰를 잃습니다. 불안과 스트레스가 매우 심각해집니다.',
                    },
                  ],
                },
                {
                  id: 5,
                  text: '팀과 협력하여 문제를 해결하고, 업무 성과가 크게 향상되었습니다.',
                  isEnding: true,
                  choices: [],
                },
                {
                  id: 6,
                  text: '실수를 방지하기 위한 계획을 세우고, 다시는 같은 실수를 하지 않겠다고 결심했습니다.',
                  isEnding: true,
                  choices: [],
                },
                {
                  id: 7,
                  text: '늦게 보고한 것에 대한 후회가 남지만, 문제는 해결되었습니다.',
                  isEnding: true,
                  choices: [],
                },
                {
                  id: 8,
                  text: '책임 회피와 잘못된 선택으로 인해 신뢰를 잃고 큰 손실을 보았습니다.',
                  isEnding: true,
                  choices: [],
                },
              ],
};
