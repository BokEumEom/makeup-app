import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Overlay } from 'react-native-elements';
import overlayBack from '@/assets/spaceship-images/overlay-back.png';
import { Text } from '@/components/spaceship/Text';

const KEY = '@shaky-shuttle:high-score';

const GameOver = ({ showOverlay, score, reloadApp }) => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storeData = async () => {
      try {
        const storageHighScore = parseInt(await AsyncStorage.getItem(KEY)) || 0;
        if (score > storageHighScore) {
          setHighScore(score);
          await AsyncStorage.setItem(KEY, String(score));
        } else {
          setHighScore(storageHighScore);
        }
      } catch (error) {
        console.error('Error saving high score:', error);
      }
    };
    if (showOverlay) storeData();
  }, [showOverlay, score]);

  return (
    <Overlay
      isVisible={showOverlay}
      overlayStyle={{ padding: 0, width: '100%', height: '100%' }}
    >
      <ImageBackground
        source={overlayBack}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
        imageStyle={{ opacity: 0.8 }}
      >
        <Text style={{ color: '#FFF', fontSize: 40, marginVertical: 10 }}>
          Score
        </Text>
        <Text style={{ color: '#FFF', fontSize: 30, marginVertical: 10 }}>
          {score}
        </Text>
        <Text style={{ color: '#FFF', marginVertical: 10 }}>
          High score - {highScore}
        </Text>
        <Text
          onPress={reloadApp}
          style={{
            backgroundColor: '#FFF',
            marginVertical: 20,
            padding: 15,
            borderRadius: 10,
            textAlign: 'center',
            color: '#BB1F13',
            fontSize: 25,
          }}
        >
          Restart
        </Text>
      </ImageBackground>
    </Overlay>
  );
};

GameOver.propTypes = {
  showOverlay: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  reloadApp: PropTypes.func.isRequired,
};

export default GameOver;
