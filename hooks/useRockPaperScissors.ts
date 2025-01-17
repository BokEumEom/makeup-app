import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { Choice, determineWinner, getRandomChoice, choices } from '@/utils/play';

export const useRockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [currentImage, setCurrentImage] = useState<number>(require('@/assets/game-images/rock-led.png'));
  const [userSelected, setUserSelected] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const scaleValues = choices.map(() => useRef(new Animated.Value(1)).current);
  const opacity = useRef(new Animated.Value(1)).current;
  const imageInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // LED 이미지 매핑
  const ledImages = {
    Rock: require('@/assets/game-images/rock-led.png'),
    Scissors: require('@/assets/game-images/scissors-led.png'),
    Paper: require('@/assets/game-images/paper-led.png'),
  };

  useEffect(() => {
    // LED 이미지 순환 애니메이션
    if (!userSelected) {
      let index = 0;
      imageInterval.current = setInterval(() => {
        setCurrentImage(ledImages[choices[index]]);
        triggerFade();
        index = (index + 1) % choices.length;
      }, 500);

      return () => {
        if (imageInterval.current) {
          clearInterval(imageInterval.current);
        }
      };
    }
  }, [userSelected]);

  useEffect(() => {
    if (result) {
      setShowResultModal(true); // 결과가 설정되면 Modal을 열도록 설정
    }
  }, [result]);

  const playGame = (choice: Choice) => {
    setUserSelected(true);
    setUserChoice(choice);

    // 사용자 선택 LED 업데이트
    updateLEDImage(choice);

    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      const computer = getRandomChoice();
      setComputerChoice(computer);

      // 컴퓨터 선택 LED 업데이트
      setTimeout(() => {
        updateLEDImage(computer);
        calculateResult(choice, computer);
      }, 500);
    });
  };

  const calculateResult = (userChoice: Choice, computerChoice: Choice) => {
    const gameResult = determineWinner(userChoice, computerChoice);
    setResult(gameResult);
    updateScore(gameResult);

    // LED 애니메이션 재시작 대기
    setTimeout(() => {
      setUserSelected(false);
    }, 1000);
  };

  const updateScore = (gameResult: string) => {
    if (gameResult === 'You win!') {
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else if (gameResult === 'You lose!') {
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
    } else {
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ wins: 0, losses: 0, draws: 0 });
    setUserSelected(false);
    setCurrentImage(require('@/assets/game-images/rock-led.png'));
    setShowResultModal(false);
  };

  const updateLEDImage = (choice: Choice) => {
    setCurrentImage(ledImages[choice]);
  };

  const triggerFade = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    setShowResultModal(false);
    setResult(null);
  };

  return {
    userChoice,
    computerChoice,
    result,
    score,
    currentImage,
    scaleValues,
    opacity,
    showResultModal,
    playGame,
    resetGame,
    closeModal,
    triggerFade,
    handlePressIn: (index: number) => {
      Animated.spring(scaleValues[index], {
        toValue: 0.9,
        useNativeDriver: true,
      }).start();
    },
    handlePressOut: (index: number, choice: Choice) => {
      Animated.spring(scaleValues[index], {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      playGame(choice);
    },
  };
};
