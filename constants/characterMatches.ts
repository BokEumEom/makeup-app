// characterMatches.ts
import { ImageSourcePropType } from 'react-native';

interface CharacterMatch {
  type: string;
  title: string;
  character: string;
  description: string;
  likes: string[];
  dislikes: string[];
  image: ImageSourcePropType; // 이미지 경로를 위한 필드
}

const characterMatches: CharacterMatch[] = [
  {
    type: "ISTJ",
    title: "청렴 검사관",
    character: "규칙적인 리리핑",
    description:
      "리리핑은 책임감의 화신으로, 정확성과 철저함이 몸에 배어 있습니다. 언제나 계획에 따라 질서를 유지하며, 작은 일이라도 놓치지 않으려는 세심함이 돋보입니다.",
    likes: ["잘 짜인 계획표", "정리된 공간", "성실한 동료들", "오래된 전통과 가치"],
    dislikes: ["예고 없이 바뀌는 계획", "무질서", "책임 회피", "약속 위반"],
    image: require('@/assets/mbti_images/1.ISTJ.png'),
  },
  {
    type: "ISFJ",
    title: "용감한 수호자",
    character: "다정한 보호자 포포핑",
    description:
      "포포핑은 따뜻함과 헌신의 상징으로, 다른 사람을 돌보는 일에 진심을 다합니다. 조용하지만 강한 내면의 결단력으로 중요한 순간에는 놀라운 결단을 보여줍니다.",
    likes: ["따뜻한 담요", "친구들을 위한 작은 선물", "가족과 함께하는 시간", "안정된 일상"],
    dislikes: ["불필요한 갈등", "위험에 빠진 사람", "냉정한 태도", "불확실한 상황"],
    image: require('@/assets/mbti_images/2.ISFJ.png'),
  },
  {
    type: "INFJ",
    title: "선의의 옹호자",
    character: "꿈꾸는 이상가 빛나핑",
    description:
      "빛나핑은 깊은 영혼을 지닌 비전가로, 사람들에게 감동을 주는 조언을 전하는 것을 좋아합니다. 세상을 더 나은 곳으로 만들기 위한 비전을 품고 있습니다.",
    likes: ["의미 있는 대화", "영감을 주는 책", "밤하늘의 별", "사색의 시간"],
    dislikes: ["허영심 많은 사람", "무의미한 소문", "공허한 약속", "진실하지 않은 관계"],
    image: require('@/assets/mbti_images/3.INFJ.png'),
  },
  {
    type: "INTJ",
    title: "전략가",
    character: "영리한 계획자 브레인핑",
    description:
      "브레인핑은 미래를 설계하는 전략의 대가입니다. 예리한 분석력과 날카로운 통찰력으로 복잡한 문제를 체계적으로 해결합니다.",
    likes: ["장기 목표 계획", "논리 문제", "조용한 작업 공간", "효율적인 시스템"],
    dislikes: ["비효율성", "근거 없는 주장", "즉흥적 결정", "감정적 갈등"],
    image: require('@/assets/mbti_images/4.INTJ.png'),
  },
  {
    type: "ISTP",
    title: "만능 재주꾼",
    character: "탐험하는 기술자 메카핑",
    description:
      "메카핑은 모험심과 실용성을 두루 갖춘 문제 해결사입니다. 즉흥적이면서도 날카로운 판단력을 발휘하며, 창의적인 발명품을 만들어냅니다.",
    likes: ["새로운 기술", "모험", "문제 해결", "자유로운 여행"],
    dislikes: ["규제", "반복적인 일상", "불필요한 논쟁", "세부 설명"],
    image: require('@/assets/mbti_images/5.ISTP.png'),
  },
  {
    type: "ISFP",
    title: "호기심 많은 예술가",
    character: "감성적인 예술가 무지개핑",
    description:
      "무지개핑은 예술적 감수성이 풍부한 창의적인 영혼입니다. 주변의 아름다움을 발견하고, 그 감동을 작품으로 표현하는 것을 즐깁니다.",
    likes: ["자연 속 산책", "음악과 예술", "편안한 분위기", "작은 행복 발견"],
    dislikes: ["과도한 경쟁", "감정 무시", "딱딱한 규칙", "과도한 관심"],
    image: require('@/assets/mbti_images/6.ISFP.png'),
  },
  {
    type: "INFP",
    title: "열정적인 중재자",
    character: "마음이 따뜻한 힐러 치유핑",
    description:
      "치유핑은 깊은 내면의 열정을 지닌 영혼 치유사입니다. 진실된 감정과 내적 신념을 소중히 여기며, 이상적인 세계를 꿈꿉니다.",
    likes: ["감성적 글쓰기", "아름다운 풍경", "깊이 있는 대화", "마음을 울리는 이야기"],
    dislikes: ["무례한 사람", "강요된 규칙", "왜곡된 진실", "의미 없는 다툼"],
    image: require('@/assets/mbti_images/7.INFP.png'),
  },
  {
    type: "INTP",
    title: "논리적인 사색가",
    character: "호기심 많은 분석가 큐리핑",
    description:
      "큐리핑은 끝없는 지적 탐구를 즐기는 사색가입니다. 창의적이고 독창적인 사고로 논리적 추론을 즐기며, 새로운 이론을 발견하는 데 열정을 쏟습니다.",
    likes: ["독창적 발상", "실험과 탐구", "철학적 토론", "사색 시간"],
    dislikes: ["감정적 논쟁", "불확실한 정보", "반복 작업", "사회적 관습"],
    image: require('@/assets/mbti_images/8.INTP.png'),
  },
  {
    type: "ESTP",
    title: "모험을 즐기는 활동가",
    character: "에너지 넘치는 액션핑",
    description:
      "액션핑은 에너지와 흥분으로 가득 찬 모험가입니다. 즉각적인 행동력과 빠른 판단력으로 사람들을 이끌며 스릴 넘치는 도전을 즐깁니다.",
    likes: ["스포츠", "모험", "시끌벅적한 파티", "아드레날린 순간"],
    dislikes: ["지루한 일", "장황한 설명", "감정적 대화", "계획 많은 상황"],
    image: require('@/assets/mbti_images/9.ESTP.png'),
  },
  {
    type: "ESFP",
    title: "자유로운 연예인",
    character: "무대 위의 스타 쇼핑",
    description:
      "쇼핑은 모든 사람의 주목을 받으며 순간을 즐기는 스타입니다. 밝고 열정적인 에너지를 뽐내며, 주변 사람들을 웃게 만듭니다.",
    likes: ["스포트라이트", "춤추기", "사람 웃기기", "즉흥 노래"],
    dislikes: ["외로움", "비판적 시선", "지루한 분위기", "진지한 상황"],
    image: require('@/assets/mbti_images/10.ESFP.png'),
  },
  {
    type: "ENFP",
    title: "재기발랄한 활동가",
    character: "상상력 넘치는 꿈캔핑",
    description:
      "꿈캔핑은 상상력의 화신으로, 언제나 새로운 아이디어로 친구들을 즐겁게 만듭니다. 창의적이고 열정적이며 사람들에게 영감을 줍니다.",
    likes: ["즉흥 여행", "상상력 활동", "새로운 친구", "꿈꾸기"],
    dislikes: ["반복 일상", "억압 환경", "창의성 제한 규칙", "부정적 에너지"],
    image: require('@/assets/mbti_images/11.ENFP.png'),
  },
  {
    type: "ENTP",
    title: "발명가",
    character: "아이디어 뱅크 디자인핑",
    description:
      "디자인핑은 번뜩이는 아이디어와 재치로 가득 찬 발명가입니다. 빠르게 생각하고 변화에 적응하며 기존 틀을 깨는 방법을 제안합니다.",
    likes: ["브레인스토밍", "발명품 제작", "논쟁과 토론", "변화와 혁신"],
    dislikes: ["고집", "정해진 규칙", "느린 진행", "단조로운 대화"],
    image: require('@/assets/mbti_images/12.ENTP.png'),
  },
  {
    type: "ESTJ",
    title: "엄격한 관리자",
    character: "질서를 세우는 리더핑",
    description:
      "리더핑은 철저한 관리 능력과 조직력을 지닌 지도자입니다. 실용적이고 현실적 관점에서 일을 처리하며, 팀을 체계적으로 이끕니다.",
    likes: ["일 성취", "체계적 조직", "명확한 규칙", "목표 계획"],
    dislikes: ["비효율", "불확실 상황", "약속 위반", "책임 회피"],
    image: require('@/assets/mbti_images/13.ESTJ.png'),
  },
  {
    type: "ESFJ",
    title: "사교적인 제공자",
    character: "친절한 친구 사랑핑",
    description:
      "사랑핑은 친구들을 잘 돌보며, 언제나 상대방의 기분을 먼저 생각합니다. 사회적 관계를 중요시하며 공동체 속 조화를 추구합니다.",
    likes: ["사교 활동", "따뜻한 분위기", "축제", "감사 표현"],
    dislikes: ["외면", "갈등", "무례한 행동", "관계 소홀"],
    image: require('@/assets/mbti_images/14.ESFJ.png'),
  },
  {
    type: "ENFJ",
    title: "정의로운 지도자",
    character: "모두를 이끄는 희망핑",
    description:
      "희망핑은 카리스마 넘치는 리더십을 가진 지도자입니다. 사람들을 이끌어 긍정적 변화를 만드는 데 앞장서며 타인의 성장을 돕습니다.",
    likes: ["대의", "사람 돕기", "감동적 연설", "협력 프로젝트"],
    dislikes: ["불의", "소외", "팀워크 방해", "무관심"],
    image: require('@/assets/mbti_images/15.ENFJ.png'),
  },
  {
    type: "ENTJ",
    title: "대담한 통솔자",
    character: "결단력 있는 전략가 윈핑",
    description:
      "윈핑은 효율적이고 목표 지향적인 전략가입니다. 어려운 프로젝트도 강력하게 추진하며 팀을 성공으로 이끄는 능력이 탁월합니다.",
    likes: ["목표 설정", "문제 해결", "리더십 책임", "효율적 전략"],
    dislikes: ["시간 낭비", "비효율", "약한 리더십", "불확실 목표"],
    image: require('@/assets/mbti_images/16.ENTJ.png'),
  },
];

export default characterMatches;
