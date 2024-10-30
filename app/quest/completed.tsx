import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { QuestContext } from '../../contexts/QuestContext';
import { GradientBackground } from '../../components/common/GradientBackground';
import { Header } from '../../components/common/Header';
import { useRouter } from 'expo-router';

const CompletedQuestsScreen = () => {
  const { completedQuests } = useContext(QuestContext);
  const router = useRouter();

  const handleQuestPress = (id: number) => {
    // 퀘스트 상세 화면으로 이동
    router.push(`/quest/details?id=${id}`);
  };

  return (
    <GradientBackground colors={['#E6D7C3', '#B8A78A']}>
      <Header title="완료된 퀘스트" showBackButton={true} />

      <ScrollView contentContainerStyle={styles.container}>
        {completedQuests.length > 0 ? (
          completedQuests.map((quest) => (
            <TouchableOpacity 
              key={quest.id} 
              style={styles.questCard} 
              onPress={() => handleQuestPress(quest.id)} // 상세 화면으로 이동
            >
              <Text style={styles.questTitle}>{quest.title}</Text>
              <Text style={styles.questDescription}>{quest.description}</Text>
              <Text style={styles.completedText}>완료됨</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noQuestsText}>아직 완료된 퀘스트가 없습니다.</Text>
        )}
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    flexGrow: 1,
  },
  questCard: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    elevation: 3,
  },
  questTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  questDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  completedText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  noQuestsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default CompletedQuestsScreen;
