// components/tetris/Button.tsx
import React, { useRef } from 'react';
import { Text, TouchableWithoutFeedback, Animated, StyleSheet, ViewStyle } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

const AnimatedButton: React.FC<ButtonProps> = ({ label, onPress, style }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.buttonText}>{label}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default AnimatedButton;
