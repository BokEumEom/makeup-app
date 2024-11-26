import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/common/CustomText';

const ResignationBanner: React.FC = () => {
  return (
    <Link href="/resignation" asChild>
      <TouchableOpacity style={styles.resignationBanner}>
        <View style={styles.bannerBackground}>
          <Ionicons name="exit-outline" size={28} style={styles.bannerIcon} />
          <View>
            <CustomText style={styles.bannerTitle}>퇴사 고민 중이신가요?</CustomText>
            <CustomText style={styles.bannerSubtitle}>퇴사 게이지를 체크해보세요</CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  resignationBanner: {
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#E6D7C3',
    backgroundColor: 'transparent',
  },
  bannerBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  bannerIcon: {
    marginRight: 15,
    color: '#E6D7C3',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#6A6A6A',
  },
});

export default ResignationBanner;
