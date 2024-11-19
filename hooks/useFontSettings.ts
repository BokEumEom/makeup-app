// hooks/useFontSettings.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFontSettings = () => {
  const [fontFamily, setFontFamily] = useState<string>('NEXONLv2Gothic');
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    const loadFontSettings = async () => {
      const storedFontFamily = await AsyncStorage.getItem('fontFamily');
      const storedFontSize = await AsyncStorage.getItem('fontSize');

      if (storedFontFamily) setFontFamily(storedFontFamily);
      if (storedFontSize) setFontSize(Number(storedFontSize));
    };
    loadFontSettings();
  }, []);

  const updateFontFamily = async (font: string) => {
    setFontFamily(font);
    await AsyncStorage.setItem('fontFamily', font);
  };

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
