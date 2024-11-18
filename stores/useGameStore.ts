// stores/useGameStore.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { FRUIT_SIZES } from '@/constants/FruitSizes';

export const GameStates = {
  MENU: 'MENU',
  READY: 'READY',
  DROP: 'DROP',
  LOSE: 'LOSE',
};

// Define the Fruit object type
interface Fruit {
  x: number;
  y: number;
  sizeIndex: number;
  id: number;
}

// Define the Zustand store type
interface GameStore {
  gameState: string;
  setGameState: (state: string) => void;

  score: number;
  setScore: (score: number) => void;

  highScore: number;
  setHighScore: (highScore: number) => void;

  nextFruitIndex: number;
  setNextFruitIndex: (index: number) => void;

  fruits: Fruit[];
  setFruits: (fruits: Fruit[]) => void;

  startGame: () => void;
  generateNextFruit: () => void;
  addFruitToScreen: (x: number, y: number, sizeIndex: number) => void;
  updateScore: (points: number) => void;

  loadHighScore: () => Promise<void>;
  saveHighScore: (newHighScore: number) => Promise<void>;
  checkForMerges: (currentFruit: Fruit) => void;
  isColliding: (fruitA: Fruit, fruitB: Fruit) => boolean;
}

// Define Zustand store
const useGameStore = create<GameStore>((set, get) => ({
  gameState: GameStates.MENU,
  setGameState: (state) => set({ gameState: state }),

  score: 0,
  setScore: (score) => set({ score }),

  highScore: 0,
  setHighScore: (highScore) => set({ highScore }),

  nextFruitIndex: 0,
  setNextFruitIndex: (index) => set({ nextFruitIndex: index }),

  fruits: [],
  setFruits: (fruits) => set({ fruits }),

  // Start game function
  startGame: () => {
    set({
      gameState: GameStates.READY,
      score: 0,
      fruits: [],
    });
    get().generateNextFruit();
  },

  // Generate the next fruit
  generateNextFruit: () => {
    const randomIndex = Math.floor(Math.random() * 5); // Randomly select from the first 5 fruits
    set({ nextFruitIndex: randomIndex });
  },

  // Add a fruit to the screen
  addFruitToScreen: (x, y, sizeIndex) => {
    const newFruit: Fruit = { x, y, sizeIndex, id: Date.now() };
    set((state) => ({
      fruits: [...state.fruits, newFruit],
    }));
    get().checkForMerges(newFruit); // Check for merges after adding the new fruit
  },

  // Update score and save if it's a new high score
  updateScore: (points) => {
    set((state) => {
      const newScore = state.score + points;
      if (newScore > state.highScore) {
        get().saveHighScore(newScore);
      }
      return { score: newScore };
    });
  },

  // Load high score from local storage
  loadHighScore: async () => {
    try {
      const storedHighScore = await AsyncStorage.getItem('highScore');
      const parsedHighScore = storedHighScore ? parseInt(storedHighScore, 10) : 0;
      set({ highScore: parsedHighScore });
    } catch (error) {
      console.error('Failed to load high score:', error);
    }
  },

  // Save high score to local storage
  saveHighScore: async (newHighScore) => {
    try {
      await AsyncStorage.setItem('highScore', newHighScore.toString());
      set({ highScore: newHighScore }); // Update high score in store only after successful save
    } catch (error) {
      console.error('Failed to save high score:', error);
    }
  },

  // Check if two fruits are colliding
  isColliding: (fruitA, fruitB) => {
    const dx = fruitA.x - fruitB.x;
    const dy = fruitA.y - fruitB.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < FRUIT_SIZES[fruitA.sizeIndex].radius + FRUIT_SIZES[fruitB.sizeIndex].radius;
  },

  // Check for merges and handle merging
  checkForMerges: (currentFruit) => {
    const allFruits = get().fruits;
    const matchingFruits = allFruits.filter(
      (fruit) =>
        fruit.sizeIndex === currentFruit.sizeIndex &&
        fruit.id !== currentFruit.id &&
        get().isColliding(currentFruit, fruit)
    );

    if (matchingFruits.length > 0) {
      // If a mergeable fruit is found
      const newSizeIndex = currentFruit.sizeIndex + 1;
      if (newSizeIndex < FRUIT_SIZES.length) {
        // Remove old fruits
        set((state) => ({
          fruits: state.fruits.filter(
            (fruit) => fruit.id !== currentFruit.id && !matchingFruits.includes(fruit)
          ),
        }));
        // Add new merged fruit
        const mergedFruit: Fruit = {
          x: currentFruit.x,
          y: currentFruit.y,
          sizeIndex: newSizeIndex,
          id: Date.now(),
        };
        set((state) => ({
          fruits: [...state.fruits, mergedFruit],
        }));
        // Update score
        get().updateScore(FRUIT_SIZES[newSizeIndex].scoreValue);
        // Recursively check for further merges with the new merged fruit
        get().checkForMerges(mergedFruit);
      } else {
        // If the fruit reaches maximum size, update score accordingly
        get().updateScore(FRUIT_SIZES[newSizeIndex - 1].scoreValue);
      }
    }
  },
}));

export default useGameStore;
