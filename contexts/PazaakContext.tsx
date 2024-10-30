// context/PazaakContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { PazaakshuffleArray } from '@/utils/helpers';

type Player = 'player' | 'opponent';

interface PazaakGameContextProps {
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
  handlePlayerTurn: () => void;
  handleStand: () => void;
  playSideCard: (cardValue: number, index: number) => void;
  handleEndTurn: () => void;
}

const PazaakGameContext = createContext<PazaakGameContextProps | undefined>(
  undefined,
);

export const PazaakGameProvider: React.FC = ({ children }) => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [playerTotalScore, setPlayerTotalScore] = useState<number>(0);
  const [opponentTotalScore, setOpponentTotalScore] = useState<number>(0);
  const [playerRoundWins, setPlayerRoundWins] = useState<number>(0);
  const [opponentRoundWins, setOpponentRoundWins] = useState<number>(0);
  const [currentTurn, setCurrentTurn] = useState<Player | null>(null);
  const [deck, setDeck] = useState<number[]>([]);
  const [playerCards, setPlayerCards] = useState<(number | null)[]>(Array(9).fill(null));
  const [opponentCards, setOpponentCards] = useState<(number | null)[]>(Array(9).fill(null));
  const [playerSideDeck, setPlayerSideDeck] = useState<number[]>([]);
  const [opponentSideDeck, setOpponentSideDeck] = useState<number[]>([]);
  const [playerHasStood, setPlayerHasStood] = useState<boolean>(false);
  const [opponentHasStood, setOpponentHasStood] = useState<boolean>(false);
  const [playerUsedSideCardThisTurn, setPlayerUsedSideCardThisTurn] = useState<boolean>(false);

  // Initialize game state on load
  useEffect(() => {
    initializeGame();
  }, []);

  // Check opponent's turn logic
  useEffect(() => {
    if (gameStarted && currentTurn === 'opponent' && !opponentHasStood) {
      handleOpponentTurn();
    }
  }, [currentTurn, gameStarted]);

  // Initialize full game state
  const initializeGame = () => {
    initializeDeck();
    initializeSideDeck();
    resetRound();
    setPlayerRoundWins(0);
    setOpponentRoundWins(0);
  };

  // Reset state for quitting or starting a new game
  const resetGame = () => {
    setGameStarted(false);
    setPlayerTotalScore(0);
    setOpponentTotalScore(0);
    setPlayerRoundWins(0);
    setOpponentRoundWins(0);
    setPlayerCards(Array(9).fill(null));
    setOpponentCards(Array(9).fill(null));
    setPlayerSideDeck([]);
    setOpponentSideDeck([]);
    setCurrentTurn(null);
    setPlayerHasStood(false);
    setOpponentHasStood(false);
    setPlayerUsedSideCardThisTurn(false);
    initializeDeck();
    initializeSideDeck();
  };

  // Initialize main deck and shuffle
  const initializeDeck = () => {
    const newDeck = Array(40)
      .fill(0)
      .map((_, i) => (i % 10) + 1); // Values 1-10, repeated 4 times
    setDeck(PazaakshuffleArray(newDeck));
  };

  // Initialize randomized side decks
  const getRandomCardValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const initializeSideDeck = () => {
    const generateRandomSideDeck = () => {
      const deck = [];
      while (deck.length < 4) {
        const cardValue = getRandomCardValue(-6, 6);
        if (cardValue !== 0) deck.push(cardValue); // Exclude 0 as a valid card value
      }
      return deck;
    };

    setPlayerSideDeck(generateRandomSideDeck());
    setOpponentSideDeck(generateRandomSideDeck());
  };

  const startGame = () => {
    setGameStarted(true);
    startRound();
  };

  const startRound = () => {
    resetRound();
    setCurrentTurn('player');
  };

  const resetRound = () => {
    setPlayerTotalScore(0);
    setOpponentTotalScore(0);
    setPlayerCards(Array(9).fill(null));
    setOpponentCards(Array(9).fill(null));
    setPlayerHasStood(false);
    setOpponentHasStood(false);
    setPlayerUsedSideCardThisTurn(false);
  };

  const switchTurn = () => {
    if (playerHasStood && opponentHasStood) {
      checkRoundWinner();
    } else {
      setCurrentTurn((prevTurn) => (prevTurn === 'player' ? 'opponent' : 'player'));
      setPlayerUsedSideCardThisTurn(false);
    }
  };

  const drawCard = (): number | undefined => {
    if (deck.length === 0) return undefined;
    const [card, ...remainingDeck] = deck;
    setDeck(remainingDeck);
    return card;
  };

  const handlePlayerTurn = () => {
    if (currentTurn !== 'player') return;

    const card = drawCard();
    if (card !== undefined) {
      placeCardOnBoard('player', card);

      if (playerTotalScore >= 20) {
        setPlayerHasStood(true);
        Alert.alert(playerTotalScore > 20 ? 'You bust!' : 'You stand at 20!');
        switchTurn();
      }
    }
  };

  const handleOpponentTurn = () => {
    setTimeout(() => {
      const card = drawCard();
      if (card !== undefined) {
        placeCardOnBoard('opponent', card);
        
        if (opponentTotalScore >= 20) {
          setOpponentHasStood(true);
          Alert.alert(opponentTotalScore > 20 ? 'Opponent busts!' : 'Opponent stands at 20!');
        }
        switchTurn();
      }
    }, 1000);
  };

  const handleStand = () => {
    if (currentTurn === 'player') {
      setPlayerHasStood(true);
      Alert.alert('You stand!');
      switchTurn();
    }
  };

  const handleEndTurn = () => {
    if (currentTurn === 'player') {
      switchTurn();
    }
  };

  const playSideCard = (cardValue: number, index: number) => {
    if (currentTurn !== 'player' || playerUsedSideCardThisTurn) {
      Alert.alert('You can only play one side card per turn!');
      return;
    }
    placeCardOnBoard('player', cardValue);
    setPlayerSideDeck((prevDeck) => prevDeck.filter((_, i) => i !== index));
    setPlayerUsedSideCardThisTurn(true);
  };

  const placeCardOnBoard = (player: Player, cardValue: number) => {
    const setCards = player === 'player' ? setPlayerCards : setOpponentCards;
    const getCards = player === 'player' ? playerCards : opponentCards;
    const setTotalScore = player === 'player' ? setPlayerTotalScore : setOpponentTotalScore;
    const totalScore = player === 'player' ? playerTotalScore : opponentTotalScore;

    const nextIndex = getCards.findIndex((c) => c === null);
    if (nextIndex !== -1) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[nextIndex] = cardValue;
        return newCards;
      });
      setTotalScore(totalScore + cardValue);
    }
  };

  const checkRoundWinner = () => {
    let winnerMessage = '';
    
    // Determine the winner based on score
    if (playerTotalScore > 20 && opponentTotalScore > 20) {
      winnerMessage = "Both players bust! It's a tie.";
    } else if (playerTotalScore > 20) {
      winnerMessage = 'You bust! Opponent wins this round.';
      setOpponentRoundWins((wins) => wins + 1);
    } else if (opponentTotalScore > 20) {
      winnerMessage = 'Opponent busts! You win this round.';
      setPlayerRoundWins((wins) => wins + 1);
    } else if (playerTotalScore > opponentTotalScore) {
      winnerMessage = 'You win this round!';
      setPlayerRoundWins((wins) => wins + 1);
    } else if (opponentTotalScore > playerTotalScore) {
      winnerMessage = 'Opponent wins this round!';
      setOpponentRoundWins((wins) => wins + 1);
    } else {
      winnerMessage = "It's a tie!";
    }
  
    Alert.alert(winnerMessage);
    
    // Check for the final game winner based on rounds won (assuming a target of 3 rounds to win)
    if (playerRoundWins >= 3 || opponentRoundWins >= 3) {
      const gameWinner = playerRoundWins > opponentRoundWins ? 'You are the Game Winner!' : 'Opponent is the Game Winner!';
      Alert.alert(gameWinner);
      resetGame(); // Reset the game after determining the final winner
    } else {
      startRound();
    }
  };

  return (
    <PazaakGameContext.Provider
      value={{
        gameStarted,
        playerTotalScore,
        opponentTotalScore,
        playerRoundWins,
        opponentRoundWins,
        playerCards,
        opponentCards,
        playerSideDeck,
        opponentSideDeck,
        currentTurn,
        playerHasStood,
        opponentHasStood,
        startGame,
        resetGame,
        handlePlayerTurn,
        handleStand,
        playSideCard,
        handleEndTurn,
      }}
    >
      {children}
    </PazaakGameContext.Provider>
  );
};

export const usePazaakGame = () => {
  const context = useContext(PazaakGameContext);
  if (!context) {
    throw new Error('usePazaakGame must be used within a PazaakGameProvider');
  }
  return context;
};
