import React, { createContext, useContext } from 'react';
import { useFontSettings } from '@/hooks/useFontSettings';

const FontSettingsContext = createContext<ReturnType<typeof useFontSettings> | null>(null);

export const FontSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fontSettings = useFontSettings();
  return (
    <FontSettingsContext.Provider value={fontSettings}>
      {children}
    </FontSettingsContext.Provider>
  );
};

export const useFontSettingsContext = () => {
  const context = useContext(FontSettingsContext);
  if (!context) {
    throw new Error('useFontSettingsContext must be used within a FontSettingsProvider');
  }
  return context;
};
