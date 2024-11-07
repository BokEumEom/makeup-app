import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import Weather from '@/components/weather/Weather';
import { getWeather } from '@/services/weather.service';

const WeatherScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherCondition, setWeatherCondition] = useState<"Clouds" | "Snow" | "Drizzle" | "Haze" | "Mist" | "Rain" | "Clear" | "Thunderstorm" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        '위치 권한이 필요합니다',
        '앱에서 위치 기반 날씨 정보를 제공하려면 위치 권한을 허용해주세요.',
        [
          {
            text: '권한 요청',
            onPress: requestLocationPermission, // 다시 요청
          },
          {
            text: '취소',
            onPress: () => setError('위치 접근 권한이 거부되었습니다'),
            style: 'cancel',
          },
        ]
      );
      return false;
    }
    return true;
  };

  const fetchWeatherData = useCallback(async () => {
    // isLoading 상태 유지
    if (temperature === null) {
      setIsLoading(true);
    }
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setIsLoading(false);
        return;
      }

      // 위치 가져오기
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // 날씨 데이터 요청
      const weatherData = await getWeather(latitude, longitude);
      setTemperature(weatherData.main.temp);
      setWeatherCondition(weatherData.weather[0].main as "Clouds" | "Snow" | "Drizzle" | "Haze" | "Mist" | "Rain" | "Clear" | "Thunderstorm");
      setError(null);
    } catch (error) {
      setError('날씨 데이터를 가져오는 중 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  }, [temperature]);

  useFocusEffect(
    useCallback(() => {
      fetchWeatherData();
    }, [fetchWeatherData])
  );

  return (
    <View style={styles.container}>
      {isLoading && !temperature ? (
        <Image
          source={require('@/assets/images/weather/clear.png')}
          style={styles.backgroundImage}
        />
      ) : error ? (
        <View>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="다시 시도" onPress={fetchWeatherData} />
        </View>
      ) : (
        <Weather weather={weatherCondition || 'Clear'} temperature={temperature || 20} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default WeatherScreen;
