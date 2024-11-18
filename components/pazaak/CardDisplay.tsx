import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
} from 'react-native-reanimated';

type CardDisplayProps = {
  value: number | null;
  hidden?: boolean;
  type?: 'main' | 'side';
  index?: number;
  animationDirection?: 'left' | 'up' | 'down';
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.15;
const cardHeight = cardWidth * 1.5;

const CardDisplay: React.FC<CardDisplayProps> = ({
  value,
  hidden = false,
  type = 'main',
  index = 0,
  animationDirection = 'left',
}) => {
  const isEmpty = value === null;
  const shouldShowIcon = type === 'side' && hidden;

  // 딜러가 나눠주는 메인 덱 카드만 #0AD6A0 색상으로 설정
  const cardColor = type === 'main' && !hidden ? '#0AD6A0' : value && value < 0 ? '#EF466F' : '#2196f3';

  // 기호 결정
  const symbol = value !== null && value > 0 ? '+' : value !== null && value < 0 ? '-' : '';

  // 애니메이션 초기 위치값 설정
  const translateX = useSharedValue(animationDirection === 'left' ? -100 : 0);
  const translateY = useSharedValue(animationDirection === 'up' ? -100 : 0);
  const scale = useSharedValue(0.8);

  // 애니메이션 스타일 정의
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  useEffect(() => {
    const delay = index * 100;

    // 카드의 등장 애니메이션
    translateX.value = withDelay(
      delay,
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(animationDirection === 'left' ? -10 : 10, { duration: 100 })
      )
    );
    translateY.value = withDelay(delay, withTiming(0, { duration: 500 }));
    scale.value = withDelay(delay, withTiming(1, { duration: 500 }));
  }, [translateX, translateY, scale, animationDirection, index]);

  return (
    <Animated.View
      style={[
        styles.card,
        isEmpty ? styles.emptySlot : [styles.occupiedSlot, { backgroundColor: cardColor }],
        shouldShowIcon && styles.hiddenCard,
        animatedStyle,
      ]}
    >
      {shouldShowIcon ? (
        <Ionicons name="diamond-sharp" style={styles.diamondIcon} />
      ) : !isEmpty ? (
        <>
          <Text style={[styles.symbol, styles.topLeftSymbol]}>{symbol}</Text>
          <Text style={[styles.symbol, styles.bottomRightSymbol]}>{symbol}</Text>
          <View style={styles.stripe}>
            <View style={styles.diamond} />
          </View>
          <Text style={styles.number}>{value > 0 ? `+${value}` : value}</Text>
        </>
      ) : null}
    </Animated.View>
  );
};

export default CardDisplay;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    position: 'relative',
  },
  emptySlot: {
    borderWidth: 2,
    borderColor: '#aaa',
    backgroundColor: 'transparent',
  },
  occupiedSlot: {
    borderWidth: 4,
    borderColor: '#fff',
  },
  hiddenCard: {
    backgroundColor: '#555',
    borderColor: '#777',
  },
  stripe: {
    position: 'absolute',
    width: '100%',
    height: 0.25 * cardHeight,
    backgroundColor: 'white',
    top: '50%',
    transform: [{ translateY: -0.125 * cardHeight }],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  diamondIcon: {
    fontSize: 0.4 * cardWidth,
    color: '#fff',
    position: 'absolute',
    zIndex: 2,
  },
  diamond: {
    width: 0.5 * cardWidth,
    height: 0.5 * cardWidth,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
  },
  number: {
    color: '#0099ff',
    fontSize: 0.3 * cardWidth,
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
    position: 'relative',
    zIndex: 3,
  },
  symbol: {
    fontSize: 0.2 * cardWidth,
    color: 'white',
    position: 'absolute',
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
  },
  topLeftSymbol: {
    top: 10,
    left: 10,
  },
  bottomRightSymbol: {
    bottom: 10,
    right: 10,
  },
});
