import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/common/CustomText';

const ProgressSection: React.FC = () => {
  const router = useRouter();

  const navigateToOnboarding = () => {
    router.push('/onboarding');
  };

  const navigateToDashboard = () => {
    router.push('/(tabs)/dashboard');
  };

  return (
    <View style={styles.rowContainer}>
      {/* 온보딩으로 이동 */}
      <TouchableOpacity style={styles.progressContainer} onPress={navigateToOnboarding}>
        <CustomText style={styles.progressTitle}>온보딩</CustomText>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <CustomText style={styles.progressText}>45% 완료</CustomText>
      </TouchableOpacity>

      {/* 대시보드로 이동 */}
      <TouchableOpacity style={styles.dashboardButton} onPress={navigateToDashboard}>
        <Ionicons name="grid-outline" size={24} color="#fff" />
        <CustomText style={styles.dashboardButtonText}>대시보드</CustomText>
      </TouchableOpacity>
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
    height: 14,
    backgroundColor: '#ffd1ff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    width: '45%',
    height: '100%',
    backgroundColor: '#96e6a1',
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
    backgroundColor: '#a6c1ee',
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
