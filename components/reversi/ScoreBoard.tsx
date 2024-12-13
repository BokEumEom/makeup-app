import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';

type ScoreBoardProps = {
  blackScore: number;
  whiteScore: number;
  turn: 'black' | 'white';
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ blackScore, whiteScore, turn }) => {
  const blackScale = useSharedValue(1);
  const whiteScale = useSharedValue(1);
  const blackOpacity = useSharedValue(0.8);
  const whiteOpacity = useSharedValue(0.8);

  useEffect(() => {
    if (turn === 'black') {
      blackScale.value = withSpring(1.1);
      whiteScale.value = withSpring(1);
      blackOpacity.value = withSpring(1);
      whiteOpacity.value = withSpring(0.8);
    } else {
      blackScale.value = withSpring(1);
      whiteScale.value = withSpring(1.1);
      blackOpacity.value = withSpring(0.8);
      whiteOpacity.value = withSpring(1);
    }
  }, [turn]);

  const blackCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: blackScale.value }],
    opacity: blackOpacity.value,
    backgroundColor: interpolateColor(
      blackOpacity.value,
      [0.8, 1],
      ['#F5F5F5', '#FFF9C4'] // Transition from gray to soft yellow
    ),
  }));

  const whiteCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: whiteScale.value }],
    opacity: whiteOpacity.value,
    backgroundColor: interpolateColor(
      whiteOpacity.value,
      [0.8, 1],
      ['#F5F5F5', '#FFF9C4'] // Transition from gray to soft yellow
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.scoreCard, blackCardStyle]}>
        <Text style={[styles.title, turn === 'black' && styles.activeTitle]}>
          Black
        </Text>
        <Text style={[styles.value, turn === 'black' && styles.activeValue]}>
          {blackScore}
        </Text>
      </Animated.View>
      <Animated.View style={[styles.scoreCard, whiteCardStyle]}>
        <Text style={[styles.title, turn === 'white' && styles.activeTitle]}>
          White
        </Text>
        <Text style={[styles.value, turn === 'white' && styles.activeValue]}>
          {whiteScore}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  scoreCard: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  activeTitle: {
    color: '#000',
    fontWeight: '700',
  },
  value: {
    fontSize: 28,
    fontWeight: '500',
    color: '#555',
    marginTop: 10,
  },
  activeValue: {
    color: '#000',
    fontWeight: '700',
  },
});

export default ScoreBoard;
