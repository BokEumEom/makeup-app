// app/game/tetris.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameProvider } from '@/contexts/TetrisContext';
import TetrisGrid from '@/components/tetris/TetrisGrid';
import Controls from '@/components/tetris/Controls';
import ScoreDisplay from '@/components/tetris/ScoreDisplay';

const TetrisScreen = () => {
  return (
    <GameProvider>
      <View style={styles.outerContainer}>
        <View style={styles.borderContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>TETRIS</Text>
            <View style={styles.screenContainer}>
              <TetrisGrid />
              <ScoreDisplay />
            </View>
          </View>
        </View>
        <Controls />
      </View>
    </GameProvider>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFD700', // Yellow outer background
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  borderContainer: {
    width: 360,
    height: 550,
    backgroundColor: '#000', // Black border surrounding the game area
    padding: 3,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: '#FBD84A', // Inner yellow background
    borderWidth: 5,
    borderColor: '#000',
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  screenContainer: {
    flexDirection: 'row',
    backgroundColor: '#B2B8A3', // LCD screen color
    borderWidth: 3,
    borderColor: '#333', // Dark outline for the screen
    padding: 6,
    // flex: 1,
  },
});

export default TetrisScreen;
