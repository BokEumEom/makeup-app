import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { getWeather } from '@/services/weather.service';
import {
  Sun,
  CloudRain,
  Cloud,
  Snowflake,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  CloudSun,
  LucideProps,
} from 'lucide-react-native';

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

  const getWeatherStyle = (main: string): { colors: [string, string]; icon: React.FC<LucideProps> } => {
    switch (main) {
      case 'Rain':
        return { colors: ['#6EB1F7', '#4A90E2'], icon: CloudRain };
      case 'Clear':
        return { colors: ['#FFDEAB', '#FDB813'], icon: Sun };
      case 'Clouds':
        return { colors: ['#C4C4C4', '#A1A1A1'], icon: Cloud };
      case 'Snow':
        return { colors: ['#B3E5FC', '#00A9FF'], icon: Snowflake };
      case 'Thunderstorm':
        return { colors: ['#8E8E8E', '#616161'], icon: CloudLightning };
      case 'Drizzle':
        return { colors: ['#A6E3FF', '#7FDBFF'], icon: CloudDrizzle };
      case 'Mist':
      case 'Haze':
      case 'Fog':
        return { colors: ['#E0E0E0', '#CCCCCC'], icon: CloudFog };
      default:
        return { colors: ['#7FBFFF', '#4A90E2'], icon: CloudSun };
    }
  }; 

  const { colors, icon: WeatherIcon } = getWeatherStyle(mainWeather);

  return (
    <LinearGradient colors={colors} style={styles.widgetContainer}>
      <WeatherIcon size={32} color="#fff" />
      <Text style={styles.tempText}>{`${Math.round(data.main.temp)}˚`}</Text>
    </LinearGradient>
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
