import React, { useCallback, useMemo } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

interface RelationshipTypeViewProps {
  types: { id: string; label: string }[];
  selectedType: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_SIZE = SCREEN_WIDTH * 0.6; // 화면 너비의 60%로 이미지 크기 설정
const TYPE_BUTTON_WIDTH = SCREEN_WIDTH * 0.4;

export const RelationshipTypeView: React.FC<RelationshipTypeViewProps> = React.memo(({
  types,
  selectedType,
  onSelect,
  onNext,
}) => {
  const handleSelect = useCallback(
    (id: string) => onSelect(id),
    [onSelect]
  );

  const renderedTypes = useMemo(
    () =>
      types.map((type) => (
        <TouchableOpacity
          key={type.id}
          style={[styles.typeButton, selectedType === type.id && styles.typeButtonSelected]}
          onPress={() => handleSelect(type.id)}
        >
          <Text
            style={[styles.typeButtonText, selectedType === type.id && styles.typeButtonTextSelected]}
          >
            {type.label}
          </Text>
        </TouchableOpacity>
      )),
    [types, selectedType, handleSelect]
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Image source={require('@/assets/images/splash.png')} style={styles.logoImage} />
          <Text style={styles.title}>소란스러운 내면, 이겨내는 나</Text>
          <Text style={styles.subtitle}>소란과 함께 관계 개선을 위한</Text>
          <Text style={styles.subtitle}>첫 걸음을 시작해볼까요?</Text>
          <Text style={styles.selectTitle}>고민되는 관계를 선택해주세요.</Text>
          <View style={styles.typesContainer}>{renderedTypes}</View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  typeButton: {
    width: TYPE_BUTTON_WIDTH,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#FACC15',
    margin: 5,
  },
  typeButtonSelected: {
    backgroundColor: '#FACC15',
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
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FACC15',
  },
  nextButtonText: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 18,
  },
});
