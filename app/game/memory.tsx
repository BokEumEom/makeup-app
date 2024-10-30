import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Header } from '@/components/common/Header';
import Card from '@/components/memory/Card';
import { Button } from '@/components/common/Button';
import ConfirmationModal from '@/components/common/Modal';
import ResultModal from '@/components/game/ResultModal';
import { shuffleArray } from '@/utils/helpers';
import { Asset } from 'expo-asset';

type MemoryCard = {
  id: string;
  image: any;
  isFlipped: boolean;
  isMatched: boolean;
};

const cardImages = [
  require('@/assets/game-images/french-fries.png'),
  require('@/assets/game-images/chicken.png'),
  require('@/assets/game-images/hot-dog.png'),
  require('@/assets/game-images/donut.png'),
  require('@/assets/game-images/japanese-food.png'),
  require('@/assets/game-images/ice-cream.png'),
  require('@/assets/game-images/burger.png'),
  require('@/assets/game-images/cake.png'),
];

// Preload essential card images
const preloadImages = async () => {
  const imageAssets = cardImages.map((image) => Asset.fromModule(image).downloadAsync());
  await Promise.all(imageAssets);
};

export default function MemoryGameScreen() {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadAssets = async () => {
      await preloadImages();
      setIsAssetsLoaded(true);
      initializeGame();
    };
    loadAssets();
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setGameCompleted(true);
    }
  }, [cards]);

  const initializeGame = useCallback(() => {
    const initialCards = shuffleArray(
      [...cardImages, ...cardImages].map((image, index) => ({
        id: `${index}`,
        image,
        isFlipped: false,
        isMatched: false,
      }))
    );
    setCards(initialCards);
    setScore(0);
    setMoves(0);
    setGameCompleted(false);
  }, []);

  const onCardPress = useCallback(
    (card: MemoryCard) => {
      if (flippedCards.length === 2 || card.isFlipped || card.isMatched) return;

      const flipped = { ...card, isFlipped: true };
      const newCards = cards.map((c) => (c.id === card.id ? flipped : c));
      setCards(newCards);
      setFlippedCards([...flippedCards, flipped]);

      if (flippedCards.length === 1) {
        setMoves((prevMoves) => prevMoves + 1);

        if (flippedCards[0].image === card.image) {
          setScore((prevScore) => prevScore + 1);
          setCards((prevCards) =>
            prevCards.map((c) => (c.image === card.image ? { ...c, isMatched: true } : c))
          );
          setFlippedCards([]);
        } else {
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((c) =>
                c.id === card.id || c.id === flippedCards[0].id ? { ...c, isFlipped: false } : c
              )
            );
            setFlippedCards([]);
          }, 700); // Reduced delay for faster reset
        }
      }
    },
    [flippedCards, cards]
  );

  const handleNewGamePress = () => {
    setShowModal(true);
  };

  const confirmNewGame = () => {
    setShowModal(false);
    initializeGame();
  };

  if (!isAssetsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Memory Game" showBackButton />

      <View style={styles.content}>
        <Text style={styles.scoreText}>Score: {score} | Moves: {moves}</Text>

        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          numColumns={4}
          renderItem={({ item }) => <Card card={item} onPress={() => onCardPress(item)} />}
          contentContainerStyle={styles.cardsContainer}
        />

        <Button title="New Game" onPress={handleNewGamePress} style={styles.restartButton} />
      </View>

      <ConfirmationModal
        visible={showModal}
        onConfirm={confirmNewGame}
        onCancel={() => setShowModal(false)}
        message="Are you sure you want to start a new game? All progress will be lost."
        confirmText="Start New Game"
        cancelText="Cancel"
      />

      <ResultModal
        result={gameCompleted ? `You matched all cards in ${moves} moves!` : null}
        onClose={() => setGameCompleted(false)}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const CARD_SIZE = width / 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  restartButton: {
    marginTop: 20,
    width: '60%',
  },
});
