// app/mbti/result.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { calculateMBTI } from '@/utils/calculateMBTI';
import characterMatches from '@/constants/characterMatches';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';

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

  const handleReset = () => {
    router.push('/mbti');
  };

  const handleGoHome = () => {
    router.replace('/'); // 홈 화면으로 이동하는 로직
  };

  if (!character) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>결과를 로드할 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="당신의 MBTI 유형은?" showBackButton={false} titleColor="#000" />

      <Text style={styles.mbtiType}>{character.type}</Text>
      <Image source={character.image} style={styles.image} />

      <Text style={styles.characterTitle}>{character.character}</Text>
      <Text style={styles.description}>{character.description}</Text>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>좋아하는 것</Text>
        <FlatList
          data={character.likes}
          renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
          keyExtractor={(item, index) => `like-${index}`}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>싫어하는 것</Text>
        <FlatList
          data={character.dislikes}
          renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
          keyExtractor={(item, index) => `dislike-${index}`}
        />
      </View>

      {/* 하단 버튼들 */}
      <View style={styles.buttonContainer}>
        <Button
            title="다시 테스트 하기"
            onPress={handleReset}
            gradientColors={['#4A90E2', '#A7C7E7']}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        <Button
            title="홈 화면으로 이동"
            onPress={handleGoHome}
            gradientColors={['#FF6347', '#FF7F50']}
            style={styles.button}
            textStyle={styles.buttonText}
          />
      </View>
    </View>
  );
};

export default MBTIResult;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f8',
  },
  mbtiType: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  characterTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  listContainer: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    paddingLeft: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 3,
    paddingLeft: 20,
  },
  buttonContainer: {
    padding: 5,
    backgroundColor: '#F5F5F5',
  },
  button: {
    borderRadius: 25,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
