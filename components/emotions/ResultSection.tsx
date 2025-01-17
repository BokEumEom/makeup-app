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
        <LinearGradient colors={['#FFCDD2', '#FFCDD2']} style={styles.gradient}>
          <CustomText style={styles.buttonText}>내면 더 알아보기</CustomText>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/emotions')}>
        <LinearGradient colors={['#C8E6C9', '#C8E6C9']} style={styles.gradient}>
          <CustomText style={styles.buttonText}>다른 상태 선택</CustomText>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <LinearGradient colors={['#B3E5FC', '#B3E5FC']} style={styles.gradient}>
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
    fontSize: 24,            // 기존보다 약간 크게 설정해 주목도를 높임
    fontWeight: 'bold',       // 적당히 굵은 폰트로 강조
    color: '#222',           // 진한 톤으로 가독성 강화
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: 0.5,      // 약간의 글자 간격으로 정돈된 느낌
  
    // 배경을 부드럽게 강조하기 위해 투명한 흰색 박스 추가
    paddingVertical: 20,     // 위아래로 충분한 여백을 주어 안정감 제공
    paddingHorizontal: 30,   // 가로 여백을 주어 텍스트를 돋보이게 함
    borderRadius: 10,        // 라운드 코너로 부드러운 느낌 강조
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  
  button: {
    width: '85%',
    marginBottom: 20,
    borderRadius: 25,  // Rounded corners for a softer look
    borderWidth: 2,
    borderColor: '#fff',
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
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
