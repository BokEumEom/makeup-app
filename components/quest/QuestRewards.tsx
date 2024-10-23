// components/QuestRewards.tsx

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type QuestRewardsProps = {
  points: number;
  badge: string; // Badge image path or name
};

export const QuestRewards: React.FC<QuestRewardsProps> = ({ points, badge }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>보상</Text>
      <View style={styles.rewardItem}>
        <Image source={{ uri: badge }} style={styles.badgeIcon} />
        <Text style={styles.rewardText}>배지 획득</Text>
      </View>
      <View style={styles.rewardItem}>
        <Text style={styles.rewardText}>{points} 포인트</Text>
      </View>
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
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rewardText: {
    fontSize: 16,
    color: '#6A6A6A',
    marginLeft: 10,
  },
  badgeIcon: {
    width: 40,
    height: 40,
  },
});
