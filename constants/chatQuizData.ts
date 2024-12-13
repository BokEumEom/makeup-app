export type ChatQuizItem =
  | {
      id: number;
      type: 'story' | 'feedback'; // 스토리 또는 피드백
      content: string;
    }
  | {
      id: number;
      type: 'question'; // 질문 타입
      content: string;
      options: string[]; // 선택지
      correct: number; // 정답 인덱스
      feedback: {
        correct: string; // 정답 피드백
        incorrect: string; // 오답 피드백
      };
    }
  | {
      type: 'player'; // 사용자의 선택
      content: string; // 사용자가 입력한 텍스트
    };

export const chatQuizData: ChatQuizItem[] = [
  {
    id: 1,
    type: 'story',
    content: "당신은 어두운 숲에 들어섰습니다. 주변은 어둡고 불빛이 필요합니다.",
  },
  {
    id: 2,
    type: 'question',
    content: "불을 밝히기 위해 가장 먼저 켜야 할 것은 무엇인가요?",
    options: ["촛불", "등유램프", "성냥", "난로"],
    correct: 2,
    feedback: {
      correct: "성공적으로 불을 밝혔습니다! 안전한 길을 찾았습니다.",
      incorrect: "잘못된 선택입니다. 어둠 속에서 발이 묶였습니다.",
    },
  },
  {
    id: 3,
    type: 'story',
    content: "숲 속에서 이상한 거울을 발견했습니다. 거울에 자신이 보이지 않습니다.",
  },
  {
    id: 4,
    type: 'question',
    content: "왜 거울에서 자신이 보이지 않을까요?",
    options: ["거울이 깨져있다", "아직 어둡다", "뱀파이어다", "눈을 감고 있다"],
    correct: 3,
    feedback: {
      correct: "눈을 감고 있었던 것을 깨달았습니다. 앞으로 나아갑니다.",
      incorrect: "혼란에 빠지며 다음 단서를 찾는 데 실패했습니다.",
    },
  },
  {
    id: 5,
    type: 'story',
    content: "깊은 숲 속에 오래된 폐허가 보입니다. 폐허 안에서 기묘한 소리가 들립니다.",
  },
  {
    id: 6,
    type: 'question',
    content: "폐허 안으로 들어가기 위해 가장 먼저 해야 할 일은 무엇인가요?",
    options: ["문을 열어본다", "소리의 정체를 확인한다", "안전을 위해 주변을 살핀다", "폐허를 피한다"],
    correct: 2,
    feedback: {
      correct: "주변을 살피며 안전한 경로를 찾았습니다.",
      incorrect: "성급한 행동으로 위험에 처했습니다.",
    },
  },
  {
    id: 7,
    type: 'feedback',
    content: "폐허 안에서 안전하게 들어가 단서를 찾았습니다.",
  },
  {
    id: 8,
    type: 'story',
    content: "폐허 안에서 신비한 상자를 발견했습니다. 상자 안에는 이상한 암호가 적혀 있습니다.",
  },
  {
    id: 9,
    type: 'question',
    content: "상자를 열기 위해 암호를 풀어야 합니다. 다음 중 올바른 암호는 무엇인가요?",
    options: ["1234", "ABCD", "초록 달과 붉은 별", "XYZ9"],
    correct: 2,
    feedback: {
      correct: "상자가 열렸습니다! 중요한 단서를 얻었습니다.",
      incorrect: "암호를 틀렸습니다. 상자가 열리지 않았습니다.",
    },
  },
  {
    id: 10,
    type: 'feedback',
    content: "당신은 중요한 단서를 발견하고 다음 단계로 나아갑니다.",
  },

  // 새로운 스토리 전개
  {
    id: 11,
    type: 'story',
    content: "폐허를 벗어나자, 숲 한가운데 고대의 제단이 나타납니다. 제단 위에는 고대 언어로 쓰인 두루마리가 놓여 있습니다.",
  },
  {
    id: 12,
    type: 'story',
    content: "두루마리를 펼치자, 낯선 기호들과 그림이 가득합니다. 이 암호를 해석해야만 길을 찾을 수 있습니다.",
  },
  {
    id: 13,
    type: 'question',
    content: "두루마리에 적힌 메시지를 이해하기 위해서는 무엇이 필요할까요?",
    options: ["고대 언어 해석서", "금으로 된 나침반", "마법의 램프", "우연히 주운 돌멩이"],
    correct: 0,
    feedback: {
      correct: "고대 언어 해석서를 사용해 암호를 읽었습니다. 길의 방향을 알게 되었습니다.",
      incorrect: "필요한 도구를 찾지 못해 암호 해석에 실패했습니다.",
    },
  },
  {
    id: 14,
    type: 'story',
    content: "해석을 통해 알게 된 길로 나아가자, 숲의 가장 깊숙한 곳에 빛나는 호수가 나타납니다.",
  },
  {
    id: 15,
    type: 'story',
    content: "호수 위에는 달빛이 반사되어 비밀스러운 무늬를 형성하고 있습니다. 이 무늬는 다음 열쇠를 얻기 위한 힌트로 보입니다.",
  },
  {
    id: 16,
    type: 'question',
    content: "호수의 무늬를 해독하기 위해 어떤 행동을 취해야 할까요?",
    options: ["호수에 돌을 던진다", "달빛을 가린다", "물 위에 손을 담근다", "작은 나뭇가지를 띄운다"],
    correct: 3,
    feedback: {
      correct: "나뭇가지를 물 위에 띄우자, 무늬가 흔들리며 문양이 분명해졌습니다.",
      incorrect: "잘못된 행동으로 호수의 비밀을 놓치고 말았습니다.",
    },
  },
  {
    id: 17,
    type: 'feedback',
    content: "문양을 해독해 다음 지역으로 가는 비밀 입구를 찾아냈습니다.",
  },
  {
    id: 18,
    type: 'story',
    content: "비밀 입구로 들어서자, 좁은 터널 끝에 빛나는 수정 구슬이 놓여 있습니다. 이 구슬은 마지막 관문의 열쇠입니다.",
  },
  {
    id: 19,
    type: 'question',
    content: "수정 구슬을 활성화하기 위해서는 무엇을 해야 할까요?",
    options: ["구슬을 깨트린다", "구슬에 숨을 불어넣는다", "구슬을 달빛에 비춘다", "구슬을 땅에 묻는다"],
    correct: 2,
    feedback: {
      correct: "달빛에 구슬을 비추자 빛이 반사되어 관문의 문양이 활성화되었습니다!",
      incorrect: "잘못된 행동으로 구슬이 빛나지 않고 있습니다.",
    },
  },
  {
    id: 20,
    type: 'feedback',
    content: "관문이 열리고 당신은 깊은 숲을 빠져나와 새로운 세계로 향할 준비를 마쳤습니다.",
  },
];
