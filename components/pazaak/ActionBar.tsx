// ActionBar.tsx

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

type ActionBarProps = {
  currentTurn: string | null;
  playerHasStood: boolean;
  handleStand: () => void;
  handleEndTurn: () => void;
};

const ActionBar: React.FC<ActionBarProps> = ({ currentTurn, playerHasStood, handleStand, handleEndTurn }) => {
  if (currentTurn !== 'player') {
    return <Text style={styles.turnIndicator}>Opponent's Turn</Text>;
  }

  return (
    <View style={styles.actionBar}>
      {!playerHasStood && (
        <>
          <TouchableOpacity style={styles.button} onPress={handleStand}>
            <Text style={styles.buttonText}>STAND</Text>
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }} // Replace with the actual avatar URL
              style={styles.avatar}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleEndTurn}>
            <Text style={styles.buttonText}>END TURN</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ActionBar;

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    backgroundColor: '#f4b400', // Background color similar to the example
    borderRadius: 10,
    marginHorizontal: 10,
    // marginBottom: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1b3b5a',
    fontSize: 13,
    fontFamily: 'PressStart2P',
  },
  turnIndicator: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginVertical: 10,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#1b3b5a', // Dark border color for the avatar
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4b400', // Background color matches action bar
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
