// components/quest/QuestBadge.tsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QuestContext } from '../../contexts/QuestContext';

export const QuestBadge = () => {
  const { level, badges } = useContext(QuestContext);

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>현재 레벨: {level}</Text>
      <Text style={styles.badgeTitle}>획득한 배지:</Text>
      <View style={styles.badgeContainer}>
        {badges.map((badge, index) => (
          <Text key={index} style={styles.badgeText}>
            {badge}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badgeTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badgeText: {
    margin: 5,
    padding: 5,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
  },
});
