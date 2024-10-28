// components/game/LEDCircle.tsx

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface LEDCircleProps {
  isOn: boolean;
}

const LEDCircle: React.FC<LEDCircleProps> = ({ isOn }) => {
  const ledOpacity = useSharedValue(1);

  useEffect(() => {
    ledOpacity.value = withRepeat(
      withTiming(0.2, { duration: 500 }),
      -1,
      true
    );

    return () => {
      ledOpacity.value = 1;
    };
  }, [ledOpacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: isOn ? ledOpacity.value : 0.2,
  }));

  return (
    <Animated.View
      style={[
        styles.led,
        isOn ? styles.ledOn : styles.ledOff,
        animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  led: {
    width: 16,
    height: 16,
    borderRadius: 8,
    margin: 1,
  },
  ledOn: {
    backgroundColor: '#ff0000',
  },
  ledOff: {
    backgroundColor: '#300000',
  },
});

export default LEDCircle;
