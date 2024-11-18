import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useLevelContext } from '@/contexts/LevelContext';
import { generateRandomizedBlocks } from '@/utils/randomizeBlocks';

type Block = {
  id: number;
  color: string;
  symbol: string;
  position: Animated.ValueXY;
};

export default function LevelScreen() {
  const router = useRouter();
  const { completeLevel } = useLevelContext();
  const { level } = useLocalSearchParams<{ level: string }>();
  const levelNumber = parseInt(level || '1', 10);

  // Generate initial rod configuration based on the level number
  const [rods, setRods] = useState<Block[][]>(
    generateRandomizedBlocks(levelNumber).map((rod) =>
      rod.map((block) => ({
        ...block,
        position: new Animated.ValueXY(), // Initialize position for each block
      }))
    )
  );

  const selectedBlock = useRef<{ block: Block; rodIndex: number } | null>(null);

  const handleBlockPress = (rodIndex: number, block: Block) => {
    // Only allow moving the top block of each rod
    if (rods[rodIndex][rods[rodIndex].length - 1]?.id === block.id) {
      selectedBlock.current = { block, rodIndex };
    } else {
      Alert.alert("Invalid Move", "Only the top block can be moved.");
    }
  };

  const handleDrop = (targetRodIndex: number) => {
    if (!selectedBlock.current) return;

    const { block, rodIndex } = selectedBlock.current;

    // Prevent moving to the same rod
    if (rodIndex === targetRodIndex) return;

    // Check if the target rod is empty or contains blocks of the same color
    if (
      rods[targetRodIndex].length === 0 ||
      rods[targetRodIndex].every((b) => b.color === block.color)
    ) {
      // Update rods state to reflect the move
      const updatedRods = rods.map((rod, index) => {
        if (index === rodIndex) {
          // Remove the block from the original rod
          return rod.slice(0, -1);
        } else if (index === targetRodIndex) {
          // Add block to the target rod
          return [...rod, block];
        }
        return rod;
      });

      // Set the block's position to align within the target rod
      block.position.setValue({ x: 0, y: 0 });

      // Update state with the new rod configuration
      setRods(updatedRods);

      // Clear the selected block
      selectedBlock.current = null;

      // Check if the level is complete
      checkCompletion(updatedRods);
    } else {
      // Invalid move, reset selectedBlock
      selectedBlock.current = null;
      Alert.alert("Invalid Move", "You can only place blocks of the same color together or move to an empty rod.");
    }
  };

  // Create PanResponders only for top blocks
  const panResponders = rods.map((rod, rodIndex) =>
    rod.map((block, blockIndex) => {
      const pan = block.position;
      const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          handleBlockPress(rodIndex, block); // Use handleBlockPress to set selected block
          pan.setOffset({
            x: pan.x._value,
            y: pan.y._value,
          });
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
          pan.flattenOffset();
          // Drop only if the block was moved
          handleDrop(selectedBlock.current?.rodIndex ?? 0);
          selectedBlock.current = null;
        },
      });
      return { pan, panResponder };
    })
  );

  const checkCompletion = (updatedRods: Block[][]) => {
    const isCompleted = updatedRods.every(
      (rod) =>
        rod.length === 0 || rod.every((block) => block.color === rod[0].color)
    );

    if (isCompleted) {
      completeLevel(levelNumber);
      Alert.alert('Level Completed!', 'You have sorted the blocks by color!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Level {levelNumber}</Text>
      <View style={styles.rodsContainer}>
        {rods.map((rod, rodIndex) => (
          <View key={rodIndex} style={styles.rod}>
            {rod.map((block, blockIndex) => {
              const { pan, panResponder } = panResponders[rodIndex][blockIndex];
              return (
                <Animated.View
                  key={block.id}
                  style={[
                    styles.block,
                    { backgroundColor: getColor(block.color) },
                    pan.getLayout(),
                  ]}
                  {...panResponder.panHandlers}
                >
                  <Text style={styles.blockText}>{block.symbol}</Text>
                </Animated.View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const getColor = (color: string) => {
  switch (color) {
    case 'red':
      return '#ff4c4c';
    case 'yellow':
      return '#ffd700';
    case 'blue':
      return '#1e90ff';
    case 'green':
      return '#32cd32';
    case 'purple':
      return '#8a2be2';
    default:
      return '#ffffff';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3d2b1f',
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5a623',
    marginBottom: 20,
  },
  rodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  rod: {
    width: 60,
    minHeight: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#5d3a1a',
    padding: 5,
    borderRadius: 10,
  },
  block: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
  },
  blockText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
