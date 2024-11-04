// utils/deckUtils.ts
import { GameActionTypes, GameState } from '@/types/gameTypes';

export const shuffleDeck = (): number[] => {
   const deck = Array(40).fill(0).map((_, i) => (i % 10) + 1);
   return deck.sort(() => Math.random() - 0.5);
};

export const generateSideDeck = (): number[] => {
   const deck = [];
   while (deck.length < 4) {
      const cardValue = Math.floor(Math.random() * 13) - 6; // -6 to +6
      if (cardValue !== 0) deck.push(cardValue);
   }
   return deck;
};

export const initialState: GameState = {
   gameStarted: false,
   playerTotalScore: 0,
   opponentTotalScore: 0,
   playerRoundWins: 0,
   opponentRoundWins: 0,
   playerCards: Array(9).fill(null),
   opponentCards: Array(9).fill(null),
   playerSideDeck: [],
   opponentSideDeck: [],
   currentTurn: null,
   playerHasStood: false,
   opponentHasStood: false,
   deck: [],
};

export const gameReducer = (state: GameState, action: GameActionTypes): GameState => {
   switch (action.type) {
      case 'RESET_ROUND':
         return {
            ...state,
            playerTotalScore: 0,
            opponentTotalScore: 0,
            playerCards: Array(9).fill(null),
            opponentCards: Array(9).fill(null),
            playerHasStood: false,
            opponentHasStood: false,
         };
      case 'SET_CURRENT_TURN':
         return { ...state, currentTurn: action.currentTurn };
      case 'SET_DECK':
         return { ...state, deck: action.deck };
      case 'SET_SIDE_DECK':
         return {
            ...state,
            playerSideDeck: action.playerSideDeck,
            opponentSideDeck: action.opponentSideDeck,
         };
      // 추가적인 리듀서 로직 처리...
      default:
         return state;
   }
};
