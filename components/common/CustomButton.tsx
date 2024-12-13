// components/common/CustomButton.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: object;
  containerStyles?: object;
}

const CustomButton = ({
  onPress,
  title,
  textStyles = {},
  containerStyles = {},
}: CustomButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95); // 버튼을 누르면 축소
  };

  const handlePressOut = () => {
    scale.value = withSpring(1); // 버튼에서 손을 떼면 원래 크기로
    onPress();
  };

  return (
    <Animated.View style={[styles.buttonContainer, containerStyles, animatedStyle]}>
      <Text
        style={[styles.buttonText, textStyles]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {title}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    minHeight: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default CustomButton;
