import React from 'react';
import { View, StyleSheet } from 'react-native';
import WeatherWidget from '@/components/weather/WeatherWidget';
import CustomText from '@/components/common/CustomText';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <View>
        <CustomText style={styles.logo}>소란</CustomText>
        <CustomText style={styles.subtitle}>소란 속에서 평온을 찾으세요</CustomText>
        <CustomText style={styles.welcomeText}>오늘은 어떤 기록을 남기시겠어요?</CustomText>
      </View>
      <WeatherWidget />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'NotoSansMedium',
    color: '#4A4A4A',
  },
  subtitle: {
    fontSize: 16,
    color: '#6A6A6A',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#4A4A4A',
  },
});

export default Header;
