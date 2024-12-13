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
    if (value <= 0.25) return '#2ECC71'; // 초록색
    if (value <= 0.5) return '#F1C40F'; // 노란색
    if (value <= 0.75) return '#E67E22'; // 주황색
    return '#E74C3C'; // 빨간색
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>퇴사 게이지</Text>
      <ProgressChart
        data={data}
        width={Dimensions.get('window').width - 60} // 화면 너비에 맞게
        height={230}
        strokeWidth={12}
        radius={50}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: () => getColor(percentage),
          labelColor: () => '#333',
          decimalPlaces: 0,
        }}
        hideLegend={true} // 라벨 숨기기
      />
      <Text style={styles.percentageText}>{Math.round(percentage * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2C3E50',
  },
  percentageText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '700',
    color: '#34495E',
  },
});

export default Chart;
