import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '@/constants/WeatherConditions';

interface WeatherProps {
  temperature: number;
  weather: string;
}

const Weather: React.FC<WeatherProps> = ({ weather, temperature }) => {
  if (!weather) return null;

  const condition = weatherConditions[weather];

  return (
    <ImageBackground
      source={condition.backgroundImage}
      style={styles.backgroundImage}
    >
      <View style={styles.weatherContainer}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={72}
            name={condition.icon}
            color={'#fff'}
          />
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

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string.isRequired,
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
});

export default Weather;
