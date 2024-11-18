// components/common/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  titleColor?: string; // 텍스트 색상을 설정할 수 있는 props
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
  titleColor = '#FFFFFF', // 기본값 설정
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <AntDesign name="leftcircleo" size={26} color={titleColor} />
          </TouchableOpacity>
        )}
        <Text style={[styles.headerTitle, { color: titleColor }]}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // backgroundColor: '#4A90E2', // 고정된 배경색
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'DepartureMono',
  },
});
