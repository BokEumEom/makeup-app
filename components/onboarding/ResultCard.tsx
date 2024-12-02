import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Chart } from './Chart';

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
  style?: ViewStyle; // style 속성 추가
}

// Ionicons에서 지원하는 아이콘 이름의 타입 정의
type IoniconNames = "happy-outline" | "sunny-outline" | "sad-outline" | "thunderstorm-outline";

const scoreMapping: { min: number; icon: IoniconNames; color: string }[] = [
  { min: 8, icon: 'happy-outline', color: '#4CAF50' },
  { min: 6, icon: 'sunny-outline', color: '#FFC107' },
  { min: 4, icon: 'sad-outline', color: '#FF9800' },
  { min: 0, icon: 'thunderstorm-outline', color: '#F44336' },
];

const getScoreProperties = (score: number): { icon: IoniconNames; color: string } => {
  const entry = scoreMapping.find((entry) => score >= entry.min);
  return {
    icon: entry?.icon || 'thunderstorm-outline',
    color: entry?.color || '#F44336',
  };
};

export const ResultCard: React.FC<ResultCardProps> = React.memo(({ title, results, style }) => {
  const chartData = useMemo(() => {
    const validData = results.map((item) => {
      const value = isNaN(item.score) || !isFinite(item.score) ? 0 : item.score;
      return value;
    });

    return {
      labels: results.map((item) => item.category),
      data: validData,
    };
  }, [results]);

  return (
    <View style={[styles.card, style]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Chart labels={chartData.labels} data={chartData.data} />
      <ScrollView style={styles.resultDetails}>
        {results.map((item, index) => {
          const { icon, color } = getScoreProperties(item.score);
          return (
            <View key={index} style={styles.resultItem}>
              <View style={styles.resultHeader}>
                <Ionicons name={icon} size={24} color={color} />
                <Text style={styles.resultLabel}>{item.category}</Text>
              </View>
              <View style={styles.resultValueContainer}>
                <Text style={[styles.resultValue, { color }]}>
                  {item.score.toFixed(1)}/10
                </Text>
                <Text style={styles.resultLevel}>({item.evaluation.level})</Text>
              </View>
              <Text style={styles.resultDescription}>{item.evaluation.description}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
});

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
