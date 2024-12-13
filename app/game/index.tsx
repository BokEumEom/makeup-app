import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/common/Header';
import CustomText from '@/components/common/CustomText';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon, Dices } from 'lucide-react-native';

type GameOption = {
  title: string;
  route: `/${string}`; // Type-safe route
  colors: [string, string, ...string[]]; // Tuple with at least two colors
  icon: LucideIcon;
};

const gameOptions: GameOption[] = [
  {
    title: 'Rock-Paper-Scissors',
    route: '/game/rock',
    colors: ['#ff9a9e', '#fad0c4'],
    icon: Dices,
  },
  {
    title: '2048',
    route: '/game/puzzle',
    colors: ['#a1c4fd', '#c2e9fb'],
    icon: Dices,
  },
  {
    title: 'Memory Game',
    route: '/game/memory',
    colors: ['#fbc2eb', '#a6c1ee'],
    icon: Dices,
  },
  {
    title: 'Pazaak Mobile',
    route: '/game/pazaak',
    colors: ['#fad0c4', '#ffd1ff'],
    icon: Dices,
  },
  {
    title: 'Tetris',
    route: '/game/tetris',
    colors: ['#ffecd2', '#fcb69f'],
    icon: Dices,
  },
  {
    title: 'Othello',
    route: '/game/reversi',
    colors: ['#d4fc79', '#96e6a1'],
    icon: Dices,
  },
  {
    title: 'Chat Quiz',
    route: '/game/quiz',
    colors: ['#d4fc79', '#96e6a1'],
    icon: Dices,
  },
  {
    title: 'Number Puzzle',
    route: '/game/numberpuz',
    colors: ['#d4fc79', '#96e6a1'],
    icon: Dices,
  },
];

export default function GameSelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Choose Your Game" showBackButton titleColor="#000" />
      <FlatList
        data={gameOptions}
        keyExtractor={(item) => item.route}
        renderItem={({ item }) => {
          const Icon = item.icon;
          return (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => router.push(item.route)}
            >
              <LinearGradient
                colors={item.colors}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardContent}>
                  <Icon size={54} color="#FFFFFF" />
                </View>
                <View style={styles.cardFooter}>
                  <CustomText style={styles.cardTitle}>{item.title}</CustomText>
                </View>
              </LinearGradient>
            </Pressable>
          );
        }}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.43;
const CARD_HEIGHT = CARD_WIDTH * 0.97;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
    elevation: 5,
  },
  cardPressed: {
    opacity: 0.9,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
