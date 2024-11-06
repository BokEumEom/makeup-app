import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface ResultItem {
  category: string;
  score: number;
  evaluation: {
    level: string;
    description: string;
  };
}

interface ResultCardProps {
  title: string;
  results: ResultItem[];
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, results }) => {
  const getIconName = (score: number): string => {
    if (score >= 8) return 'happy-outline';
    if (score >= 6) return 'sunny-outline';
    if (score >= 4) return 'sad-outline';
    return 'thunderstorm-outline';
  };

  const getScoreColor = (score: number): string => {
    if (score >= 8) return '#4CAF50';
    if (score >= 6) return '#FFC107';
    if (score >= 4) return '#FF9800';
    return '#F44336';
  };

  // 차트를 렌더링하는 함수
  const renderChart = () => {
    const screenWidth = Dimensions.get('window').width;
    const chartLabels = results.map(item => item.category);
    const chartData = results.map(item => (isNaN(item.score) ? 0 : item.score));

    return (
      <LineChart
        data={{
          labels: chartLabels,
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={screenWidth - 40} // 차트 너비를 화면 너비보다 40px 작게 설정
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1, // 소수점 자리수
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // 그래프 라인 색상
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
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 20, // 오른쪽 패딩 추가
        }}
        fromZero
      />
    );
  };

  const dynamicScrollViewHeight = Dimensions.get('window').height * 0.3;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>

      {/* 차트 추가 */}
      {renderChart()}

      <ScrollView style={[styles.resultDetails, { maxHeight: dynamicScrollViewHeight }]}>
        {results.map((item, index) => (
          <View key={index} style={styles.resultItem}>
            <View style={styles.resultHeader}>
              <Ionicons name={getIconName(item.score)} size={24} color={getScoreColor(item.score)} />
              <Text style={styles.resultLabel}>{item.category}</Text>
            </View>
            <View style={styles.resultValueContainer}>
              <Text style={[styles.resultValue, { color: getScoreColor(item.score) }]}>
                {item.score.toFixed(1)}/10
              </Text>
              <Text style={styles.resultLevel}>({item.evaluation.level})</Text>
            </View>
            <Text style={styles.resultDescription}>{item.evaluation.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultDetails: {
    marginBottom: 10,
  },
  resultItem: {
    marginBottom: 15,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  resultValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultLevel: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5,
  },
  resultDescription: {
    fontSize: 14,
    color: '#777',
  },
});
