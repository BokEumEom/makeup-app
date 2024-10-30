// utils//play.tsx

export const choices = ['rock', 'paper', 'scissors'] as const; // Ensure all choices are lowercase for consistency
export type Choice = typeof choices[number];

export const determineWinner = (userChoice: Choice, computerChoice: Choice): string => {
  if (userChoice === computerChoice) return 'Draw';
  if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'You win!';
  } else {
    return 'You lose!';
  }
};

export const getRandomChoice = (): Choice => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};
