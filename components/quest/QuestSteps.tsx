// components/QuestSteps.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type QuestStepsProps = {
  steps: string[];
};

export const QuestSteps: React.FC<QuestStepsProps> = ({ steps }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>퀘스트 단계</Text>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepItem}>
          <Text style={styles.stepText}>{index + 1}. {step}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  stepItem: {
    marginTop: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#6A6A6A',
  },
});
