import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';

const messages = [
  "지금도 충분히 잘하고 있어요 🎉",
  "당신은 소중한 사람입니다 💖",
  "당신의 있는 그대로의 모습이 소중합니다 😊",
  "잠시 쉬어가도 괜찮아요 🌱",
  "당신의 가능성을 믿어요 🌟",
];

const VideoSection: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 3000); // Change message every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Speech Bubble */}
      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>{messages[currentMessage]}</Text>
      </View>

      {/* GIF */}
      <View style={styles.gifContainer}>
        <Image
          source={require('@/assets/images/soran.gif')} // Replace with the correct path to your GIF
          style={styles.gif}
          resizeMode="contain" // Adjust the GIF scaling behavior
        />
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  speechBubble: {
    maxWidth: width * 0.8, // Limit the width of the bubble
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
    zIndex: 1, // Ensure the bubble is above the GIF
    marginLeft: -45,
  },
  speechText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  gifContainer: {
    position: 'absolute',
    right: -35, // Fixed distance from the right edge
    bottom: 3, // Fixed distance from the bottom edge
    zIndex: 0, // Place the GIF behind the bubble
  },
  gif: {
    width: width * 0.4, // GIF width is 40% of the screen width
    height: width * 0.3, // Adjust height proportionally
  },
});

export default VideoSection;
