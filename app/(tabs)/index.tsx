import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Button } from '../../components/common/Button';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 10;
const CARD_WIDTH = (width - 40 - CARD_MARGIN) / 2;

type CardData = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: [string, string];
  link: string;
};

const DashboardCard: React.FC<CardData> = ({ title, subtitle, icon, colors, link }) => (
  <Link href={link} asChild>
    <TouchableOpacity style={styles.card}>
      <LinearGradient colors={colors} style={styles.cardBackground}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color="#fff" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  </Link>
);

const dashboardData: CardData[] = [
  {
    title: '상황 기록',
    subtitle: '갈등의 순간을 기록하세요',
    icon: 'document-text-outline',
    colors: ['#A7C7E7', '#6A92B8'],
    link: '/situations',
  },
  {
    title: 'MBTI',
    subtitle: '성격 유형을 알아보세요',
    icon: 'heart-outline',
    colors: ['#E6C3D5', '#B88AA6'],
    link: '/mbti',
  },
  {
    title: '게임',
    subtitle: '간단한 게임으로 생각을 잠시 멈추세요.',
    icon: 'rocket-outline',
    colors: ['#C3E6CB', '#8AB89E'],
    link: '/game',
  },
  {
    title: '시나리오',
    subtitle: '상황 시뮬레이션 스토리',
    icon: 'book-outline',
    colors: ['#FFE5B4', '#D4A76A'],
    link: '/scenario',
  },
  {
    title: '명상',
    subtitle: '명상으로 자신을 돌보세요',
    icon: 'hourglass-outline',
    colors: ['#B8D0E6', '#6A92B8'],
    link: '/meditate',
  },
  {
    title: '퀘스트',
    subtitle: '신뢰를 다시 쌓아가세요',
    icon: 'paper-plane-outline',
    colors: ['#E6D7C3', '#B8A78A'],
    link: '/quest',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@hasLaunched');
      router.replace('/onboarding/relations');
    } catch (error) {
      console.error('Failed to reset onboarding status', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 인사말 섹션 */}
      <View style={styles.header}>
        <Text style={styles.logo}>소란</Text>
        <Text style={styles.subtitle}>소란 속에서 평온을 찾으세요</Text>
        <Text style={styles.welcomeText}>오늘은 어떤 기록을 남기시겠어요?</Text>
      </View>

      {/* 개선 진행 상황 섹션 */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>현재 개선 진행 상황</Text>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <Text style={styles.progressText}>45% 완료</Text>
      </View>

      {/* 대시보드 섹션 */}
      <View style={styles.grid}>
        {dashboardData.map((data, index) => (
          <DashboardCard key={index} {...data} />
        ))}
      </View>

      {/* 온보딩 다시 보기 버튼 */}
      <Button 
        title="온보딩 다시 보기" 
        onPress={resetOnboarding}
        gradientColors={['#4A90E2', '#4A90E2']} // 원하는 색상으로 설정
        style={styles.resetButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  subtitle: {
    fontSize: 16,
    color: '#6A6A6A',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#4A4A4A',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    width: '45%',  // 진행률에 맞춰 동적으로 설정
    height: '100%',
    backgroundColor: '#4A90E2',
  },
  progressText: {
    marginTop: 5,
    fontSize: 14,
    color: '#4A4A4A',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    aspectRatio: 1.2,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardBackground: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  resetButton: {
    alignSelf: 'center',
  },
});
