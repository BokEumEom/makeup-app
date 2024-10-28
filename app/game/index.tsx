import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/common/Header';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GameOption = {
  title: string;
  description: string;
  icon: any;
  route: string;
};

const gameOptions: GameOption[] = [
  {
    title: 'Rock-Paper-Scissors',
    description: 'Play the classic game!',
    icon: require('@/assets/animations/badge.json'),
    route: '/game/rock',
  },
  {
    title: '2048',
    description: 'Play the classic game!',
    icon: require('@/assets/animations/badge.json'),
    route: '/game/puzzle',
  },
];

export default function GameSelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Choose Your Game" showBackButton />
      <View style={styles.headerContainer}>
        <LottieView
          source={require('@/assets/animations/game.json')}
          autoPlay
          loop={true}
          style={styles.headerIcon}
        />
      </View>

      <FlatList
        data={gameOptions}
        keyExtractor={(item) => item.route}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push(item.route)}
          >
            <LinearGradient
              colors={['#ff9a9e', '#fad0c4']}
              style={styles.gradient}
              start={[0, 0]}
              end={[1, 1]}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <LottieView
                    source={item.icon}
                    autoPlay
                    loop
                    style={styles.cardIcon}
                  />
                </View>
                <View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 200,
    height: 200,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 15,
  },
  cardPressed: {
    opacity: 0.9,
  },
  gradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
  },
  cardIcon: {
    width: 60,
    height: 60,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#f3f3f3',
    textAlign: 'left',
  },
});
