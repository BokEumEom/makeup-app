import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { FRUIT_SIZES } from '@/constants/FruitSizes';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

const screenHeight = Dimensions.get('window').height;

type FruitProps = {
  type: string;
  position: { x: number; y: number };
  radius: number;
};

const Fruit: React.FC<FruitProps> = ({ type, position, radius }) => {
  const fruitData = FRUIT_SIZES[type];
  const fruitImage = fruitData?.img;

  // Shared values for offset positions
  const offsetX = useSharedValue(position.x - radius);
  const offsetY = useSharedValue(position.y - radius);

  // Define the drop function
  const dropFruit = () => {
    offsetY.value = withTiming(screenHeight - radius * 2, { duration: 1000 });
  };

  // Animated style for the fruit position
  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    top: 0,
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
    width: radius * 2,
    height: radius * 2,
  }));

  // Define the pan gesture
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      // Initial setup when the gesture starts
    })
    .onUpdate((event) => {
      offsetX.value = event.translationX + position.x - radius;
    })
    .onEnd(() => {
      // Run the drop function when the pan gesture ends
      runOnJS(dropFruit)();
    });

  if (!fruitData || !fruitImage) {
    console.error(`Fruit data not found for type: ${type}`);
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.fruitContainer}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>
          <Image source={fruitImage} style={styles.fruitImage} resizeMode="contain" />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  fruitContainer: {
    flex: 1,
  },
  fruitImage: {
    width: '100%',
    height: '100%',
  },
});

export default Fruit;
