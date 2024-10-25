import { Scenario } from '@/types/scenario';

export const scenario6: Scenario = {
  id: 6,
            title: '업무에서 성과를 인정받지 못했을 때',
            description: '노력에 대한 보상 없이 성과가 인정받지 못한 상황입니다. 어떻게 대처할 것인가?',
            chapters: [
              {
                id: 1,
                text: '열심히 일했지만 성과를 인정받지 못했습니다. 어떻게 하시겠습니까?',
                choices: [
                  {
                    id: 1,
                    text: '상사에게 피드백을 요청한다.',
                    nextChapterId: 2,
                    emotionalImpact: { stress: -10, happiness: 5, confidence: 10, anxiety: -5 },
                    message: '상사에게 피드백을 요청하여 주인공의 성과가 인식되기 시작했습니다. 조금 더 자신감이 생깁니다.',
                  },
                  {
                    id: 2,
                    text: '더 노력하여 다음 기회를 노린다.',
                    nextChapterId: 3,
                    emotionalImpact: { stress: -5, happiness: 5, confidence: 15, anxiety: -5 },
                    message: '노력을 계속해서 다음 기회를 준비합니다. 성과가 인정받을 가능성이 커졌습니다.',
                  },
                  {
                    id: 3,
                    text: '포기하고 이직을 고려한다.',
                    nextChapterId: 4,
                    emotionalImpact: { stress: 10, happiness: -10, confidence: -5, anxiety: 15 },
                    message: '현재 상황에 실망하여 이직을 고려하며 스트레스가 증가했습니다.',
                  },
                ],
              },
              {
                id: 2,
                text: '상사는 당신의 노력을 인지하지 못했다고 합니다. 어떻게 하시겠습니까?',
                choices: [
                  {
                    id: 1,
                    text: '자신의 성과를 정리하여 보고한다.',
                    nextChapterId: 5,
                    emotionalImpact: { stress: -10, happiness: 10, confidence: 15, anxiety: -10 },
                    message: '자신의 성과를 체계적으로 보고한 결과, 상사는 주인공의 노력을 인정하고 보상할 계획을 세웁니다.',
                  },
                  {
                    id: 2,
                    text: '팀과의 협업을 강화한다.',
                    nextChapterId: 6,
                    emotionalImpact: { stress: -5, happiness: 5, confidence: 10, anxiety: -5 },
                    message: '팀원들과 협업하여 긍정적인 업무 환경을 만들고, 성과를 다시 올릴 기회를 찾습니다.',
                  },
                ],
              },
              {
                id: 3,
                text: '자신을 격려하며 성장을 위한 노력을 이어나갑니다. 어떤 방법을 선택하겠습니까?',
                choices: [
                  {
                    id: 1,
                    text: '추가적인 교육이나 자격증을 취득한다.',
                    nextChapterId: 5,
                    emotionalImpact: { stress: -10, happiness: 15, confidence: 20, anxiety: -10 },
                    message: '추가적인 자격증을 취득하여 자신감을 얻고, 성과를 인정받을 가능성이 커졌습니다.',
                  },
                  {
                    id: 2,
                    text: '새로운 프로젝트를 자발적으로 맡는다.',
                    nextChapterId: 6,
                    emotionalImpact: { stress: -5, happiness: 10, confidence: 15, anxiety: -5 },
                    message: '새로운 프로젝트를 맡아 성과를 낼 수 있는 기회를 잡았습니다. 팀의 신뢰를 얻고 있습니다.',
                  },
                ],
              },
              {
                id: 4,
                text: '이직을 고려하며 어떻게 하시겠습니까?',
                choices: [
                  {
                    id: 1,
                    text: '이력서를 업데이트하고 구직 활동을 시작한다.',
                    nextChapterId: 7,
                    emotionalImpact: { stress: 10, happiness: -10, confidence: -10, anxiety: 15 },
                    message: '이직을 준비하면서 불안감과 스트레스가 증가했습니다. 현재 직장에서 성과를 인정받지 못한 실망이 커집니다.',
                  },
                  {
                    id: 2,
                    text: '현재 직장에서의 문제를 해결하려고 노력한다.',
                    nextChapterId: 6,
                    emotionalImpact: { stress: -5, happiness: 5, confidence: 10, anxiety: -5 },
                    message: '문제를 해결하기 위해 상사와 팀과 협력하여 다시 성과를 올릴 기회를 찾고 있습니다.',
                  },
                ],
              },
              {
                id: 5,
                text: '성과가 인정받고, 업무에 대한 만족감이 높아졌습니다.',
                isEnding: true,
                choices: [],
              },
              {
                id: 6,
                text: '팀원들과 협업을 통해 성과를 높이고, 다시 성과를 인정받을 수 있게 되었습니다.',
                isEnding: true,
                choices: [],
              },
              {
                id: 7,
                text: '이직을 결정했으나 새로운 직장을 찾는 과정에서 스트레스가 쌓입니다.',
                isEnding: true,
                choices: [],
              },
            ],
};
