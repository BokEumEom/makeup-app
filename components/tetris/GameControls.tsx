import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface GameControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotate: () => void;
  onDropDown: () => void;
  onMoveDown: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  onRotate,
  onDropDown,
  onMoveDown,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.controlRow}>
        <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={onMoveLeft} activeOpacity={0.8}>
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rotateButton]} onPress={onRotate} activeOpacity={0.8}>
          <Text style={styles.buttonText}>↻</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={onMoveRight} activeOpacity={0.8}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity style={[styles.largeButton, styles.dropButton]} onPress={onDropDown} activeOpacity={0.8}>
          <Text style={styles.largeButtonText}>DROP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.largeButton, styles.downButton]} onPress={onMoveDown} activeOpacity={0.8}>
          <Text style={styles.largeButtonText}>DOWN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // marginTop: 20,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  button: {
    marginHorizontal: 10,
    width: width * 0.2,
    height: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  largeButton: {
    width: width * 0.32,
    height: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
  },
  leftButton: {
    backgroundColor: '#13254A',
    borderColor: '#00FFFF',
  },
  rotateButton: {
    backgroundColor: '#13254A',
    borderColor: '#FF6F61',
  },
  rightButton: {
    backgroundColor: '#13254A',
    borderColor: '#00FFFF',
  },
  dropButton: {
    backgroundColor: '#13254A',
    borderColor: '#00FFFF',
  },
  downButton: {
    backgroundColor: '#13254A',
    borderColor: '#00FFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  largeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});

export default GameControls;
