// components/memory/Card.tsx
import React from 'react';
import { View, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    withSequence, 
    withRepeat 
} from 'react-native-reanimated';

type CardProps = {
  card: {
    id: string;
    image: any;
    isFlipped: boolean;
    isMatched: boolean;
  };
  onPress: () => void;
};

const Card: React.FC<CardProps> = ({ card, onPress }) => {
  // Shared values for bounce and glow animations
  const scale = useSharedValue(1);
  const glow = useSharedValue(0);

  // Update animations based on the card state
  React.useEffect(() => {
    if (card.isMatched) {
      // Trigger glowing effect when card is matched
      glow.value = withRepeat(withTiming(1, { duration: 300 }), 4, true);
    }
  }, [card.isMatched]);

  // Bounce animation for press action
  const handlePressIn = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    onPress();
  };

  // Flip animation and glow effect style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: glow.value,
  }));

  return (
    <Pressable onPressIn={handlePressIn} disabled={card.isMatched} style={styles.cardContainer}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {card.isFlipped || card.isMatched ? (
          <Image source={card.image} style={styles.cardImage} />
        ) : (
          <View style={styles.cardBack} />
        )}
      </Animated.View>
    </Pressable>
  );
};

const { width } = Dimensions.get('window');
const CARD_SIZE = width / 5;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 5,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    backfaceVisibility: 'hidden',
    shadowColor: '#ffd700', // Glow color for matches
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  cardBack: {
    width: '100%',
    height: '100%',
    backgroundColor: '#6c757d',
    borderRadius: 8,
  },
});

export default Card;
