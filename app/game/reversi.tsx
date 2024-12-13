import React, { useReducer, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Board from '@/components/reversi/Board';
import GameModeSelection from '@/components/reversi/GameModeSelection';
import ScoreBoard from '@/components/reversi/ScoreBoard';
import ResultModal from '@/components/game/ResultModal';
import {
  initializeDiscs,
  initializeBlockedCells,
  canMove,
  getAffectedDiscs,
  flipDiscs,
  calculateAIMove,
  getPlayableCells,
  calculateScore,
} from '@/utils/reversiUtils';

const initialState = {
  discs: initializeDiscs(),
  blockedCells: initializeBlockedCells(),
  turn: 'black',
  score: { black: 2, white: 2 },
  gameOver: false,
  gameStarted: false,
  isSinglePlayer: false,
  aiPlayer: null,
  playableCells: new Set(),
  resultMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_GAME':
      return {
        ...initialState,
        isSinglePlayer: action.payload.singlePlayer,
        aiPlayer: action.payload.aiAs,
      };
    case 'SET_DISCS':
      return { ...state, discs: action.payload };
    case 'SET_SCORE':
      return { ...state, score: action.payload };
    case 'SET_TURN':
      return { ...state, turn: action.payload };
    case 'SET_RESULT_MESSAGE':
      return { ...state, resultMessage: action.payload };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: action.payload };
    case 'SET_PLAYABLE_CELLS':
      return { ...state, playableCells: action.payload };
    case 'SET_GAME_STARTED':
      return { ...state, gameStarted: action.payload };
    default:
      return state;
  }
};

const ReversiGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.gameOver && state.gameStarted && !canMove(state.discs, state.turn, state.blockedCells)) {
      const nextTurn = state.turn === 'black' ? 'white' : 'black';
      if (!canMove(state.discs, nextTurn, state.blockedCells)) {
        endGame();
      } else {
        dispatch({
          type: 'SET_RESULT_MESSAGE',
          payload: `${state.turn.toUpperCase()} cannot move! Turn goes to ${nextTurn.toUpperCase()}.`,
        });
        dispatch({ type: 'SET_TURN', payload: nextTurn });
      }
    }
  }, [state.discs, state.turn, state.gameStarted]);

  useEffect(() => {
    if (state.gameStarted && state.isSinglePlayer && state.aiPlayer === state.turn && !state.gameOver) {
      setTimeout(makeAIMove, 500);
    }
  }, [state.discs, state.turn, state.gameStarted]);

  useEffect(() => {
    if (state.gameStarted && !state.gameOver) {
      const cells = getPlayableCells(state.discs, state.turn, state.blockedCells);
      dispatch({ type: 'SET_PLAYABLE_CELLS', payload: cells });
    }
  }, [state.discs, state.turn, state.gameStarted, state.gameOver]);

  const endGame = () => {
    dispatch({ type: 'SET_GAME_OVER', payload: true });
    const winner =
      state.score.black > state.score.white
        ? 'You win!'
        : state.score.white > state.score.black
        ? 'You lose!'
        : 'Draw!';
    dispatch({ type: 'SET_RESULT_MESSAGE', payload: winner });
  };

  const handleCellPress = (row, col) => {
    if (
      !state.gameStarted || 
      state.gameOver || 
      state.discs[row][col] !== 'empty' || 
      state.blockedCells.has(`${row}-${col}`)
    ) {
      return;
    }

    const affectedDiscs = getAffectedDiscs(state.discs, state.turn, row, col);
    if (affectedDiscs.length > 0) {
      const newDiscs = flipDiscs(state.discs, affectedDiscs, row, col, state.turn);
      const newTurn = state.turn === 'black' ? 'white' : 'black';
      dispatch({ type: 'SET_DISCS', payload: newDiscs });
      dispatch({ type: 'SET_SCORE', payload: calculateScore(newDiscs) });
      dispatch({ type: 'SET_TURN', payload: newTurn });
    }
  };

  const makeAIMove = () => {
    const aiMove = calculateAIMove(state.discs, state.turn, state.blockedCells);
    if (!aiMove) {
      dispatch({ type: 'SET_TURN', payload: state.turn === 'black' ? 'white' : 'black' });
      return;
    }

    const { row, col, affected } = aiMove;
    const newDiscs = flipDiscs(state.discs, affected, row, col, state.turn);
    const newTurn = state.turn === 'black' ? 'white' : 'black';
    dispatch({ type: 'SET_DISCS', payload: newDiscs });
    dispatch({ type: 'SET_SCORE', payload: calculateScore(newDiscs) });
    dispatch({ type: 'SET_TURN', payload: newTurn });
  };

  const resetGame = (singlePlayer, aiAs) => {
    dispatch({ type: 'RESET_GAME', payload: { singlePlayer, aiAs } });
  };

  return (
    <View style={styles.container}>
      <ResultModal
        result={state.resultMessage}
        onClose={() => dispatch({ type: 'SET_RESULT_MESSAGE', payload: null })}
      />
      {!state.gameStarted ? (
        <GameModeSelection
          selectedMode={{ singlePlayer: state.isSinglePlayer, aiAs: state.aiPlayer }}
          onModeSelect={(singlePlayer, aiAs) => resetGame(singlePlayer, aiAs)}
          onStartGame={() => dispatch({ type: 'SET_GAME_STARTED', payload: true })}
        />
      ) : (
        <>
          <ScoreBoard blackScore={state.score.black} whiteScore={state.score.white} turn={state.turn} />
          <Board
            discs={state.discs}
            blockedCells={state.blockedCells}
            playableCells={state.playableCells}
            onCellPress={handleCellPress}
          />
          {state.gameOver && (
            <TouchableOpacity
              style={styles.restartButton}
              onPress={() => resetGame(false, null)}
            >
              <Text style={styles.restartButtonText}>Play Again</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#014421',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restartButton: {
    marginTop: 20,
    backgroundColor: '#FF4500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ReversiGame;
