import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type MainMenuProps = {
  onStartGame: () => void;
};

const MainMenu = ({ onStartGame }: MainMenuProps) => {
  return (
    <View style={styles.container}>
      {/* TETRIS Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>TETRIS</Text>
      </View>

      {/* Main Menu Button */}
      <TouchableOpacity style={styles.button} onPress={onStartGame}>
        <Text style={styles.buttonText}>PLAY GAME</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: -10,
  },
  button: {
    backgroundColor: '#13254A',
    borderColor: '#00FFFF',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});

export default MainMenu;
