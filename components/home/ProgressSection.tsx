import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/common/CustomText';

const ProgressSection: React.FC = () => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.progressContainer}>
        <CustomText style={styles.progressTitle}>현재 개선 진행 상황</CustomText>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <CustomText style={styles.progressText}>45% 완료</CustomText>
      </View>
      <Link href="/resignation/dashboard" asChild>
        <TouchableOpacity style={styles.dashboardButton}>
          <Ionicons name="grid-outline" size={24} color="#fff" />
          <CustomText style={styles.dashboardButtonText}>대시보드</CustomText>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  progressContainer: {
    flex: 1,
    marginRight: 10,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E6E6E6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    width: '45%',
    height: '100%',
    backgroundColor: '#4A90E2',
  },
  progressText: {
    fontSize: 12,
    color: '#4A4A4A',
    marginTop: 3,
  },
  dashboardButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
  },
  dashboardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default ProgressSection;
