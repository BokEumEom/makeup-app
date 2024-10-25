import { Scenario } from '@/types/scenario';

export const scenario4: Scenario = {
  id: 4,
        title: '새로운 팀 리더로서의 첫날',
        description: '당신은 새로운 팀의 리더로 임명되었습니다. 팀원들은 당신을 경계하는 것 같습니다. 어떻게 하시겠습니까?',
        chapters: [
          {
            id: 1,
            text: '당신은 새로운 팀의 리더로 임명되었습니다. 팀원들은 당신을 경계하는 것 같습니다. 어떻게 하시겠습니까?',
            choices: [
              {
                id: 1,
                text: '팀원들과 개별 면담을 통해 소통한다.',
                nextChapterId: 2,
                emotionalImpact: { stress: -10, happiness: 10, confidence: 10, anxiety: -5 },
                message: '팀원들과의 개별 면담을 통해 소통하며 팀원들이 당신에게 마음을 열기 시작했습니다.',
              },
              {
                id: 2,
                text: '팀에게 새로운 목표를 제시한다.',
                nextChapterId: 3,
                emotionalImpact: { stress: 5, happiness: -5, confidence: 5, anxiety: 5 },
                message: '팀원들에게 새로운 목표를 제시했지만 부담을 느끼고 있습니다.',
              },
              {
                id: 3,
                text: '팀원들의 태도를 무시하고 업무에 집중한다.',
                nextChapterId: 4,
                emotionalImpact: { stress: 10, happiness: -10, confidence: -5, anxiety: 10 },
                message: '팀원들의 태도를 무시하고 업무에 집중했지만, 성과가 저조해지고 있습니다.',
              },
            ],
          },
          {
            id: 2,
            text: '팀원들은 당신에게 호의적으로 변했습니다. 다음으로 어떻게 하시겠습니까?',
            choices: [
              {
                id: 1,
                text: '팀워크를 강화하기 위한 활동을 계획한다.',
                nextChapterId: 5,
                emotionalImpact: { stress: -5, happiness: 15, confidence: 10, anxiety: -5 },
                message: '팀워크를 강화하는 활동을 통해 팀의 사기가 높아졌습니다.',
              },
              {
                id: 2,
                text: '업무 프로세스를 개선한다.',
                nextChapterId: 6,
                emotionalImpact: { stress: 0, happiness: 5, confidence: 5, anxiety: 0 },
                message: '업무 프로세스를 개선했지만, 팀원들이 이를 따르는 데에 어려움을 느낍니다.',
              },
            ],
          },
          {
            id: 3,
            text: '팀원들은 부담을 느끼고 있습니다. 어떻게 하시겠습니까?',
            choices: [
              {
                id: 1,
                text: '목표를 조정하고 지원을 약속한다.',
                nextChapterId: 5,
                emotionalImpact: { stress: -10, happiness: 10, confidence: 10, anxiety: -5 },
                message: '목표를 조정하고 지원을 약속하자 팀원들이 안심하고 당신을 따르기 시작합니다.',
              },
              {
                id: 2,
                text: '목표 달성을 위해 압박을 가한다.',
                nextChapterId: 6,
                emotionalImpact: { stress: 15, happiness: -10, confidence: -5, anxiety: 10 },
                message: '목표 달성을 위해 압박을 가하자 팀원들이 더 큰 스트레스를 느끼기 시작합니다.',
              },
            ],
          },
          {
            id: 4,
            text: '팀의 성과가 떨어지고 있습니다. 어떻게 하시겠습니까?',
            choices: [
              {
                id: 1,
                text: '팀원들과의 소통을 시작한다.',
                nextChapterId: 5,
                emotionalImpact: { stress: -10, happiness: 10, confidence: 10, anxiety: -5 },
                message: '팀원들과의 소통을 시작한 결과, 팀의 성과가 점점 회복되었습니다.',
              },
              {
                id: 2,
                text: '상사에게 지원을 요청한다.',
                nextChapterId: 6,
                emotionalImpact: { stress: 5, happiness: -5, confidence: 0, anxiety: 5 },
                message: '상사에게 지원을 요청했지만 팀원들은 더욱 소외감을 느끼고 있습니다.',
              },
            ],
          },
          {
            id: 5,
            text: '팀워크를 통해 팀의 성과가 크게 향상되었습니다. 어떻게 하시겠습니까?',
            isEnding: true,
            choices: [],
          },
          {
            id: 6,
            text: '팀원들이 당신의 리더십에 불만을 갖고 있습니다.',
            isEnding: true,
            choices: [],
          },
        ],
};
