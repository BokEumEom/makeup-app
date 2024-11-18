import { SCORE_THRESHOLDS } from '@/constants/resignation/thresholds';

// 점수 계산 함수
export function calculateScore(answers: Record<string, string>): number {
  /**
   * 사용자의 답변 데이터에서 '예' 응답의 개수를 합산하여 점수를 계산합니다.
   * @param answers - { [질문 ID]: "yes" | "no" }
   * @returns 총점 (0 ~ 20)
   */
  return Object.values(answers).filter((answer) => answer === 'yes').length;
}

// 권장 사항 제공 함수
export function getRecommendation(score: number): string {
  /**
   * 계산된 점수를 기반으로 사용자에게 적합한 권장 메시지를 반환합니다.
   * @param score - 사용자의 총 점수
   * @returns 권장 메시지
   */
  if (score <= SCORE_THRESHOLDS.stable.max) {
    return '현재 상태는 안정적입니다. 퇴사를 고려하지 않아도 됩니다.';
  } else if (score <= SCORE_THRESHOLDS.slightIssue.max) {
    return '직장에서 약간의 문제가 있습니다. 개선을 시도해보세요.';
  } else if (score <= SCORE_THRESHOLDS.considerLeaving.max) {
    return '이직을 고려해볼 시점입니다. 퇴사 전에 준비를 철저히 하세요.';
  } else {
    return '퇴사를 적극적으로 고려하세요. 새로운 도전을 시작할 준비를 하세요.';
  }
}

// 추가: 권장 행동 아이디어
export function getActionSuggestions(score: number): string[] {
  /**
   * 점수에 따라 사용자에게 권장할 행동 리스트를 제공합니다.
   * @param score - 사용자의 총 점수
   * @returns 권장 행동 목록
   */
  if (score <= SCORE_THRESHOLDS.stable.max) {
    return [
      '현재 직장에서 만족감을 유지하세요.',
      '업무 외 시간을 활용해 새로운 스킬을 개발해보세요.',
    ];
  } else if (score <= SCORE_THRESHOLDS.slightIssue.max) {
    return [
      '상사 또는 동료와 소통하여 문제를 해결해보세요.',
      '업무 환경 개선 방안을 상사에게 제안해보세요.',
    ];
  } else if (score <= SCORE_THRESHOLDS.considerLeaving.max) {
    return [
      '새로운 직장을 탐색해보세요.',
      '이력서를 업데이트하고 네트워킹을 시작하세요.',
      '현재 스킬을 보강해 더 나은 이직 준비를 하세요.',
    ];
  } else {
    return [
      '퇴사 계획을 구체화하세요.',
      '충분한 휴식을 취한 뒤 새로운 도전을 시작하세요.',
      '새로운 경력을 쌓을 수 있는 프리랜서나 창업을 고려해보세요.',
    ];
  }
}
