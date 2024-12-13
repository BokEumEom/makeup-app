import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useFontSettingsContext } from '@/contexts/FontSettingsContext';

const CustomText: React.FC<TextProps> = ({ style, ...props }) => {
  const { fontFamily = 'System', fontSize = 14 } = useFontSettingsContext() || {};

  return (
    <Text
      style={[styles.text, { fontFamily, fontSize }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#333333', // 기본 색상
  },
});

export default CustomText;
