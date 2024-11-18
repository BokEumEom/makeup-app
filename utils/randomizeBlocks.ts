type Block = {
  id: number;
  color: string;
  symbol: string;
};

const COLORS = ['red', 'yellow', 'blue', 'green', 'purple']; // Add colors as needed

export const generateRandomizedBlocks = (level: number): Block[][] => {
  // Determine colors and number of blocks based on level
  const colorCount = Math.min(level + 1, COLORS.length); // Limit to available colors
  const blocksPerColor = 4; // Set blocks per color
  const rodCount = colorCount + 1; // One extra rod for empty space

  // Generate blocks based on the number of colors
  let blocks: Block[] = [];
  let idCounter = 1;

  for (let i = 0; i < colorCount; i++) {
    for (let j = 0; j < blocksPerColor; j++) {
      blocks.push({
        id: idCounter++,
        color: COLORS[i],
        symbol: i % 2 === 0 ? 'X' : 'O', // Alternate symbols
      });
    }
  }

  // Shuffle the blocks
  const shuffledBlocks = blocks.sort(() => Math.random() - 0.5);

  // Distribute blocks across rods with one empty rod
  const rods: Block[][] = Array.from({ length: rodCount }, () => []);
  shuffledBlocks.forEach((block, index) => {
    rods[index % (rodCount - 1)].push(block);
  });

  return rods;
};
