import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import RadarChart from '@/components/resignation/RadarChart'; // Custom RadarChart component

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  // Mock 데이터
  const radarData = {
    labels: ['개인 심리', '업무 환경', '대인 관계', '생활 균형'],
    values: [7, 5, 6, 8], // 각 카테고리 점수 (0~10)
  };

  const barData = {
    labels: ['평균 점수', '내 점수'],
    datasets: [
      {
        data: [10, 14], // 평균 점수와 사용자 점수
      },
    ],
  };

  const lineData = {
    labels: ['1개월 전', '2개월 전', '3개월 전'],
    datasets: [
      {
        data: [12, 14, 13], // 시간에 따른 점수 변화
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // 선 색상
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>대시보드</Text>

      {/* Radar Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>카테고리별 강점과 약점</Text>
        <RadarChart data={radarData} maxValue={10} />
      </View>

      {/* Bar Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>평균 점수와 내 점수 비교</Text>
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={250}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            labelColor: () => '#333',
          }}
          style={styles.chart}
        />
      </View>

      {/* Line Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>심리 상태 변화 추이</Text>
        <LineChart
          data={lineData}
          width={screenWidth - 40}
          height={250}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
            labelColor: () => '#333',
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  chartContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
});
