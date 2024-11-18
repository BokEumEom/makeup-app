import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LevelIndicator from '@/components/block/LevelIndicator';
import { useLevelContext } from '@/contexts/LevelContext';

export default function BlockGameScreen() {
  const router = useRouter();
  const { levels } = useLevelContext();

  // Find the current level (first available or lowest locked level)
  const currentLevel = levels.find(level => level.status === 'available') || levels[0];

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer} inverted>
        <Text style={styles.title}>BLOCK SORT</Text>
        {levels.slice().reverse().map((level, index) => (
          <LevelIndicator 
            key={index} 
            level={level} 
            onPress={() => router.push(`/game/block/${level.number}`)} 
          />
        ))}
      </ScrollView>
      <View style={styles.currentLevelContainer}>
        <TouchableOpacity
          style={styles.currentLevelButton}
          onPress={() => router.push(`/game/block/${currentLevel.number}`)}
        >
          <Text style={styles.currentLevelText}>Level {currentLevel.number}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#3d2b1f',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#f5a623',
  },
  currentLevelContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  currentLevelButton: {
    backgroundColor: '#f5a623',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  currentLevelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
