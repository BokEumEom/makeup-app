import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

type ChartProps = {
  score: number; // 사용자 점수 (0-20)
};

const Chart: React.FC<ChartProps> = ({ score }) => {
  const maxScore = 20; // 최대 점수
  const percentage = score / maxScore; // 점수 비율

  // Progress Chart 데이터
  const data = {
    labels: ['퇴사 게이지'], // 차트 라벨
    data: [percentage], // 점수 비율
  };

  // 차트 색상
  const getColor = (value: number) => {
    if (value <= 0.25) return '#4CAF50'; // 초록색
    if (value <= 0.5) return '#FFC107'; // 노란색
    if (value <= 0.75) return '#FF9800'; // 주황색
    return '#F44336'; // 빨간색
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>퇴사 게이지</Text>
      <ProgressChart
        data={data}
        width={Dimensions.get('window').width - 40} // 화면 너비에 맞게
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: () => getColor(percentage),
          labelColor: () => '#333',
          decimalPlaces: 2,
        }}
        hideLegend={false} // 라벨 표시 여부
      />
      <Text style={styles.percentageText}>{Math.round(percentage * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  percentageText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default Chart;
