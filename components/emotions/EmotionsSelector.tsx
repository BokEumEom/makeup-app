// components/emotions/EmotionsSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

export default function EmotionsSelector() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <LottieView
          source={require('@/assets/animations/game.json')}
          autoPlay
          loop={true}
          style={styles.headerIcon}
        />
      </View>

      <Text style={styles.title}>지금 나의 감정 상태는?</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/emotions/positiveEmotions')}
      >
        <LinearGradient colors={['#A7D6A7', '#6EBF76']} style={styles.cardBackground}>
          <View style={styles.iconContainer}>
            <Ionicons name="happy-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.buttonText}>긍정적 감정</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/emotions/sadness')}
      >
        <LinearGradient colors={['#90CAF9', '#42A5F5']} style={styles.cardBackground}>
          <View style={styles.iconContainer}>
            <Ionicons name="sad-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.buttonText}>슬픔/우울감</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/emotions/anger')}
      >
        <LinearGradient colors={['#EF9A9A', '#E57373']} style={styles.cardBackground}>
          <View style={styles.iconContainer}>
            <Ionicons name="flame-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.buttonText}>분노/짜증</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/emotions/stress')}
      >
        <LinearGradient colors={['#FFCC80', '#FFA726']} style={styles.cardBackground}>
          <View style={styles.iconContainer}>
            <Ionicons name="speedometer-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.buttonText}>스트레스/압박감</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/emotions/anxiety')}
      >
        <LinearGradient colors={['#B39DDB', '#9575CD']} style={styles.cardBackground}>
          <View style={styles.iconContainer}>
            <Ionicons name="help-circle-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.buttonText}>불안/불확실감</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/emotions/apathy')}
      >
        <LinearGradient colors={['#B0BEC5', '#78909C']} style={styles.cardBackground}>
          <View style={styles.iconContainer}>
            <Ionicons name="cloud-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.buttonText}>무관심/흥미 상실</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF1E6',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  card: {
    width: '80%',
    marginBottom: 20,
    borderRadius: 5, // Increased radius for a softer look
    overflow: 'hidden',
    elevation: 5,
  },
  cardBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 15,
  },
  buttonText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
  },
});
