import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { QuestContext } from '../../contexts/QuestContext';
import { Button } from '../common/Button';
import { Quest } from '../../types/quest';  // Quest 타입을 사용

type CategorizedQuests = {
  [key: string]: Quest[];
};

export const RecommendedQuests = () => {
  const { quests, acceptedQuests, acceptQuest } = useContext(QuestContext);
  const [visibleItems, setVisibleItems] = useState<number>(2);  // 처음에 보여줄 퀘스트 수
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);  // 선택된 카테고리 상태

  // 수락되지 않은 퀘스트만 필터링
  const unacceptedQuests: Quest[] = quests.filter(
    (quest) => !acceptedQuests.some((accepted) => accepted.id === quest.id)
  );

  // 카테고리별로 퀘스트를 그룹화
  const categorizedQuests: CategorizedQuests = unacceptedQuests.reduce((acc: CategorizedQuests, quest: Quest) => {
    if (!acc[quest.category]) acc[quest.category] = [];
    acc[quest.category].push(quest);
    return acc;
  }, {});

  const loadMoreItems = () => {
    setVisibleItems((prevCount) => prevCount + 2);  // 2개씩 추가 로드
  };

  return (
    <View style={styles.container}>
      {/* 카테고리 필터를 한 줄로 슬라이드 가능하게 설정 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {Object.keys(categorizedQuests).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedCategory(category === selectedCategory ? null : category)}  // 같은 카테고리 선택 시 필터 해제
          >
            <Text style={styles.filterText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 퀘스트 목록 */}
      {Object.keys(categorizedQuests).length > 0 ? (
        categorizedQuests[selectedCategory || Object.keys(categorizedQuests)[0]]
          .slice(0, visibleItems)
          .map((quest: Quest) => (
            <View key={quest.id} style={styles.questCard}>
              <Text style={styles.title}>{quest.title}</Text>
              <Text style={styles.description}>{quest.description}</Text>

              <Button
                title="퀘스트 수락"
                onPress={() => acceptQuest(quest.id)}
                gradientColors={['#6A92B8', '#6A92B8']}
                style={styles.button}
              />
            </View>
          ))
      ) : (
        <Text style={styles.noQuestsText}>추천할 퀘스트가 없습니다.</Text>
      )}

      {/* 더 보기 버튼 */}
      {visibleItems < unacceptedQuests.length && (
        <Button
          title="더 보기"
          onPress={loadMoreItems}
          gradientColors={['#4A90E2', '#A7C7E7']}
          style={styles.loadMoreButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
  },
  filterScroll: {
    marginBottom: 20,  // 필터와 퀘스트 목록 간 간격
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    marginRight: 4,  // 버튼 사이 간격
  },
  selectedFilterButton: {
    backgroundColor: '#E6D7C3',
  },
  filterText: {
    color: '#333',
  },
  questCard: {
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  button: {
    width: '100%',
  },
  loadMoreButton: {
    marginTop: 10,
  },
  noQuestsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default RecommendedQuests;
