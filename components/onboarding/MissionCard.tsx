import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MissionCardProps {
  title: string;
  mission: string;
  onAccept?: () => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ title, mission, onAccept }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Ionicons name="flag" size={24} color="#6A92B8" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.missionText}>{mission}</Text>
      {onAccept && (
        <TouchableOpacity style={styles.button} onPress={onAccept}>
          <Text style={styles.buttonText}>미션 수락하기</Text>
        </TouchableOpacity>
      )}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  missionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6A92B8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
