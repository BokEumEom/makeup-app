import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert, Animated, Easing } from 'react-native';
import { PazaakshuffleArray } from '@/utils/helpers';

type Player = 'player' | 'opponent';

interface PazaakGameContextProps {
  gameStarted: boolean;
  gameOver: boolean;
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
  roundResult: string | null;
  startGame: () => void;
  resetGame: () => void;
  handlePlayerTurn: () => void;
  handleStand: () => void;
  playSideCard: (cardValue: number, index: number) => void;
  handleEndTurn: () => void;
}

const PazaakGameContext = createContext<PazaakGameContextProps | undefined>(undefined);

export const PazaakGameProvider: React.FC = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [roundResult, setRoundResult] = useState<string | null>(null);
  const [playerTotalScore, setPlayerTotalScore] = useState(0);
  const [opponentTotalScore, setOpponentTotalScore] = useState(0);
  const [playerRoundWins, setPlayerRoundWins] = useState(0);
  const [opponentRoundWins, setOpponentRoundWins] = useState(0);
  const [currentTurn, setCurrentTurn] = useState<Player | null>(null);
  const [deck, setDeck] = useState<number[]>([]);
  const [playerCards, setPlayerCards] = useState<(number | null)[]>(Array(9).fill(null));
  const [opponentCards, setOpponentCards] = useState<(number | null)[]>(Array(9).fill(null));
  const [playerSideDeck, setPlayerSideDeck] = useState<number[]>([]);
  const [opponentSideDeck, setOpponentSideDeck] = useState<number[]>([]);
  const [playerHasStood, setPlayerHasStood] = useState(false);
  const [opponentHasStood, setOpponentHasStood] = useState(false);
  const [playerUsedSideCardThisTurn, setPlayerUsedSideCardThisTurn] = useState(false);

  const cardAnimation = new Animated.Value(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    initializeDeck();
    initializeSideDeck();
    resetGame();
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setRoundResult(null);
    setPlayerTotalScore(0);
    setOpponentTotalScore(0);
    setPlayerRoundWins(0);
    setOpponentRoundWins(0);
    resetRound();
    initializeDeck();
    initializeSideDeck();
  };

  const initializeDeck = () => {
    const newDeck = Array(40).fill(0).map((_, i) => (i % 10) + 1);
    setDeck(PazaakshuffleArray(newDeck));
  };

  const initializeSideDeck = () => {
    const generateRandomSideDeck = () => {
      const deck = [];
      while (deck.length < 4) {
        const cardValue = Math.floor(Math.random() * (6 - -6 + 1)) + -6;
        if (cardValue !== 0) deck.push(cardValue);
      }
      return deck;
    };
    setPlayerSideDeck(generateRandomSideDeck());
    setOpponentSideDeck(generateRandomSideDeck());
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setPlayerRoundWins(0);
    setOpponentRoundWins(0);
    startRound();
  };

  const startRound = () => {
    resetRound();
    setCurrentTurn('player');
    dealerDrawCard('player');
  };

  const resetRound = () => {
    setPlayerTotalScore(0);
    setOpponentTotalScore(0);
    setPlayerCards(Array(9).fill(null));
    setOpponentCards(Array(9).fill(null));
    setPlayerHasStood(false);
    setOpponentHasStood(false);
    setPlayerUsedSideCardThisTurn(false);
    setRoundResult(null);
  };

  const switchTurn = () => {
    if (playerHasStood && opponentHasStood) {
      checkRoundWinner();
    } else if (currentTurn === 'player') {
      setCurrentTurn('opponent');
      setTimeout(() => dealerDrawCard('opponent'), 1000);
    } else {
      setCurrentTurn('player');
      dealerDrawCard('player');
    }
    setPlayerUsedSideCardThisTurn(false);
  };

  const drawCard = (): number | undefined => {
    if (deck.length === 0) {
      initializeDeck();
    }
    const [card, ...remainingDeck] = deck;
    setDeck(remainingDeck);
    return card;
  };

  const dealerDrawCard = (player: Player) => {
    const card = drawCard();
    if (card !== undefined) {
      placeCardOnBoard(player, card);
      if ((player === 'player' && playerTotalScore > 20) || (player === 'opponent' && opponentTotalScore > 20)) {
        if (player === 'player') setPlayerHasStood(true);
        if (player === 'opponent') setOpponentHasStood(true);
        checkRoundWinner();
      }
    }
  };

  const animateCard = () => {
    Animated.timing(cardAnimation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      cardAnimation.setValue(0); // Reset animation
    });
  };

  const handlePlayerTurn = () => {
    if (currentTurn !== 'player') return;
    dealerDrawCard('player');
    animateCard();
  };

  const handleStand = () => {
    if (currentTurn === 'player') {
      setPlayerHasStood(true);
      switchTurn();
    }
  };

  const handleEndTurn = () => {
    if (currentTurn === 'player') {
      switchTurn();
    }
  };

  const playSideCard = (cardValue: number, index: number) => {
    if (currentTurn !== 'player') {
      Alert.alert('현재 턴이 아닙니다.');
      return;
    }
    if (playerUsedSideCardThisTurn) {
      Alert.alert('이번 턴에 이미 사이드카드를 사용했습니다.');
      return;
    }
    placeCardOnBoard('player', cardValue);
    setPlayerSideDeck((prevDeck) => prevDeck.filter((_, i) => i !== index));
    setPlayerUsedSideCardThisTurn(true);
    animateCard();
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
    if (gameOver) return;

    if (playerTotalScore > 20 && opponentTotalScore > 20) {
      setRoundResult("tie");
    } else if (playerTotalScore > 20) {
      setRoundResult("lose");
      setOpponentRoundWins((wins) => wins + 1);
    } else if (opponentTotalScore > 20) {
      setRoundResult("win");
      setPlayerRoundWins((wins) => wins + 1);
    } else if (playerTotalScore > opponentTotalScore) {
      setRoundResult("win");
      setPlayerRoundWins((wins) => wins + 1);
    } else if (opponentTotalScore > playerTotalScore) {
      setRoundResult("lose");
      setOpponentRoundWins((wins) => wins + 1);
    } else {
      setRoundResult("tie");
    }

    if (playerRoundWins >= 3 || opponentRoundWins >= 3) {
      setGameOver(true);
      setRoundResult(playerRoundWins > opponentRoundWins ? "gameWin" : "gameLose");
    } else {
      startRound();
    }
  };

  return (
    <PazaakGameContext.Provider
      value={{
        gameStarted,
        gameOver,
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
        roundResult,
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
