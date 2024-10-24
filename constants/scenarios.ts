import { Scenario } from '../types/scenario';

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: '부당한 지시와 상사와의 갈등 해결',
    description: '상사에게 비현실적인 업무 목표를 받았을 때, 어떻게 대처할 것인가?',
    chapters: [
      {
        id: 1,
        text: '상사가 비현실적인 업무 목표를 지시했습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '상사에게 솔직하게 의견을 전달한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, confidence: 20, happiness: 10, anxiety: -5 },
            message: '상사는 주인공의 의견을 수용하고, 업무 목표를 조정합니다. 스트레스가 줄어들고 자신감이 상승합니다.',
          },
          {
            id: 2,
            text: '팀원들과 함께 대안을 마련해 상사에게 제안한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -15, confidence: 15, happiness: 10, anxiety: -10 },
            message: '팀원들과 협력하여 상사는 새로운 제안을 받아들입니다. 팀워크와 만족감이 향상됩니다.',
          },
          {
            id: 3,
            text: '지시에 따르고 개인적으로 부담을 감수한다.',
            nextChapterId: 3,
            emotionalImpact: { stress: 20, confidence: -5, happiness: -10, anxiety: 20 },
            message: '업무를 처리하는 동안 과중한 부담을 느끼며 스트레스와 불만이 쌓입니다.',
          },
        ],
      },
      {
        id: 2,
        text: '상사는 당신의 의견을 받아들여 업무 목표를 조정했습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 3,
        text: '과중한 업무로 인해 스트레스와 불만이 쌓입니다.',
        isEnding: true,
        choices: [],
      },
    ],
  },
  {
    id: 2,
    title: '중요한 발표를 앞두고 불안감을 느낄 때',
    description: '중요한 발표 전에 극도의 불안감을 느끼는 상황입니다. 어떻게 불안을 극복할 것인가?',
    chapters: [
      {
        id: 1,
        text: '중요한 발표를 앞두고 불안을 느끼고 있습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '호흡 운동과 긍정적인 자기 대화로 마음을 다스린다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -15, confidence: 20, happiness: 15, anxiety: -10 },
            message: '호흡을 가다듬고 발표를 성공적으로 마칩니다. 자신감과 만족감이 상승합니다.',
          },
          {
            id: 2,
            text: '동료에게 도움을 청해 리허설을 진행한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, confidence: 15, happiness: 10, anxiety: -5 },
            message: '동료의 도움으로 발표 준비를 마치고 자신감을 얻게 됩니다.',
          },
          {
            id: 3,
            text: '발표를 포기한다.',
            nextChapterId: 3,
            emotionalImpact: { stress: 20, confidence: -20, happiness: -15, anxiety: 15 },
            message: '발표를 포기하여 후회와 불안이 증대됩니다.',
          },
        ],
      },
      {
        id: 2,
        text: '발표를 성공적으로 마쳤습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 3,
        text: '발표를 포기한 것에 후회와 스트레스를 느낍니다.',
        isEnding: true,
        choices: [],
      },
    ],
  },
  {
    id: 3,
    title: '친구와의 관계 회복',
    description: '친구가 오해로 인해 등을 돌렸을 때, 어떻게 해결할 것인가?',
    chapters: [
      {
        id: 1,
        text: '친구가 오해를 하고 거리를 두고 있습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '친구와 직접 만나 진심으로 대화한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, confidence: 15, happiness: 20, anxiety: -10 },
            message: '친구는 주인공의 진심에 마음을 열고 오해를 풀며 관계가 회복됩니다.',
          },
          {
            id: 2,
            text: '공통 친구에게 중재를 부탁한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -5, confidence: 10, happiness: 10, anxiety: -5 },
            message: '공통 친구의 중재로 오해는 풀리지만 약간의 어색함이 남습니다.',
          },
          {
            id: 3,
            text: '시간에 맡기고 기다린다.',
            nextChapterId: 3,
            emotionalImpact: { stress: 10, confidence: -10, happiness: -10, anxiety: 10 },
            message: '오해가 풀리지 않아 관계가 더욱 소원해집니다.',
          },
        ],
      },
      {
        id: 2,
        text: '친구와의 관계가 회복되었습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 3,
        text: '관계가 단절되고 외로움이 깊어집니다.',
        isEnding: true,
        choices: [],
      },
    ],
  },
  {
    id: 4,
    title: '이별 후 마음의 치유',
    description: '갑작스러운 이별 후 슬픔과 배신감을 느끼는 상황입니다. 어떻게 감정을 정리할 것인가?',
    chapters: [
      {
        id: 1,
        text: '이별로 인해 슬픔과 배신감을 느끼고 있습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '혼자만의 시간을 가지며 감정을 정리한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, confidence: 15, happiness: 10, anxiety: -5 },
            message: '스스로를 돌보며 점차 마음의 평화를 찾습니다.',
          },
          {
            id: 2,
            text: '친구들과 시간을 보내며 위로를 받는다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -15, confidence: 10, happiness: 15, anxiety: -10 },
            message: '친구들과의 대화를 통해 위로받고 활력을 회복합니다.',
          },
          {
            id: 3,
            text: '연인에게 연락하여 재회를 요청한다.',
            nextChapterId: 3,
            emotionalImpact: { stress: 15, confidence: -15, happiness: -20, anxiety: 20 },
            message: '연인과의 재회 시도가 실패하여 상처가 더 깊어집니다.',
          },
        ],
      },
      {
        id: 2,
        text: '이별 후 감정이 안정되고 마음의 평화를 찾았습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 3,
        text: '재회 시도가 실패하여 상처가 깊어졌습니다.',
        isEnding: true,
        choices: [],
      },
    ],
  },
  {
    id: 5,
    title: '낯선 도시에서 길을 잃었을 때',
    description: '혼자 여행 중 길을 잃은 상황입니다. 어떻게 대처할 것인가?',
    chapters: [
      {
        id: 1,
        text: '낯선 도시에서 길을 잃었습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '현지인에게 도움을 요청한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, confidence: 15, happiness: 20, anxiety: -10 },
            message: '현지인의 도움으로 길을 찾고 새로운 친구도 사귑니다.',
          },
          {
            id: 2,
            text: '기억을 되짚으며 스스로 길을 찾는다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -5, confidence: 10, happiness: 10, anxiety: -5 },
            message: '스스로 길을 찾아 자신감이 높아집니다.',
          },
          {
            id: 3,
            text: '무작정 걸어가며 길을 찾는다.',
            nextChapterId: 3,
            emotionalImpact: { stress: 20, confidence: -10, happiness: -15, anxiety: 20 },
            message: '낯선 곳에서 위험에 처해 큰 스트레스를 받습니다.',
          },
        ],
      },
      {
        id: 2,
        text: '길을 찾아 새로운 모험을 즐기게 됩니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 3,
        text: '위험한 상황에 처하여 스트레스가 심해졌습니다.',
        isEnding: true,
        choices: [],
      },
    ],
  },
  {
    id: 6,
    title: '중요한 사람과의 관계에서 신뢰가 깨졌을 때',
    description: '친구나 연인의 배신으로 신뢰가 깨진 상황입니다. 어떻게 신뢰를 회복할 것인가?',
    chapters: [
      {
        id: 1,
        text: '중요한 사람과의 관계에서 신뢰가 깨졌습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '상대방과 솔직한 대화를 나눈다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -15, confidence: 20, happiness: 15, anxiety: -10 },
            message: '솔직한 대화를 통해 오해를 풀고 관계가 회복됩니다.',
          },
          {
            id: 2,
            text: '일정 기간 거리를 두고 감정을 정리한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, confidence: 15, happiness: 10, anxiety: -5 },
            message: '시간을 두고 감정을 정리하며 관계를 재평가합니다.',
          },
          {
            id: 3,
            text: '즉시 관계를 끊는다.',
            nextChapterId: 3,
            emotionalImpact: { stress: 10, confidence: -10, happiness: -20, anxiety: 15 },
            message: '관계를 끊고 상실감과 우울감을 느끼게 됩니다.',
          },
        ],
      },
      {
        id: 2,
        text: '신뢰가 회복되었으며 관계가 더욱 단단해졌습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 3,
        text: '관계가 끝나고 슬픔과 상실감이 이어집니다.',
        isEnding: true,
        choices: [],
      },
    ],
  },
  {
    id: 7,
    title: '업무에서 성과를 인정받지 못했을 때',
    description: '노력에 대한 보상 없이 성과가 인정받지 못한 상황입니다. 어떻게 대처할 것인가?',
    chapters: [
      {
        id: 1,
        text: '성과를 인정받지 못하고 있습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '상사에게 직접 피드백을 요청한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, confidence: 15, happiness: 10, anxiety: -5 },
            message: '상사는 주인공의 노력을 깨닫고 보상을 제공합니다. 자신감이 상승합니다.',
          },
          {
            id: 2,
            text: '스스로를 격려하며 계속 노력한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -5, confidence: 10, happiness: 10, anxiety: -5 },
            message: '스스로 동기를 부여하며 계속해서 성과를 내게 됩니다.',
          },
          {
            id: 3,
            text: '업무에 대한 열의를 낮춘다.',
            nextChapterId: 3,
            emotionalImpact: { stress: 10, confidence: -10, happiness: -10, anxiety: 10 },
            message: '의욕이 감소하고 성과가 저하됩니다. 불만이 증가합니다.',
          },
        ],
      },
      {
        id: 2,
        text: '주인공의 성과가 인정받고 업무에 대한 만족감이 높아집니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 3,
        text: '의욕이 떨어져 업무 성과가 계속 저하됩니다.',
        isEnding: true,
        choices: [],
      },
    ],
  },
  {
    id: 8,
    title: '중요한 시험을 망쳤을 때',
    description: '중요한 시험에서 실패한 상황입니다. 어떻게 대처할 것인가?',
    chapters: [
      {
        id: 1,
        text: '시험에서 실패한 후 실망하고 있습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '실패 원인을 분석하고 재도전한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, confidence: 20, happiness: 10, anxiety: -10 },
            message: '실패를 교훈 삼아 재도전하여 성공합니다. 자신감과 성취감이 상승합니다.',
          },
          {
            id: 2,
            text: '친구들과 시간을 보내며 스트레스를 해소한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -15, confidence: 10, happiness: 15, anxiety: -5 },
            message: '친구들과의 시간을 보내며 스트레스를 해소하고 기분이 나아집니다.',
          },
          {
            id: 3,
            text: '모든 것을 포기하고 무기력하게 지낸다.',
            nextChapterId: 3,
            emotionalImpact: { stress: 20, confidence: -20, happiness: -20, anxiety: 20 },
            message: '무기력함에 빠져 더욱 스트레스를 받으며 좌절합니다.',
          },
        ],
      },
      {
        id: 2,
        text: '재도전 후 성공하거나, 기분이 나아졌습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 3,
        text: '포기로 인해 무기력함과 스트레스가 지속됩니다.',
        isEnding: true,
        choices: [],
      },
    ],
  },
  {
    id: 9,
    title: '새로운 도시에 이사한 후 외로움을 느낄 때',
    description: '낯선 도시에서 외로움을 느끼는 상황입니다. 어떻게 사회적 관계를 형성할 것인가?',
    chapters: [
      {
        id: 1,
        text: '새로운 도시에 이사했지만 외로움을 느끼고 있습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '지역 모임이나 동호회에 가입한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -10, confidence: 15, happiness: 20, anxiety: -10 },
            message: '새로운 사람들과의 만남을 통해 외로움을 극복하고 즐거움을 찾습니다.',
          },
          {
            id: 2,
            text: '직장 동료들과 친해지기 위해 노력한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -5, confidence: 10, happiness: 10, anxiety: -5 },
            message: '동료들과의 관계가 개선되어 직장 생활이 더 즐거워집니다.',
          },
          {
            id: 3,
            text: '집에 머물며 온라인으로 시간을 보낸다.',
            nextChapterId: 3,
            emotionalImpact: { stress: 10, confidence: -10, happiness: -10, anxiety: 10 },
            message: '외로움이 지속되며 우울감이 증가합니다.',
          },
        ],
      },
      {
        id: 2,
        text: '새로운 사람들과 친해지면서 외로움이 해소되었습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 3,
        text: '집에만 머물러 외로움과 우울감이 지속됩니다.',
        isEnding: true,
        choices: [],
      },
    ],
  },
  {
    id: 10,
    title: '모르는 사람에게 도움을 요청받았을 때',
    description: '길을 가던 중 낯선 사람이 도움을 요청하는 상황입니다. 어떻게 반응할 것인가?',
    chapters: [
      {
        id: 1,
        text: '낯선 사람이 도움을 요청하고 있습니다. 어떻게 하시겠습니까?',
        choices: [
          {
            id: 1,
            text: '도움을 준다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -5, confidence: 10, happiness: 15, anxiety: -5 },
            message: '도움을 주어 만족감을 느끼고, 때로는 사기나 위험에 노출될 수도 있습니다.',
          },
          {
            id: 2,
            text: '정중하게 거절한다.',
            nextChapterId: 2,
            emotionalImpact: { stress: -5, confidence: 5, happiness: 5, anxiety: -5 },
            message: '정중히 거절하여 상대방이 이해하고 물러납니다.',
          },
          {
            id: 3,
            text: '무시하고 지나간다.',
            nextChapterId: 3,
            emotionalImpact: { stress: 5, confidence: -5, happiness: -10, anxiety: 10 },
            message: '무시하여 불편함과 스트레스를 느끼게 됩니다.',
          },
        ],
      },
      {
        id: 2,
        text: '상황이 해결되었고 기분이 나아졌습니다.',
        isEnding: true,
        choices: [],
      },
      {
        id: 3,
        text: '불편함과 스트레스가 지속됩니다.',
        isEnding: true,
        choices: [],
      },
    ],
  },
];
