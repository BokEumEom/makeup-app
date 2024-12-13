// components/quiz/ChatMessage.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import CustomText from '@/components/common/CustomText';
import TypingIndicator from '@/components/quiz/TypingIndicator';

interface ChatMessageProps {
  type: 'story' | 'question' | 'player' | 'feedback' | 'typing';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  const translateY = useSharedValue(20);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const maxWidth = Dimensions.get('window').width * 0.8;

  return (
    <Animated.View style={[styles.container, styles[type], animatedStyle, { maxWidth }]}>
      {type === 'typing' ? (
        <TypingIndicator />
      ) : (
        <CustomText style={styles.text}>{content}</CustomText>
      )}
    </Animated.View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  story: {
    backgroundColor: '#E9EDF5',
    alignSelf: 'flex-start',
  },
  question: {
    backgroundColor: '#D1D9E6',
    alignSelf: 'flex-start',
  },
  player: {
    backgroundColor: '#B2C2DD',
    alignSelf: 'flex-end',
  },
  feedback: {
    backgroundColor: '#ADB5BD',
    alignSelf: 'center',
  },
  typing: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
  text: {
    color: '#333333',
    fontSize: 16,
  },
});
