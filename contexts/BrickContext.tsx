// contexts/BrickContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

type BrickContextType = {
  score: number;
  lives: number;
  increaseScore: () => void;
  decreaseLives: () => void;
  resetGame: () => void;
};

const BrickContext = createContext<BrickContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const increaseScore = () => setScore((prev) => prev + 1);
  const decreaseLives = () => setLives((prev) => prev - 1);
  const resetGame = () => {
    setScore(0);
    setLives(3);
  };

  return (
    <BrickContext.Provider value={{ score, lives, increaseScore, decreaseLives, resetGame }}>
      {children}
    </BrickContext.Provider>
  );
}

export function useGame() {
  const context = useContext(BrickContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
}
