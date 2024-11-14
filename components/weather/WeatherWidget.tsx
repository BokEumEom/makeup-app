import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { getWeather } from '@/services/weather.service';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WeatherWidget: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('위치 권한이 필요합니다', '위치 기반 날씨 정보를 제공하려면 권한을 허용해주세요.');
      return false;
    }
    return true;
  };

  const fetchWeatherData = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) throw new Error('위치 권한이 거부되었습니다.');

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    return getWeather(latitude, longitude);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading || error || !data) {
    return (
      <View style={styles.widgetContainer}>
        <Text style={styles.errorText}>{error || '날씨를 불러오는 중...'}</Text>
      </View>
    );
  }

  // 날씨 상태에 따른 기본 색상과 아이콘 설정
  const getWeatherStyle = (main: string) => {
    switch (main) {
      case 'Rain':
        return { backgroundColor: '#4A90E2', icon: 'weather-rainy' as const };
      case 'Clear':
        return { backgroundColor: '#FDB813', icon: 'weather-sunny' as const };
      case 'Clouds':
        return { backgroundColor: '#A1A1A1', icon: 'weather-cloudy' as const };
      case 'Snow':
        return { backgroundColor: '#00A9FF', icon: 'weather-snowy' as const };
      case 'Thunderstorm':
        return { backgroundColor: '#616161', icon: 'weather-lightning' as const };
      case 'Drizzle':
        return { backgroundColor: '#7FDBFF', icon: 'weather-hail' as const };
      case 'Mist':
      case 'Haze':
      case 'Fog':
        return { backgroundColor: '#CCCCCC', icon: 'weather-fog' as const };
      default:
        return { backgroundColor: '#4A90E2', icon: 'weather-partly-cloudy' as const };
    }
  };

  const { backgroundColor, icon } = getWeatherStyle(data.weather[0].main);

  return (
    <View style={[styles.widgetContainer, { backgroundColor }]}>
      <MaterialCommunityIcons name={icon} size={32} color="#fff" />
      <Text style={styles.tempText}>{data.main.temp}˚</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    width: 100,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  conditionText: {
    fontSize: 12,
    color: '#fff',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});

export default WeatherWidget;
