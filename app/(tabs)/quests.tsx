import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { QuestContext } from '../../contexts/QuestContext';
import { QuestCard } from '../../components/quest/QuestCard';
import { RecommendedQuests } from '../../components/quest/RecommendedQuests';
import { GradientBackground } from '../../components/common/GradientBackground';
import { QuestBadge } from '../../components/quest/QuestBadge';
import { Header } from '../../components/common/Header'; // Header 컴포넌트 임포트
import { Button } from '../../components/common/Button'; // Button 컴포넌트 임포트
import { useRouter } from 'expo-router';  // 페이지 이동을 위한 router 사용

export const QuestScreen = () => {
  const { acceptedQuests, completeQuest, startQuest, cancelQuest } = useContext(QuestContext);
  const router = useRouter();  // router 초기화

  // 진행 중인 퀘스트와 완료된 퀘스트 분리
  const ongoingQuests = acceptedQuests.filter((quest) => !quest.completed);
  const completedQuests = acceptedQuests.filter((quest) => quest.completed);

  const handleViewCompletedQuests = () => {
    router.push('/quest/completed');  // 완료된 퀘스트 페이지로 이동
  };

  return (
    <GradientBackground colors={['#F5F5F5', '#F5F5F5']}>
      {/* Header 컴포넌트 추가 */}
      <Header title="퀘스트 대시보드" showBackButton={true} titleColor="#000" />

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* 배지 */}
        <QuestBadge />

        {/* 진행 중인 퀘스트 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>진행 중인 퀘스트</Text>
          {ongoingQuests.length > 0 ? (
            ongoingQuests.map((quest) => (
              <QuestCard
                key={quest.id}
                id={quest.id}
                title={quest.title}
                progress={quest.progress}
                completed={quest.completed}
                started={quest.started}
                onComplete={() => completeQuest(quest.id)}
                onStart={() => startQuest(quest.id)}
                onCancel={() => cancelQuest(quest.id)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>진행 중인 퀘스트가 없습니다.</Text>
          )}
        </View>

        {/* 완료된 퀘스트 보기 버튼 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>완료된 퀘스트</Text>
          {completedQuests.length > 0 ? (
            <Button
              title="완료된 퀘스트 보기"
              onPress={handleViewCompletedQuests}
              gradientColors={['#4A90E2', '#4A90E2']}  // Button 컴포넌트 사용
              style={styles.viewCompletedButton}
            />
          ) : (
            <Text style={styles.emptyText}>완료된 퀘스트가 없습니다.</Text>
          )}
        </View>

        {/* 추천 퀘스트 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>추천 퀘스트</Text>
          <RecommendedQuests />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    borderColor: '#DDD', // 경계선 추가
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A4A4A',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  viewCompletedButton: {
    marginTop: 10,
    width: '100%',
  },
});

export default QuestScreen;
