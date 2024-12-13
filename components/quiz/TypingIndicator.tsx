// components/quiz/TypingIndicator.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';

const TypingIndicator: React.FC = () => {
  const dot1Opacity = useSharedValue(0);
  const dot2Opacity = useSharedValue(0);
  const dot3Opacity = useSharedValue(0);

  useEffect(() => {
    dot1Opacity.value = withRepeat(
      withTiming(1, { duration: 500, easing: Easing.linear }),
      -1,
      true
    );
    dot2Opacity.value = withDelay(
      150,
      withRepeat(withTiming(1, { duration: 500, easing: Easing.linear }), -1, true)
    );
    dot3Opacity.value = withDelay(
      300,
      withRepeat(withTiming(1, { duration: 500, easing: Easing.linear }), -1, true)
    );
  }, []);

  const animatedStyle = (opacityValue: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => ({
      opacity: opacityValue.value,
    }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, animatedStyle(dot1Opacity)]} />
      <Animated.View style={[styles.dot, animatedStyle(dot2Opacity)]} />
      <Animated.View style={[styles.dot, animatedStyle(dot3Opacity)]} />
    </View>
  );
};

export default TypingIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    marginHorizontal: 2,
  },
});
