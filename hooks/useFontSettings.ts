// hooks/useFontSettings.ts

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFontSettings = () => {
  const [fontFamily, setFontFamily] = useState<string>('프리텐다드');
  const [fontSize, setFontSize] = useState<number>(16);

  // Load font settings from AsyncStorage
  useEffect(() => {
    const loadFontSettings = async () => {
      const storedFontFamily = await AsyncStorage.getItem('fontFamily');
      const storedFontSize = await AsyncStorage.getItem('fontSize');

      if (storedFontFamily) setFontFamily(storedFontFamily);
      if (storedFontSize) setFontSize(Number(storedFontSize));
    };
    loadFontSettings();
  }, []);

  // Update and persist font family
  const updateFontFamily = async (font: string) => {
    setFontFamily(font);
    await AsyncStorage.setItem('fontFamily', font);
  };

  // Update and persist font size
  const updateFontSize = async (size: number) => {
    setFontSize(size);
    await AsyncStorage.setItem('fontSize', size.toString());
  };

  return {
    fontFamily,
    fontSize,
    updateFontFamily,
    updateFontSize,
  };
};
