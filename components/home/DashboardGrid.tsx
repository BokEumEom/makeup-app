import React from 'react';
import { View, StyleSheet } from 'react-native';
import DashboardCard from './DashboardCard'; // Assuming DashboardCard is already available

const dashboardData = [
  {
    title: '감정 지수',
    subtitle: '나만의 감정 상태를 알아보세요',
    icon: 'happy-outline',
    colors: ['#A7C7E7', '#6A92B8'],
    link: '/emotions',
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
    subtitle: '간단한 게임으로 생각을 잠시 멈추세요',
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
    title: '마음챙김',
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

const DashboardGrid: React.FC = () => {
  return (
    <View style={styles.grid}>
      {dashboardData.map((data, index) => (
        <DashboardCard key={index} {...data} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default DashboardGrid;
