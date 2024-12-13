import React from 'react';
import { View, StyleSheet } from 'react-native';
import DashboardCard from './DashboardCard'; // Assuming DashboardCard is already available
import { Smile, PersonStanding, Joystick, Book, Headphones, Award } from 'lucide-react-native'; // Import Lucide icons

const dashboardData: {
  title: string;
  subtitle: string;
  icon: React.FC; // Use Lucide icon components
  colors: [string, string];
  link: string;
}[] = [
  {
    title: '감정 지수',
    subtitle: '나만의 감정 상태 췍',
    icon: Smile, // Lucide icon
    colors: ['#ff9a9e', '#fad0c4'],
    link: '/emotions',
  },
  {
    title: 'MBTI',
    subtitle: '내 성격 유형 췍',
    icon: PersonStanding, // Lucide icon
    colors: ['#a1c4fd', '#c2e9fb'],
    link: '/mbti',
  },
  {
    title: '게임',
    subtitle: '즐겜 GOGO',
    icon: Joystick, // Lucide icon
    colors: ['#fbc2eb', '#a6c1ee'],
    link: '/game',
  },
  {
    title: '시나리오',
    subtitle: '스토리 시뮬레이션',
    icon: Book, // Lucide icon
    colors: ['#fad0c4', '#ffd1ff'],
    link: '/scenario',
  },
  {
    title: '마음챙김',
    subtitle: '명상 수련',
    icon: Headphones, // Lucide icon
    colors: ['#ffecd2', '#fcb69f'],
    link: '/meditate',
  },
  {
    title: '퀘스트',
    subtitle: '신뢰 쌓기',
    icon: Award, // Lucide icon
    colors: ['#d4fc79', '#96e6a1'],
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
