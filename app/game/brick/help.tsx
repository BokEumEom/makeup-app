// app/game/brick/Help.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help</Text>
      <Text style={styles.description}>Use the paddle to bounce the ball and break bricks.</Text>
      <Text style={styles.description}>Clear all bricks to win!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
