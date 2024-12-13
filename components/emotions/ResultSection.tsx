// components/emotions/ResultSection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from '@/components/common/CustomText';

type ResultSectionProps = {
  conclusion: string;
  onLearnMore: () => void;
};

export default function ResultSection({ conclusion, onLearnMore }: ResultSectionProps) {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace('/'); // Navigate to home screen
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.conclusion}>{conclusion}</CustomText>

      <TouchableOpacity style={styles.button} onPress={onLearnMore}>
        <LinearGradient colors={['#F4A261', '#E76F51']} style={styles.gradient}>
          <CustomText style={styles.buttonText}>내면 더 알아보기</CustomText>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/emotions')}>
        <LinearGradient colors={['#FFB4A2', '#FF8C66']} style={styles.gradient}>
          <CustomText style={styles.buttonText}>다른 상태 선택</CustomText>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <LinearGradient colors={['#FFE4C4', '#FFADAD']} style={styles.gradient}>
          <CustomText style={styles.buttonText}>홈 화면으로 이동</CustomText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFF1E6',
  },
  conclusion: {
    fontSize: 22,
    fontWeight: '500',
    color: '#444',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 32,
  },
  button: {
    width: '85%',
    marginBottom: 20,
    borderRadius: 25,  // Rounded corners for a softer look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});
