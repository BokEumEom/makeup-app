import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BaseComponentProps } from '../../types/common';

interface GradientBackgroundProps extends BaseComponentProps {
  colors: string[];
  style?: ViewStyle;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ 
  children, 
  colors, 
  style 
}) => {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
