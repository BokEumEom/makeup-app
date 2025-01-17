import api from './api';
import * as Location from 'expo-location';

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
