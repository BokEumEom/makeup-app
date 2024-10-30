import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_SIZE = SCREEN_WIDTH * 0.6;  // 화면 너비의 60%로 이미지 크기 설정

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
    <LinearGradient colors={['#fff', '#fff']} style={styles.gradientContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          {/* 이미지 추가 */}
          <Image 
            source={require('../../assets/images/splash.png')} 
            style={styles.logoImage} 
          />

          <Text style={styles.title}>소란스러운 내면,이겨내는 나</Text>
          <Text style={styles.subtitle}>소란과 함께 관계 개선을 위한</Text>
          <Text style={styles.subtitle}>첫 걸음을 시작해볼까요?</Text>

          <Text style={styles.selectTitle}>고민되는 관계를 선택해주세요. </Text>
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
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40, // 하단 버튼과의 간격 조정
  },
  logoImage: {
    width: IMAGE_SIZE,       // 화면 너비의 60%로 이미지 너비 설정
    height: IMAGE_SIZE,      // 화면 너비의 60%로 이미지 높이 설정
    marginBottom: 0,
    resizeMode: 'cover',     // 이미지가 전체 영역을 덮도록 설정
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    marginTop: 0,
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
    fontWeight:'700',
    marginTop:50,
    marginBottom: 50,
    textAlign: 'center',
  },
  typesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  typeButton: {
    width: '45%',
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
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
    height: 50,                // 고정된 높이 설정
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',   // 텍스트를 버튼의 세로 중앙에 정렬
    backgroundColor: '#FACC15', // 배경색은 원하는 색상으로 설정
    elevation: 5,
  },
  
  nextButtonText: {
    fontWeight:700,
    color: '#fff',
    fontSize: 18,
  },
});

export default RelationshipTypeScreen;
