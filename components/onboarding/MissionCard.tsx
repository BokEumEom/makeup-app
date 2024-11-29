import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MissionCardProps {
  title: string;
  mission: string;
  onAccept?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const MissionCard: React.FC<MissionCardProps> = ({ title, mission, onAccept, style }) => {
  return (
    <View style={[styles.card, style]}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Ionicons name="flag" size={24} color="#6A92B8" />
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Mission Text */}
      <Text style={styles.missionText}>{mission}</Text>

      {/* Accept Button */}
      {onAccept && (
        <TouchableOpacity
          style={styles.button}
          onPress={onAccept}
          accessibilityRole="button"
          accessibilityLabel="미션 수락하기"
        >
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
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    lineHeight: 22,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#6A92B8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
