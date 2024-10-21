// app/onboarding/relations.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const relationshipTypes = [
  { id: 'partner', label: '연인' },
  { id: 'couple', label: '부부' },
  { id: 'family', label: '가족' },
  { id: 'friend', label: '친구' },
  { id: 'coworker', label: '직장 동료' },
];

const RelationshipTypeScreen = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedType) {
      router.push({
        pathname: '/onboarding',
        params: { relationshipType: selectedType },
      });
    } else {
      alert('관계 유형을 선택해주세요.');
    }
  };

  return (
    <LinearGradient colors={['#A7C7E7', '#6A92B8']} style={styles.gradientContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.logo}>소란</Text>
          <Text style={styles.title}>소란에 오신 것을 환영합니다</Text>
          <Text style={styles.subtitle}>관계 개선을 위한 첫 걸음을 함께 시작해볼까요?</Text>

          <Text style={styles.selectTitle}>개선하고자 하는 관계를 선택하세요</Text>
          <View style={styles.typesContainer}>
            {relationshipTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  selectedType === type.id && styles.typeButtonSelected,
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    selectedType === type.id && styles.typeButtonTextSelected,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>시작하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  title: {
    fontSize: 22, // 폰트 크기 조정
    fontWeight: '500',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14, // 폰트 크기 조정
    textAlign: 'center',
    marginBottom: 25,
    color: '#FFFFFF',
  },
  selectTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  typesContainer: {
    width: '100%',
    marginBottom: 30,
  },
  typeButton: {
    padding: 20, // 버튼 크기 증가
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 20, // 버튼 간격 증가
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000', // 그림자 추가
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  typeButtonSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#A7C7E7', // 선택된 버튼 배경색 변경
  },
  typeButtonText: {
    fontSize: 18,
    color: '#333',
  },
  typeButtonTextSelected: {
    color: '#4A90E2',
  },
  nextButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 20, // 버튼 크기 증가
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 20, // 텍스트 크기 증가
    fontWeight: 'bold',
  },
});

export default RelationshipTypeScreen;
