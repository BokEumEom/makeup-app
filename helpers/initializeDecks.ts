export const createMainDeck = () => {
  const deck = Array(40)
    .fill(0)
    .map((_, i) => (i % 10) + 1);
  return shuffleArray(deck);
};

export const createSideDeck = () => {
  const deck = [];
  while (deck.length < 4) {
    const cardValue = Math.floor(Math.random() * 13) - 6;
    if (cardValue !== 0) deck.push(cardValue);
  }
  return deck;
};

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
