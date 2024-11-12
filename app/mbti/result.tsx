import characterMatches from '@/constants/characterMatches';
import { calculateMBTI } from '@/utils/calculateMBTI';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MBTIResult = () => {
  const { answers } = useLocalSearchParams();
  const router = useRouter();

  let parsedAnswers = {};
  try {
    parsedAnswers = JSON.parse(answers as string);
  } catch (error) {
    console.error('Failed to parse answers:', error);
  }

  const mbtiType = calculateMBTI(parsedAnswers);
  const character = characterMatches.find((char) => char.type === mbtiType);

  const handleReset = () => router.push('/mbti');
  const handleGoHome = () => router.replace('/');

  if (!character) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>결과를 로드할 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mbtiType}>당신은 {character.type} 유형입니다.</Text>
      <Text style={styles.characterTitle}>{character.character}</Text>
      <Image source={character.image} style={styles.image} />
      <Text style={styles.description}>{character.description}</Text>

      {/* 좋아하는 것 나열식 */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>좋아하는 것</Text>
        <Text style={styles.listItem}>{character.likes.join(', ')}</Text>
      </View>

      {/* 싫어하는 것 나열식 */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>싫어하는 것</Text>
        <Text style={styles.listItem}>{character.dislikes.join(', ')}</Text>
      </View>

      {/* 하단 버튼들 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>다시 테스트 하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleGoHome}>
          <Text style={styles.buttonText}>홈 화면으로 이동</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MBTIResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F0F5FA',
  },
  mbtiType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A5568',
    marginVertical: 10,
  },
  characterTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#7F9CF5',
    marginBottom: 0,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  description: {
    backgroundColor: '#FFFFFF',
    fontSize: 18,
    color: '#4A5568',
    padding: 20,
    marginVertical: 10,
    width: '90%',
  },
  listContainer: {
    backgroundColor: '#FFFFFF',
    //borderRadius: 12,
    padding: 15,
    marginVertical: 0,
    width: '90%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#319795',
    marginBottom: 5,
  },
  listItem: {
    fontSize: 16,
    color: '#4A5568',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#63B3ED',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: '#48BB78',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#E53E3E',
    textAlign: 'center',
  },
});
