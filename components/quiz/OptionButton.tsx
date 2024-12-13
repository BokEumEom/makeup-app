// components/quiz/OptionButton.tsx
import React, { useEffect } from 'react';
import { Text, StyleSheet, ActionSheetIOS } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface OptionButtonProps {
  text: string;
  options: string[];
  onSelect: (selectedIndex: number) => void;
  isSelected: boolean;
  autoOpen: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  text,
  options,
  onSelect,
  isSelected,
  autoOpen,
}) => {
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue('#E9EDF5');

  // Update background color when isSelected changes
  useEffect(() => {
    backgroundColor.value = withTiming(isSelected ? '#8DC6FF' : '#E9EDF5', { duration: 200 });
  }, [isSelected]);

  // Automatically open ActionSheet when autoOpen is true
  useEffect(() => {
    if (autoOpen) {
      showActionSheet();
    }
  }, [autoOpen]);

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
    showActionSheet();
  };

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options, 'Cancel'],
        cancelButtonIndex: options.length,
        title: '옵션 선택',
        message: '아래의 옵션 중 하나를 선택하세요.',
      },
      (buttonIndex) => {
        if (buttonIndex !== options.length) {
          onSelect(buttonIndex);
        }
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: backgroundColor.value,
  }));

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default OptionButton;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
