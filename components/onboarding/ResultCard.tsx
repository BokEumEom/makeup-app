import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <ScrollView style={styles.resultDetails}>
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
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultDetails: {
    maxHeight: 300,
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
    marginTop: 5,
  },
});
