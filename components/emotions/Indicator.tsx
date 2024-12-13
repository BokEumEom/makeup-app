import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  SharedValue,
  withSpring,
  useDerivedValue,
} from 'react-native-reanimated';

// Constants
const DOT_CONTAINER_SIZE = 16;
const DOT_SIZE = DOT_CONTAINER_SIZE / 2;
const ACTIVE_DOT_COLOR = '#333';
const INACTIVE_DOT_COLOR = '#AAA';
const SPACING = 8;

function Dot({ index, animation }: { index: number; animation: SharedValue<number> }) {
  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [index - 1, index, index + 1],
        [INACTIVE_DOT_COLOR, ACTIVE_DOT_COLOR, INACTIVE_DOT_COLOR]
      ),
      transform: [
        {
          scale: withSpring(
            animation.value === index ? 1.2 : 1, // Slightly enlarge the active dot
            {
              damping: 20,
              stiffness: 150,
            }
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.dotContainer}>
      <Animated.View style={[styles.dot, stylez]} />
    </View>
  );
}

export function Indicator({
  total,
  selectedIndex,
}: {
  total: number;
  selectedIndex: number;
}) {
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 20,
      stiffness: 150,
    });
  });

  return (
    <View style={styles.paginationContainer}>
      {[...Array(total).keys()].map((i) => (
        <Dot key={`dot-${i}`} index={i} animation={animation} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    width: DOT_CONTAINER_SIZE,
    height: DOT_CONTAINER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: INACTIVE_DOT_COLOR,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING,
    marginVertical: SPACING,
  },
});
