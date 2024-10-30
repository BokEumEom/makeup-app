import React, { useContext } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { QuestObjective } from '../../components/quest/QuestObjective';
import { QuestSteps } from '../../components/quest/QuestSteps';
import { QuestRewards } from '../../components/quest/QuestRewards';
import { QuestContext } from '../../contexts/QuestContext';
import { GradientBackground } from '../../components/common/GradientBackground';
import { Button } from '../../components/common/Button';
import { Header } from '../../components/common/Header'; // Header 임포트
import { useLocalSearchParams } from 'expo-router';

export const QuestDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { quests, completeQuest, startQuest } = useContext(QuestContext);
  const quest = quests.find((q) => q.id === parseInt(id, 10));

  if (!quest) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>퀘스트를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <GradientBackground colors={['#E6D7C3', '#B8A78A']}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header 컴포넌트 추가 */}
        <Header title="퀘스트 상세" showBackButton={true} />

        <View style={styles.questDetailContainer}>
          <QuestObjective title={quest.title} description={quest.description} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>퀘스트 단계</Text>
            <QuestSteps steps={['첫 단계', '두 번째 단계', '마지막 단계']} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>보상</Text>
            <QuestRewards points={100} badge="badge_image_path" />
          </View>

          {/* 퀘스트 시작 또는 완료 버튼 */}
          <View style={styles.buttonContainer}>
            {!quest.started ? (
              <Button
                title="퀘스트 시작"
                onPress={() => startQuest(quest.id)}  // 퀘스트 시작 함수 호출
                gradientColors={['#4A90E2', '#4A90E2']}
                style={styles.button}
              />
            ) : (
              <Button
                title="퀘스트 완료"
                onPress={() => completeQuest(quest.id)}
                gradientColors={['#4A90E2', '#4A90E2']}
                style={styles.button}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  questDetailContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#FF6347',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QuestDetailScreen;
