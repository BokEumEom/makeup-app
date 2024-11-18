import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface LevelIndicatorProps {
  level: {
    number: number;
    status: 'locked' | 'available' | 'completed';
    icon?: string;
  };
  onPress: () => void;
}

const LevelIndicator: React.FC<LevelIndicatorProps> = ({ level, onPress }) => {
  return (
    <TouchableOpacity style={styles.levelContainer} onPress={onPress} disabled={level.status === 'locked'}>
      <View style={[styles.levelBox, styles[level.status]]}>
        <Text style={styles.levelText}>{level.number}</Text>
        {level.icon && <Text style={styles.icon}>{level.icon}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  levelContainer: {
    padding: 10,
    alignItems: 'center',
  },
  levelBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 5,
  },
  available: {
    backgroundColor: '#f5a623',
  },
  locked: {
    backgroundColor: '#ccc',
  },
  completed: {
    backgroundColor: '#76c7c0',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
  },
});

export default LevelIndicator;
