import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { Text } from '@/components/spaceship/Text';
import Constants from 'expo-constants';

import backgroundVid from '@/assets/video/planet-cartoon-space-animation.mp4';

const { width, height } = Dimensions.get('window');
const KEY = '@shaky-shuttle:high-score';

const Landing = () => {
  const [highScore, setHighScore] = useState(0);
  const router = useRouter();

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(KEY);
      if (value !== null) {
        setHighScore(Number(value));
      }
    } catch (error) {
      console.error('Error fetching high score:', error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const appVersion = Constants.expoConfig?.version || "1.0.0";

  return (
    <View style={styles.container}>
      <Video
        source={backgroundVid}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
      <View style={styles.titleContainer}>
        <Text h2 h2Style={styles.title}>
          Shaky Shuttle
        </Text>
        <Text style={styles.highScore}>High score - {highScore}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('./game')}
      >
        <Text style={styles.buttonTitle}>Start</Text>
      </TouchableOpacity>
      <Text style={styles.version}>Version {appVersion}</Text>
    </View>
  );
};

Landing.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Landing.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  video: {
    height,
    width,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 200,
    opacity: 0.8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonTitle: {
    color: '#BB1F13',
    fontSize: 25,
  },
  title: {
    color: '#FFF',
    marginVertical: 20,
  },
  titleContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  highScore: {
    color: '#FFF',
    fontSize: 18,
  },
  version: {
    color: '#FFF',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default Landing;
