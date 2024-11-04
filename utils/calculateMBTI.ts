// calculateMBTI.ts (간단한 예시로 점검)
export const calculateMBTI = (answers: Record<string, number>): string => {
  const result = {
    'E/I': 0,
    'S/N': 0,
    'T/F': 0,
    'J/P': 0,
  };

  Object.keys(answers).forEach((category) => {
    result[category] += answers[category];
  });

  return (
    (result['E/I'] >= 0 ? 'E' : 'I') +
    (result['S/N'] >= 0 ? 'S' : 'N') +
    (result['T/F'] >= 0 ? 'T' : 'F') +
    (result['J/P'] >= 0 ? 'J' : 'P')
  );
};
