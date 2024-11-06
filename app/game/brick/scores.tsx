// app/game/brick/Scores.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Scores() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BRICK BREAKER</Text>
      <View style={styles.scoreContainer}>
        {[...Array(10)].map((_, index) => (
          <View key={index} style={styles.scoreRow}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.score}>0</Text>
            <Text style={styles.player}>AAA</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]}>
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.globalButton]}>
          <Text style={styles.buttonText}>GLOBAL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'PressStart2P',
  },
  scoreContainer: {
    width: '100%',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#444',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  rank: {
    fontSize: 16,
    color: '#FFEB3B',
    fontFamily: 'PressStart2P',
    width: '15%',
    textAlign: 'center',
  },
  score: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'PressStart2P',
    width: '35%',
    textAlign: 'center',
  },
  player: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'PressStart2P',
    width: '50%',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    width: 100,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 3,
    borderColor: '#000',
  },
  backButton: {
    backgroundColor: '#32CD32', // 초록색 버튼
    shadowColor: '#228B22',
  },
  globalButton: {
    backgroundColor: '#1E90FF', // 파란색 버튼
    shadowColor: '#104E8B',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'PressStart2P',
  },
});
