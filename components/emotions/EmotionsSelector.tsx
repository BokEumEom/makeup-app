import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import CustomText from '@/components/common/CustomText';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type EmotionIconName =
  | 'emoticon-happy-outline'
  | 'emoticon-cry-outline'
  | 'emoticon-angry-outline'
  | 'emoticon-dead-outline'
  | 'emoticon-confused-outline'
  | 'emoticon-neutral-outline';

type Emotion = {
  title: string;
  description: string;
  colors: readonly [string, string];
  icon: EmotionIconName;
  route: `/emotions/${string}`;
};

const emotions: Emotion[] = [
  {
    title: '긍정적 감정',
    description: '현재 기분이 긍정적이에요.',
    colors: ['#FFE082', '#FFD54F'],
    icon: 'emoticon-happy-outline',
    route: '/emotions/positiveEmotions',
  },
  {
    title: '슬픔/우울감',
    description: '현재 기분이 우울해요.',
    colors: ['#90CAF9', '#64B5F6'],
    icon: 'emoticon-cry-outline',
    route: '/emotions/sadness',
  },
  {
    title: '분노/짜증',
    description: '현재 기분이 화가 나요.',
    colors: ['#EF9A9A', '#E57373'],
    icon: 'emoticon-angry-outline',
    route: '/emotions/anger',
  },
  {
    title: '스트레스/압박감',
    description: '현재 스트레스를 받고 있어요.',
    colors: ['#FFCC80', '#FFB74D'],
    icon: 'emoticon-dead-outline',
    route: '/emotions/stress',
  },
  {
    title: '불안/불확실감',
    description: '현재 기분이 불안해요.',
    colors: ['#B39DDB', '#9575CD'],
    icon: 'emoticon-confused-outline',
    route: '/emotions/anxiety',
  },
  {
    title: '무관심/흥미 상실',
    description: '현재 아무런 흥미를 느끼지 않아요.',
    colors: ['#CFD8DC', '#B0BEC5'],
    icon: 'emoticon-neutral-outline',
    route: '/emotions/apathy',
  },
];

export default function EmotionsSlider() {
  const translateX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // 스크롤 핸들러
  const onScroll = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x / SCREEN_WIDTH;
  });

  // 애니메이션 스타일
  const getAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const scale = interpolate(
        translateX.value,
        [index - 1, index, index + 1],
        [1.4, 1, 1.4]
      );

      const rotate = `${interpolate(
        translateX.value,
        [index - 1, index, index + 1],
        [-10, 0, 10]
      )}deg`;

      return {
        transform: [{ scale }, { rotate }],
      };
    });
  };

  const handleSetMood = () => {
    const selectedEmotion = emotions[currentIndex];
    router.push(selectedEmotion.route);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={{ paddingHorizontal: (SCREEN_WIDTH - 500) / 2 }}
      >
        {emotions.map((emotion, index) => (
          <Animated.View
            key={index}
            style={[styles.slide, getAnimatedStyle(index)]}
          >
            <LinearGradient
              colors={emotion.colors}
              style={[styles.gradient, { width: 300, height: SCREEN_HEIGHT * 0.5 }]}
            >
              <CustomText style={styles.title}>오늘의 감정 상태는?</CustomText>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={emotion.icon}
                  size={200}
                  color="#FFF"
                />
              </View>
              <CustomText style={styles.description}>
                {emotion.description}
              </CustomText>
            </LinearGradient>
          </Animated.View>
        ))}
      </Animated.ScrollView>

      <TouchableOpacity style={styles.setMoodButton} onPress={handleSetMood}>
        <CustomText style={styles.setMoodText}>LETS GO!</CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH, // 슬라이더의 너비를 화면 너비로 맞춤
  },
  gradient: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    width: SCREEN_WIDTH * 0.8, // 화면 너비의 80%로 설정
    height: SCREEN_HEIGHT * 0.5, // 화면 높이의 50%로 설정
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  setMoodButton: {
    position: 'absolute',
    bottom: 30,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  setMoodText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
