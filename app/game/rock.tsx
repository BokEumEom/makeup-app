import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { determineWinner, getRandomChoice, choices, Choice } from '@/utils/play';
import ScoreBoard from '@/components/game/ScoreBoard';
import ResultModal from '@/components/game/ResultModal';
import { Header } from '@/components/common/Header';
import ConfirmationModal from '@/components/common/Modal'; // Import the modal

const images = {
  Rock: require('../../assets/game-images/rock.jpg'),
  Scissors: require('../../assets/game-images/scissors.jpg'),
  Paper: require('../../assets/game-images/paper.jpg'),
};

const ledImages = {
  Rock: require('../../assets/game-images/rock-led.png'),
  Scissors: require('../../assets/game-images/scissors-led.png'),
  Paper: require('../../assets/game-images/paper-led.png'),
};

const { width } = Dimensions.get('window');
const DISPLAY_SIZE = Math.min(width * 0.6, 300);

export default function RockPaperScissorsGame() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const spinValue = useRef(new Animated.Value(0)).current;
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [currentImage, setCurrentImage] = useState(ledImages.Rock);
  const [userSelected, setUserSelected] = useState(false);
  const scaleValues = choices.map(() => useRef(new Animated.Value(1)).current);
  const sound = useRef<Audio.Sound | null>(null);
  const opacity = useRef(new Animated.Value(1)).current;
  const imageInterval = useRef<NodeJS.Timer | null>(null);

  const handlePressIn = (index: number) => {
    Animated.spring(scaleValues[index], {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number, choice: Choice) => {
    Animated.spring(scaleValues[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    playGame(choice);
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

  useEffect(() => {
    if (!userSelected) {
      const ledImageKeys = Object.keys(ledImages) as Choice[];
      let index = 0;
      imageInterval.current = setInterval(() => {
        setCurrentImage(ledImages[ledImageKeys[index]]);
        triggerFade();
        index = (index + 1) % ledImageKeys.length;
      }, 500);

      return () => {
        if (imageInterval.current) {
          clearInterval(imageInterval.current);
        }
      };
    }
  }, [userSelected]);

  const playGame = (choice: Choice) => {
    setUserSelected(true);
    setUserChoice(choice);

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0);

      const randomChoice = getRandomChoice();
      setComputerChoice(randomChoice);

      const formattedChoice = randomChoice.charAt(0).toUpperCase() + randomChoice.slice(1);
      setCurrentImage(ledImages[formattedChoice as keyof typeof ledImages]);

      const gameResult = determineWinner(choice, randomChoice);
      setResult(gameResult);
      updateScore(gameResult);

      setTimeout(() => {
        setUserSelected(false);
      }, 1000);
    });
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
    setCurrentImage(ledImages.Rock);
  };

  const confirmResetGame = () => {
    resetGame();
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Rock-Paper-Scissors" showBackButton />

      <View style={styles.content}>
        <View style={styles.wheel}>
          <Animated.Image source={currentImage} style={[styles.ledImage, { opacity }]} />
        </View>

        <View style={styles.choicesContainer}>
          {choices.map((choice, index) => (
            <Pressable
              key={choice}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index, choice)}
              style={styles.choiceButton}
            >
              <Animated.Image
                source={images[choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase()]}
                style={[styles.choiceImage, { transform: [{ scale: scaleValues[index] }] }]}
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </View>

        {result && <ResultModal result={result} onClose={() => setResult(null)} />}

        <ScoreBoard wins={score.wins} losses={score.losses} draws={score.draws} />

        <Pressable onPress={() => setShowModal(true)} style={styles.resetButton}>
          <View style={styles.resetButtonGradient}>
            <Text style={styles.resetButtonText}>New Game</Text>
          </View>
        </Pressable>
      </View>

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        visible={showModal}
        onConfirm={confirmResetGame}
        onCancel={() => setShowModal(false)}
        message="Are you sure you want to reset the game?"
        confirmText="Start New Game"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c669f',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
  },
  wheel: {
    width: DISPLAY_SIZE,
    height: DISPLAY_SIZE,
    borderRadius: DISPLAY_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  ledImage: {
    width: DISPLAY_SIZE - 20,
    height: DISPLAY_SIZE - 20,
    borderRadius: (DISPLAY_SIZE - 20) / 2,
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  choiceButton: {
    borderRadius: 50,
    overflow: 'hidden',
    marginHorizontal: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  choiceImage: {
    width: '100%',
    height: '100%',
  },
  resetButton: {
    borderRadius: 30,
    overflow: 'hidden',
    width: '60%',
  },
  resetButtonGradient: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF416C',
  },
  resetButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
