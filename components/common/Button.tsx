import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  View, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ButtonProps } from '../../types/common';

interface CustomButtonProps extends ButtonProps {
  gradientColors?: string[];
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<CustomButtonProps> = ({ 
  title, 
  onPress, 
  disabled = false, 
  loading = false,
  gradientColors,
  style,
  textStyle
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[style, disabled && styles.disabledButton]}
    >
      {gradientColors ? (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button]}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          )}
        </LinearGradient>
      ) : (
        <View style={[styles.button, { backgroundColor: '#6A92B8' }]}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
