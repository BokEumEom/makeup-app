import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import Matter from 'matter-js';
import Fruit from './Fruit';
import { FRUIT_SIZES } from '@/constants/FruitSizes';
import { GameState } from '@/types/GameState';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type FruitType = {
  type: string;
  position: { x: number; y: number };
  radius: number;
};

type FruitManagerProps = {
  onScoreUpdate: (points: number) => void;
  onGameOver: () => void;
  gameState: GameState;
};

const FruitManager: React.FC<FruitManagerProps> = ({ onScoreUpdate, onGameOver, gameState }) => {
  const [fruits, setFruits] = useState<FruitType[]>([]);
  const [canAddNewFruit, setCanAddNewFruit] = useState(true);
  const engineRef = useRef(Matter.Engine.create());
  const engine = engineRef.current;
  const world = engine.world;

  useEffect(() => {
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const leftWall = Matter.Bodies.rectangle(15, screenHeight / 2, 30, screenHeight, { isStatic: true, label: 'wall' });
    const rightWall = Matter.Bodies.rectangle(screenWidth - 15, screenHeight / 2, 30, screenHeight, { isStatic: true, label: 'wall' });
    const ground = Matter.Bodies.rectangle(screenWidth / 2, screenHeight - 30, screenWidth, 60, { isStatic: true, label: 'ground' });
    const topLine = Matter.Bodies.rectangle(screenWidth / 2, 50, screenWidth, 2, { isStatic: true, isSensor: true, label: 'topLine' });

    Matter.World.add(world, [leftWall, rightWall, ground, topLine]);
    Matter.Events.on(engine, 'collisionStart', handleCollision);

    // Add update event listener to check for stable fruits
    Matter.Events.on(engine, 'afterUpdate', checkFruitStability);

    return () => {
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      Matter.Runner.stop(runner);
    };
  }, []);

  useEffect(() => {
    if (gameState === GameState.Running && canAddNewFruit) {
      addFruit();
    }
  }, [gameState, canAddNewFruit]);

  const checkFruitStability = () => {
    const bodies = Matter.Composite.allBodies(world).filter(
      body => body.label !== 'wall' && body.label !== 'ground' && body.label !== 'topLine'
    );

    // Check if all fruits are relatively stable (low velocity)
    const areAllFruitsStable = bodies.every(body => 
      Math.abs(body.velocity.x) < 0.1 && Math.abs(body.velocity.y) < 0.1
    );

    // If all fruits are stable, allow adding new fruit
    if (areAllFruitsStable && !canAddNewFruit) {
      setCanAddNewFruit(true);
    }
  };

  const addFruit = () => {
    if (gameState !== GameState.Running) return;
    
    const fruit = FRUIT_SIZES['cherry'];
    if (fruit) {
      const body = Matter.Bodies.circle(screenWidth / 2, 150, fruit.radius, { 
        label: fruit.label, 
        restitution: 0.2,
        friction: 0.001 // Add low friction to prevent sticking
      });
      Matter.World.add(world, body);
      updateFruits();
      setCanAddNewFruit(false); // Prevent adding new fruit until current one is stable
    }
  };

  const handleCollision = (event: Matter.IEventCollision<Matter.Engine>) => {
    event.pairs.forEach(({ bodyA, bodyB }) => {
      if (bodyA.label === 'topLine' || bodyB.label === 'topLine') {
        onGameOver();
        return;
      }

      if (bodyA.label === bodyB.label && bodyA.label !== 'wall' && bodyA.label !== 'ground' && bodyA.label !== 'topLine') {
        const fruitKeys = Object.keys(FRUIT_SIZES);
        const index = fruitKeys.indexOf(bodyA.label);
        
        if (index < fruitKeys.length - 1) {
          Matter.World.remove(world, [bodyA, bodyB]);
          const nextFruit = FRUIT_SIZES[fruitKeys[index + 1]];
          const mergedFruit = Matter.Bodies.circle(
            (bodyA.position.x + bodyB.position.x) / 2,
            (bodyA.position.y + bodyB.position.y) / 2,
            nextFruit.radius,
            { 
              label: nextFruit.label,
              restitution: 0.2,
              friction: 0.001
            }
          );
          Matter.World.add(world, mergedFruit);
          updateFruits();
          onScoreUpdate(nextFruit.scoreValue || 0);
        }
      }
    });
  };

  const updateFruits = () => {
    const bodies = Matter.Composite.allBodies(world).filter(
      body => body.label !== 'wall' && body.label !== 'ground' && body.label !== 'topLine'
    );
    setFruits(bodies.map(body => ({ 
      type: body.label, 
      position: { x: body.position.x, y: body.position.y }, 
      radius: body.circleRadius || 0 
    })));
  };

  return (
    <View style={{ flex: 1 }}>
      {fruits.map((fruit, index) => (
        <Fruit key={index} type={fruit.type} position={fruit.position} radius={fruit.radius} />
      ))}
    </View>
  );
};

export default FruitManager;
