import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '@/components/home/Header';
import ProgressSection from '@/components/home/ProgressSection';
import ResignationBanner from '@/components/home/ResignationBanner';
import DashboardGrid from '@/components/home/DashboardGrid';
import VideoSection from '@/components/home/VideoSection';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ProgressSection />
      <ResignationBanner />
      <DashboardGrid />
      <VideoSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 60,
    backgroundColor: '#F5F5F5',
  },
});
