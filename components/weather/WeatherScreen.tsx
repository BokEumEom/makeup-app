import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import Weather from '@/components/weather/Weather';
import { getWeather } from '@/services/weather.service';

const WeatherScreen: React.FC = () => {
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
    enabled: false, // 수동으로 fetch 호출
    onError: (err: any) => setError(err.message),
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch(); // 화면에 집중될 때마다 데이터 재요청
    }, [refetch])
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Image
          source={require('@/assets/images/weather/clear.png')}
          style={styles.backgroundImage}
        />
      ) : error ? (
        <View>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="다시 시도" onPress={refetch} />
        </View>
      ) : data ? (
        <Weather
          weather={data.weather[0].main as "Clouds" | "Snow" | "Drizzle" | "Haze" | "Mist" | "Rain" | "Clear" | "Thunderstorm"}
          temperature={data.main.temp}
        />
      ) : null}
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
