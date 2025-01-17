import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Tabs from '@/components/common/Tabs'; // Tabs component
import { BarChart, LineChart } from 'react-native-chart-kit';
import RadarChart from '@/components/resignation/RadarChart';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const radarData = {
    labels: ['개인 심리', '업무 환경', '대인 관계', '생활 균형'],
    values: [7, 5, 6, 8],
  };

  const barData = {
    labels: ['평균 점수', '내 점수'],
    datasets: [
      {
        data: [10, 14],
      },
    ],
  };

  const lineData = {
    labels: ['1개월 전', '2개월 전', '3개월 전'],
    datasets: [
      {
        data: [12, 14, 13],
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
      },
    ],
  };

  const renderContent = () => {
    if (selectedIndex === 0) {
      return <RadarChart data={radarData} maxValue={10} />;
    } else if (selectedIndex === 1) {
      return (
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={250}
          yAxisLabel=""
          yAxisSuffix=" 점"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            labelColor: () => '#333',
            decimalPlaces: 0,
          }}
          style={styles.chart}
        />
      );
    } else if (selectedIndex === 2) {
      return (
        <LineChart
          data={lineData}
          width={screenWidth - 40}
          height={250}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
            labelColor: () => '#333',
            decimalPlaces: 0,
          }}
          bezier
          style={styles.chart}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Tabs
        data={[
          { icon: 'Radar', label: 'Radar Chart' },
          { icon: 'ChartColumn', label: 'Bar Chart' },
          { icon: 'ChartLine', label: 'Line Chart' },
        ]}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      />
      <Animated.View
        key={`tab-content-${selectedIndex}`}
        entering={FadeInRight.springify().damping(80).stiffness(200)}
        exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
        style={styles.contentContainer}
      >
        {renderContent()}
      </Animated.View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
});
