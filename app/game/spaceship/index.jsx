import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import Landing from '../../../components/spaceship/landing';
import { useNavigation } from 'expo-router';

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const navigation = useNavigation();

  const loadResourcesAsync = async () => {
    try {
      await Promise.all([
        Asset.loadAsync([
          require('@/assets/spaceship-images/icon.png'),
          require('@/assets/spaceship-images/overlay-back.png'),
          require('@/assets/spaceship-images/planet.png'),
          require('@/assets/spaceship-images/rocketwithflames.gif'),
          require('@/assets/spaceship-images/satellite.png'),
          require('@/assets/spaceship-images/splash.png'),
          require('@/assets/spaceship-images/star.png'),
          require('@/assets/spaceship-images/ufo.gif'),
        ]),
        Font.loadAsync({
          orbitron: require('@/assets/fonts/Orbitron-VariableFont-wght.ttf'),
        }),
      ]);
    } catch (error) {
      console.warn('Error loading resources:', error);
    }
  };

  useEffect(() => {
    loadResourcesAsync().then(() => setLoadingComplete(true));
  }, []);

  if (!isLoadingComplete) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Landing navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
