// components/numberpuz/NumberPuzzleMenu.tsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, Image } from 'react-native';
import { Puzzle } from 'lucide-react-native';
import CustomText from '@/components/common/CustomText';

interface NumberPuzzleMenuProps {
  onSelectSize: (size: number) => void;
}

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.65;
const BUTTON_HEIGHT = 60;

const NumberPuzzleMenu: React.FC<NumberPuzzleMenuProps> = ({ onSelectSize }) => {
  const scale3x3 = useRef(new Animated.Value(1)).current;
  const scale4x4 = useRef(new Animated.Value(1)).current;
  const scale5x5 = useRef(new Animated.Value(1)).current;

  const onPressIn = (animValue: Animated.Value) => {
    Animated.spring(animValue, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10
    }).start();
  };

  const onPressOut = (animValue: Animated.Value, size: number) => {
    Animated.spring(animValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10
    }).start(() => {
      onSelectSize(size);
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>숫자 퍼즐</Text>
      <Text style={styles.subtitle}>원하는 퍼즐 크기를 선택하세요!</Text>

      <TouchableWithoutFeedback
        onPressIn={() => onPressIn(scale3x3)}
        onPressOut={() => onPressOut(scale3x3, 9)}
      >
        <Animated.View style={[styles.button, styles.button3x3, { transform: [{ scale: scale3x3 }] }]}>
          <View style={styles.iconRow}>
            <Puzzle color="#333" size={24} strokeWidth={2} />
            <CustomText style={styles.buttonText}>3x3</CustomText>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPressIn={() => onPressIn(scale4x4)}
        onPressOut={() => onPressOut(scale4x4, 16)}
      >
        <Animated.View style={[styles.button, styles.button4x4, { transform: [{ scale: scale4x4 }] }]}>
          <View style={styles.iconRow}>
            <Puzzle color="#333" size={24} strokeWidth={2} />
            <CustomText style={styles.buttonText}>4x4</CustomText>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPressIn={() => onPressIn(scale5x5)}
        onPressOut={() => onPressOut(scale5x5, 25)}
      >
        <Animated.View style={[styles.button, styles.button5x5, { transform: [{ scale: scale5x5 }] }]}>
          <View style={styles.iconRow}>
            <Puzzle color="#333" size={24} strokeWidth={2} />
            <CustomText style={styles.buttonText}>5x5</CustomText>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NumberPuzzleMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: 30,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  button3x3: {
    backgroundColor: '#FFCDD2', // 파스텔 핑크 톤
  },
  button4x4: {
    backgroundColor: '#C8E6C9', // 파스텔 그린 톤
  },
  button5x5: {
    backgroundColor: '#B3E5FC', // 파스텔 블루 톤
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8, // 아이콘과 텍스트 사이 간격
  },
});
