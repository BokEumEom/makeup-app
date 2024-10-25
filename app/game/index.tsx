import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { determineWinner, getRandomChoice, choices, Choice } from '@/utils/play';
import LEDDisplay from '@/components/game/LEDDisplay';
import ScoreBoard from '@/components/game/ScoreBoard';
import ResultModal from '@/components/game/ResultModal';
import { LED_PATTERNS } from '@/constants/LEDPatterns';

const images = {
  Rock: require('../../assets/game-images/rock.jpg'),
  Scissors: require('../../assets/game-images/scissors.jpg'),
  Paper: require('../../assets/game-images/paper.jpg'),
};

const { width } = Dimensions.get('window');
const DISPLAY_SIZE = Math.min(width * 0.6, 300);

export default function GameScreen() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [spinValue] = useState(new Animated.Value(0));
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [currentPattern, setCurrentPattern] = useState(LED_PATTERNS.Rock);
  const [userSelected, setUserSelected] = useState(false);
  const [scaleValues] = useState(choices.map(() => new Animated.Value(1)));

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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

  // LED 패턴을 주기적으로 전환하는 함수
  useEffect(() => {
    if (!userSelected) {
      const patterns = [LED_PATTERNS.Rock, LED_PATTERNS.Paper, LED_PATTERNS.Scissors];
      let index = 0;

      const interval = setInterval(() => {
        setCurrentPattern(patterns[index]);
        index = (index + 1) % patterns.length;
      }, 300);

      return () => clearInterval(interval);
    }
  }, [userSelected]);

  const playGame = (choice: Choice) => {
    setUserChoice(choice);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0);
      const randomChoice = getRandomChoice();
      setComputerChoice(randomChoice);
      const gameResult = determineWinner(choice, randomChoice);
      setResult(gameResult);
      updateScore(gameResult);
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
    setUserSelected(false); // 패턴 전환 재개
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Text style={styles.title}>Rock, Paper, Scissors</Text>

      {/* LED Display Wheel */}
      <Animated.View style={[styles.wheel, { transform: [{ rotate: spin }] }]}>
        <LEDDisplay pattern={currentPattern} />
      </Animated.View>

      {/* Game Choices */}
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

      {/* Result Modal */}
      {result && <ResultModal result={result} onClose={() => setResult(null)} />}

      {/* Scoreboard */}
      <ScoreBoard wins={score.wins} losses={score.losses} draws={score.draws} />

      {/* Reset Button */}
      <Pressable onPress={resetGame} style={styles.resetButton}>
        <LinearGradient colors={['#FF416C', '#FF4B2B']} style={styles.resetButtonGradient}>
          <Text style={styles.resetButtonText}>Reset Game</Text>
        </LinearGradient>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  wheel: {
    width: DISPLAY_SIZE,
    height: DISPLAY_SIZE,
    borderRadius: DISPLAY_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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
    width: 100,  // 버튼 크기를 이미지와 맞춤
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',  // 버튼 배경색 추가
  },
  choiceImage: {
    width: '100%',
    height: '100%',
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  resetButton: {
    borderRadius: 30,
    overflow: 'hidden',
    width: '60%',
    marginBottom: 40,
  },
  resetButtonGradient: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
