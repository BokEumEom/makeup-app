import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from '@/constants/WeatherConditions';

interface WeatherProps {
  temperature: number;
  weather: keyof typeof weatherConditions; // 유니언 타입으로 설정
}

const Weather: React.FC<WeatherProps> = ({ weather, temperature }) => {
  const condition = weatherConditions[weather];

  if (!condition) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>날씨 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={condition.backgroundImage} style={styles.backgroundImage}>
      <View style={styles.weatherContainer}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons size={72} name={condition.icon} color="#fff" />
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{condition.title}</Text>
          <Text style={styles.subtitle}>{condition.subtitle}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 48,
    color: '#fff',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Weather;
