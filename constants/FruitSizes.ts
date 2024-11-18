// constants/FruitSizes.ts
import { FruitSize } from '@/types/FruitTypes';

export const FRUIT_SIZES: Record<string, FruitSize> = {
  cherry: {
    label: "cherry",
    radius: 16.5,
    scoreValue: 1,
    color: "#F20306",
    img: require('@/assets/watermelon/00_cherry.png'),
  },
  strawberry: {
    label: "strawberry",
    radius: 24,
    scoreValue: 3,
    color: "#FF624C",
    img: require('@/assets/watermelon/01_strawberry.png'),
  },
  grape: {
    label: "grape",
    radius: 30.5,
    scoreValue: 6,
    color: "#A969FF",
    img: require('@/assets/watermelon/02_grape.png'),
  },
  gyool: {
    label: "gyool",
    radius: 34.5,
    scoreValue: 10,
    color: "#FFAF02",
    img: require('@/assets/watermelon/03_gyool.png'),
  },
  orange: {
    label: "orange",
    radius: 44.5,
    scoreValue: 15,
    color: "#FC8611",
    img: require('@/assets/watermelon/04_orange.png'),
  },
  apple: {
    label: "apple",
    radius: 57,
    scoreValue: 21,
    color: "#F41615",
    img: require('@/assets/watermelon/05_apple.png'),
  },
  pear: {
    label: "pear",
    radius: 64.5,
    scoreValue: 28,
    color: "#FDF176",
    img: require('@/assets/watermelon/06_pear.png'),
  },
  peach: {
    label: "peach",
    radius: 78,
    scoreValue: 36,
    color: "#FEB6AC",
    img: require('@/assets/watermelon/07_peach.png'),
  },
  pineapple: {
    label: "pineapple",
    radius: 88.5,
    scoreValue: 45,
    color: "#F7E608",
    img: require('@/assets/watermelon/08_pineapple.png'),
  },
  melon: {
    label: "melon",
    radius: 110,
    scoreValue: 55,
    color: "#89CE13",
    img: require('@/assets/watermelon/09_melon.png'),
  },
  watermelon: {
    label: "watermelon",
    radius: 129.5,
    scoreValue: 66,
    color: "#26AA1E",
    img: require('@/assets/watermelon/10_watermelon.png'),
  },
};
