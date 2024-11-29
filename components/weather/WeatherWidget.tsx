import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { getWeather } from '@/services/weather.service';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WeatherWidget: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);

  // 위치 권한 요청 함수
  const requestLocationPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        '위치 권한이 필요합니다',
        '위치 기반 날씨 정보를 제공하려면 권한을 허용해주세요.'
      );
      setHasPermission(false);
      return;
    }
    setHasPermission(true);
  }, []);

  // 컴포넌트가 마운트되면 위치 권한 확인
  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  // 날씨 데이터 가져오기
  const fetchWeatherData = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    return getWeather(latitude, longitude);
  };

  // 위치 권한이 있는 경우에만 useQuery 실행
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
    enabled: hasPermission, // 권한이 있을 때만 쿼리 실행
  });

  if (!hasPermission) {
    return (
      <View style={styles.widgetContainer}>
        <Text style={styles.errorText}>위치 권한이 필요합니다.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.widgetContainer}>
        <ActivityIndicator size="small" color="#888" />
        <Text style={styles.loadingText}>날씨를 불러오는 중...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.widgetContainer}>
        <Text style={styles.errorText}>
          {error instanceof Error ? error.message : '날씨 정보를 불러올 수 없습니다.'}
        </Text>
      </View>
    );
  }

  const mainWeather = data.weather && data.weather[0] ? data.weather[0].main : 'Clear';

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

  const { backgroundColor, icon } = getWeatherStyle(mainWeather);

  return (
    <View style={[styles.widgetContainer, { backgroundColor }]}>
      <MaterialCommunityIcons name={icon} size={32} color="#fff" />
      <Text style={styles.tempText}>{`${Math.round(data.main.temp)}˚`}</Text>
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
  loadingText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});

export default WeatherWidget;
