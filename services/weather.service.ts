import api from './api';
import * as Location from 'expo-location';
import { weatherConditions } from '@/constants/WeatherConditions';

export const API_KEY = '3daa5da3a284cfeb5edf9d3432c0a13b'; // Replace with your OpenWeatherMap API key

interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}

export const getWeather = async (lat: number, lon: number): Promise<WeatherResponse> => {
  try {
    const response = await api.get<WeatherResponse>('weather', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};

export const getWeatherBackgroundImage = async () => {
  let location = await Location.getCurrentPositionAsync({});
  const lat = location.coords.latitude;
  const lon = location.coords.longitude;

  const weatherData = await getWeather(lat, lon);
  const weatherCondition = weatherData.weather[0].main;

  return weatherConditions[weatherCondition]?.backgroundImage;
};
