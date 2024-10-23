// components/QuestObjective.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type QuestObjectiveProps = {
  title: string;
  description: string;
};

export const QuestObjective: React.FC<QuestObjectiveProps> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  description: {
    fontSize: 16,
    color: '#6A6A6A',
  },
});
