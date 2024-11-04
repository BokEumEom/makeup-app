// utils/gameUtils.ts
import { Dispatch } from 'react';
import { GameActionTypes, GameState } from '@/types/gameTypes';
import { shuffleDeck, generateSideDeck } from '@/utils/deckUtils';

export const initializeGame = (dispatch: Dispatch<GameActionTypes>) => {
   dispatch({ type: 'RESET_ROUND' });
   dispatch({ type: 'SET_ROUND_WINS', playerWins: 0, opponentWins: 0 });
   dispatch({ type: 'SET_DECK', deck: shuffleDeck() });
   dispatch({ type: 'SET_SIDE_DECK', playerSideDeck: generateSideDeck(), opponentSideDeck: generateSideDeck() });
};

export const resetGame = (dispatch: Dispatch<GameActionTypes>) => {
   dispatch({ type: 'RESET_GAME' });
   initializeGame(dispatch);
};

export const switchTurn = (dispatch: Dispatch<GameActionTypes>, state: GameState) => {
   if (state.playerHasStood && state.opponentHasStood) {
      dispatch({ type: 'CHECK_ROUND_WINNER' });
   } else {
      const nextTurn = state.currentTurn === 'player' ? 'opponent' : 'player';
      dispatch({ type: 'SET_CURRENT_TURN', currentTurn: nextTurn });
      dealerDrawCard(dispatch, state, nextTurn);
   }
};

export const handleOpponentTurn = (dispatch: Dispatch<GameActionTypes>, state: GameState) => {
   setTimeout(() => {
      const card = drawCard(state.deck);
      if (card !== undefined) {
         dispatch({ type: 'PLACE_CARD', player: 'opponent', cardValue: card });
      }
      switchTurn(dispatch, state);
   }, 1000);
};
