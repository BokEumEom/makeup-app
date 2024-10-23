// components/quest/QuestTree.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const QuestTree = () => {
  // Mock data for quest tree
  const questTreeData = [
    { title: '감사 퀘스트', completed: true },
    { title: '스트레스 완화 퀘스트', completed: false },
    { title: '자기 성찰 퀘스트', completed: false },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>퀘스트 트리</Text>
      {questTreeData.map((quest, index) => (
        <View key={index} style={styles.questItem}>
          <Ionicons
            name={quest.completed ? 'checkmark-circle' : 'lock-closed'}
            size={24}
            color={quest.completed ? '#4A90E2' : '#E6E6E6'}
          />
          <Text style={[styles.questText, quest.completed && styles.completedText]}>
            {quest.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A4A4A',
  },
  questItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  questText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#6A6A6A',
  },
  completedText: {
    color: '#4A90E2',
    textDecorationLine: 'line-through',
  },
});
