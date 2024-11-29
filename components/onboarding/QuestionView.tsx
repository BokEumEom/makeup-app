import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface QuestionViewProps {
  question: { id: number; text: string; min: number; max: number };
  value: number;
  onValueChange: (value: number) => void;
}

export const QuestionView: React.FC<QuestionViewProps> = React.memo(
  ({ question, value, onValueChange }) => {
    const scale = useSharedValue(1);

    const handleValueChange = useCallback(
      (newValue: number) => {
        // 트리거 애니메이션
        scale.value = 1.5; // 애니메이션 시작
        scale.value = withSpring(1); // 다시 원래 크기로 돌아옴
        onValueChange(newValue); // 슬라이더 값 업데이트
      },
      [onValueChange]
    );

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    return (
      <View style={styles.contentContainer}>
        <View style={styles.speechBubble}>
          <Text style={styles.questionText}>{question.text}</Text>
          <View style={styles.speechBubbleTail} />
        </View>

        <Slider
          style={styles.slider}
          minimumValue={question.min}
          maximumValue={question.max}
          step={1}
          value={value}
          onValueChange={handleValueChange}
          minimumTrackTintColor="#6F5FD4"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#6F5FD4"
        />
        {/* 애니메이션을 적용한 숫자 */}
        <Animated.Text style={[styles.sliderValue, animatedStyle]}>
          {value}
        </Animated.Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 100,
  },
  speechBubble: {
    backgroundColor: '#FAFAFF',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    maxWidth: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
    marginBottom: 30,
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -9,
    left: '50%',
    marginLeft: -9,
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
    transform: [{ rotate: '-45deg' }],
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    letterSpacing: -0.75,
  },
  slider: {
    width: width * 0.9,
    height: 40,
    marginTop: 20,
  },
  sliderValue: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
    color: '#6F5FD4',
  },
});
