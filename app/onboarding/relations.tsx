import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_SIZE = SCREEN_WIDTH * 0.6; // 화면 너비의 60%로 이미지 크기 설정

const relationshipTypes = [
  { id: 'partner', label: '연인' },
  { id: 'couple', label: '부부' },
  { id: 'family', label: '가족' },
  { id: 'friend', label: '친구' },
  { id: 'coworker', label: '직장 동료' },
  { id: 'newface', label: '처음알게된 관계' },
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
    <LinearGradient colors={['#fff', '#fff']} style={styles.gradientContainer}>
      <SafeAreaView style={styles.container}>
        {/* ScrollView 추가로 스크롤 가능하게 만듦 */}
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <Image source={require('../../assets/images/splash.png')} style={styles.logoImage} />

            <Text style={styles.title}>소란스러운 내면, 이겨내는 나</Text>
            <Text style={styles.subtitle}>소란과 함께 관계 개선을 위한</Text>
            <Text style={styles.subtitle}>첫 걸음을 시작해볼까요?</Text>

            <Text style={styles.selectTitle}>고민되는 관계를 선택해주세요.</Text>
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
          </View>
        </ScrollView>

        {/* 하단 고정 버튼 */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>시작하기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80, // 하단 버튼과의 여백 확보
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  logoImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 0,
  },
  selectTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 30,
    textAlign: 'center',
  },
  typesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  typeButton: {
    width: '45%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#F2F5F8',
    margin: 5,
  },
  typeButtonSelected: {
    backgroundColor: 'rgb(72, 199, 142)',
  },
  typeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  typeButtonTextSelected: {
    color: '#fff',
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    paddingVertical: 15,     // paddingVertical로 버튼 높이 설정
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FACC15',
    elevation: 5,
  },
  nextButtonText: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 18,
  },
});

export default RelationshipTypeScreen;
