import React, { useEffect } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface FeedbackPopupProps {
  message: string;
  type: 'success' | 'error';
  onClose?: () => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ message, type, onClose }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 });
      if (onClose) onClose();
    }, 1500);
    return () => clearTimeout(timer);
  }, [message]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

export default FeedbackPopup;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.4,
    left: '50%',
    transform: [{ translateX: -125 }],
    width: 250,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
