import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Level {
  number: number;
  status: 'locked' | 'available' | 'completed';
  icon?: string;
}

interface LevelContextType {
  levels: Level[];
  completeLevel: (levelNumber: number) => void;
}

const initialLevels: Level[] = [
  { number: 1, status: 'available' },
  { number: 2, status: 'locked' },
  { number: 3, status: 'locked' },
  { number: 4, status: 'locked' },
  { number: 5, status: 'locked' },
  // Add more levels as needed
];

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider = ({ children }: { children: ReactNode }) => {
  const [levels, setLevels] = useState(initialLevels);

  const completeLevel = (levelNumber: number) => {
    setLevels((prevLevels) =>
      prevLevels.map((level) => {
        if (level.number === levelNumber) {
          return { ...level, status: 'completed' }; // Mark the level as completed
        } else if (level.number === levelNumber + 1 && level.status === 'locked') {
          return { ...level, status: 'available' }; // Unlock the next level
        }
        return level;
      })
    );
  };

  return (
    <LevelContext.Provider value={{ levels, completeLevel }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevelContext = () => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error('useLevelContext must be used within a LevelProvider');
  }
  return context;
};
