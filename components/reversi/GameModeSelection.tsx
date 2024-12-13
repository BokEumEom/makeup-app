import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

type GameModeSelectionProps = {
  onModeSelect: (singlePlayer: boolean, aiAs: 'black' | 'white' | null) => void;
  onStartGame: () => void;
  selectedMode: { singlePlayer: boolean; aiAs: 'black' | 'white' | null };
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onModeSelect, onStartGame, selectedMode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Othello</Text>
      <Text style={styles.subtitle}>Choose Game Mode</Text>
      <TouchableOpacity
        style={[
          styles.button,
          selectedMode.singlePlayer && selectedMode.aiAs === 'black' && styles.buttonSelected,
        ]}
        onPress={() => onModeSelect(true, 'black')}
      >
        <Text style={styles.buttonText}>Play Against AI (You: White)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedMode.singlePlayer && selectedMode.aiAs === 'white' && styles.buttonSelected,
        ]}
        onPress={() => onModeSelect(true, 'white')}
      >
        <Text style={styles.buttonText}>Play Against AI (You: Black)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, !selectedMode.singlePlayer && styles.buttonSelected]}
        onPress={() => onModeSelect(false, null)}
      >
        <Text style={styles.buttonText}>Two Players</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startButton} onPress={onStartGame}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2E8B57',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: SCREEN_WIDTH * 0.8,
  },
  buttonSelected: {
    backgroundColor: '#3CB371',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
    width: SCREEN_WIDTH * 0.8,
  },
  startButtonText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default GameModeSelection;
