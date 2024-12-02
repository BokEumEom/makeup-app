import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface ChartProps {
  labels: string[]; // 차트의 라벨 배열
  data: number[]; // 차트의 데이터 배열
}

export const Chart: React.FC<ChartProps> = ({ labels, data }) => {
  // 데이터 유효성 검사
  const sanitizedData = data.length > 0 ? data.map((value) => (isFinite(value) ? value : 0)) : [0];
  const sanitizedLabels = labels.length > 0 ? labels : ['데이터 없음'];

  return (
    <LineChart
      data={{
        labels: sanitizedLabels,
        datasets: [
          {
            data: sanitizedData, // 검증된 데이터 사용
          },
        ],
      }}
      width={Dimensions.get('window').width - 50} // 차트 너비
      height={220} // 차트 높이
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      bezier
      style={styles.chartStyle}
      fromZero
    />
  );
};

const styles = StyleSheet.create({
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
