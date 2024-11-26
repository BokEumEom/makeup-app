import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '@/components/home/Header';
import ProgressSection from '@/components/home/ProgressSection';
import ResignationBanner from '@/components/home/ResignationBanner';
import DashboardGrid from '@/components/home/DashboardGrid';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ProgressSection />
      <ResignationBanner />
      <DashboardGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: '#F5F5F5',
  },
});
