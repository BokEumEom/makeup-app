export interface Scenario {
  id: number;
  title: string;
  description: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: number;
  text: string;
  choices: Choice[];
  isEnding?: boolean; // 엔딩 여부
  message?: string;
}

export interface Choice {
  id: number;
  text: string;
  nextChapterId?: number; // 선택에 따른 다음 챕터 ID
  emotionalImpact: EmotionalState; // 감정 변화
  message: string; // 선택 결과 메시지
}

export interface EmotionalState {
  stress: number;
  happiness: number;
  confidence: number;
  anxiety: number;
}

export interface Ending {
  id: number;
  text: string;
  summary: string;
  emotionalImpact?: EmotionImpact;
}

export interface EmotionImpact {
  stress: number;
  happiness: number;
  confidence: number;
  anxiety: number;
}