import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface EmotionalState {
  stress: number;
  happiness: number;
  confidence: number;
  anxiety: number;
}

interface EmotionContextProps {
  emotionState: EmotionalState;
  updateEmotion: (impact: EmotionalState) => void;
  resetEmotion: () => void;
}

const initialEmotionState: EmotionalState = {
  stress: 50,
  happiness: 50,
  confidence: 50,
  anxiety: 50,
};

// Create the context
export const EmotionContext = createContext<EmotionContextProps | undefined>(undefined);

// Provider component
export const EmotionProvider = ({ children }: { children: ReactNode }) => {
  const [emotionState, setEmotionState] = useState<EmotionalState>(initialEmotionState);

  const updateEmotion = (impact: EmotionalState) => {
    setEmotionState((prevState) => ({
      stress: Math.min(100, Math.max(0, prevState.stress + impact.stress)),
      happiness: Math.min(100, Math.max(0, prevState.happiness + impact.happiness)),
      confidence: Math.min(100, Math.max(0, prevState.confidence + impact.confidence)),
      anxiety: Math.min(100, Math.max(0, prevState.anxiety + impact.anxiety)),
    }));
  };

  const resetEmotion = () => {
    setEmotionState(initialEmotionState);
  };

  return (
    <EmotionContext.Provider value={{ emotionState, updateEmotion, resetEmotion }}>
      {children}
    </EmotionContext.Provider>
  );
};

// Custom hook for using EmotionContext
export const useEmotionContext = () => {
  const context = useContext(EmotionContext);
  if (!context) {
    throw new Error('useEmotionContext must be used within an EmotionProvider');
  }
  return context;
};
