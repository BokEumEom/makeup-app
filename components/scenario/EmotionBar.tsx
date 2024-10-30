import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EmotionContext } from '../../contexts/EmotionContext';

export const EmotionBar = () => {
  const { emotionState } = useContext(EmotionContext);
  const emotions = ['stress', 'happiness', 'confidence', 'anxiety'];

  return (
    <View style={styles.container}>
      {emotions.map((emotion) => (
        <View key={emotion} style={styles.barContainer}>
          <Text style={styles.label}>{capitalize(emotion)}</Text>
          <View style={styles.barBackground}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${emotionState[emotion]}%`,
                  backgroundColor: getEmotionColor(emotion),
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const getEmotionColor = (emotion: string) => {
  switch (emotion) {
    case 'stress':
      return '#FF6B6B'; // Slightly lighter red for stress
    case 'happiness':
      return '#FFD700'; // Yellow for happiness
    case 'confidence':
      return '#48C774'; // Bright green for confidence
    case 'anxiety':
      return '#0077B6'; // Deep blue for anxiety
    default:
      return '#CCC';
  }
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F8F9FA', // Soft light background
    borderRadius: 10,
    marginVertical: 15,
  },
  barContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3142',
    marginBottom: 8,
  },
  barBackground: {
    height: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 7.5, // More rounded corners
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 7.5, // Rounded fill as well
  },
});
