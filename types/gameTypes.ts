export type Player = 'player' | 'opponent';

export interface PazaakGameContextProps {
  gameStarted: boolean;
  playerTotalScore: number;
  opponentTotalScore: number;
  playerRoundWins: number;
  opponentRoundWins: number;
  playerCards: (number | null)[];
  opponentCards: (number | null)[];
  playerSideDeck: number[];
  opponentSideDeck: number[];
  currentTurn: Player | null;
  playerHasStood: boolean;
  opponentHasStood: boolean;
  startGame: () => void;
  resetGame: () => void;
  handleStand: () => void;
}
