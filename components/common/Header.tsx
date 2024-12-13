import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomText from '@/components/common/CustomText';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  titleColor?: string;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
  titleColor = '#333333',
  onBackPress,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress(); // 사용자 정의 콜백 실행
    } else {
      router.back(); // 기본 뒤로 가기
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <AntDesign name="leftcircleo" size={26} color={titleColor} />
          </TouchableOpacity>
        )}
        <CustomText style={[styles.headerTitle, { color: titleColor }]}>{title}</CustomText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 15, // 세로 여백
    paddingHorizontal: 16, // 좌우 여백
  },
  backButton: {
    position: 'absolute',
    left: 16, // 좌측 여백
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

