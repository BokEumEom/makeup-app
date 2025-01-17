export type Choice = 'Rock' | 'Paper' | 'Scissors';

export const choices: Choice[] = ['Rock', 'Paper', 'Scissors'];

export const determineWinner = (userChoice: Choice, computerChoice: Choice): string => {
  if (userChoice === computerChoice) return 'Draw';

  if (
    (userChoice === 'Rock' && computerChoice === 'Scissors') ||
    (userChoice === 'Paper' && computerChoice === 'Rock') ||
    (userChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    return 'You win!';
  }

  return 'You lose!';
};

export const getRandomChoice = (): Choice => {
  return choices[Math.floor(Math.random() * choices.length)];
};
