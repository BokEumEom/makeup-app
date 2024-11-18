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
  {
    title: 'Memory Game',
    description: 'Play the classic game!',
    icon: require('@/assets/animations/badge.json'),
    route: '/game/memory',
  },
  {
    title: 'Pazaak Mobile',
    description: 'Play the classic game!',
    icon: require('@/assets/animations/badge.json'),
    route: '/game/pazaak',
  },
  {
    title: 'Tetris',
    description: 'Play the classic game!',
    icon: require('@/assets/animations/badge.json'),
    route: '/game/tetris',
  },
  {
    title: 'Brick Breaker',
    description: 'Play the classic game!',
    icon: require('@/assets/animations/badge.json'),
    route: '/game/brick',
  },
  {
    title: 'Flappy Bird',
    description: 'Play the classic game!',
    icon: require('@/assets/animations/badge.json'),
    route: '/game/flappybird',
  },
  {
    title: 'Shaky Shuttle',
    description: 'Play the classic game!',
    icon: require('@/assets/animations/badge.json'),
    route: '/game/spaceship',
  },
  {
    title: 'Water Melon',
    description: 'Play the classic game!',
    icon: require('@/assets/animations/badge.json'),
    route: '/game/watermelon',
  },
];

export default function GameSelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Choose Your Game" showBackButton titleColor="#000" />
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
        numColumns={2} // 2열로 설정
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width * 0.5) - 15; // 2열 카드 너비 설정
const CARD_HEIGHT = CARD_WIDTH * 0.75; // 카드 높이 설정

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
    width: 150,
    height: 150,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 5,
    marginHorizontal: 5, // 카드 간 간격 조정
  },
  cardPressed: {
    opacity: 0.9,
  },
  gradient: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 10,
  },
  cardIcon: {
    width: 35,
    height: 35,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#f3f3f3',
    textAlign: 'center',
    fontFamily: 'DepartureMono',
  },
});
