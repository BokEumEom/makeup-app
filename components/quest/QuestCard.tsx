// components/quest/QuestCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../common/Button'; // Button 컴포넌트 임포트
import { useRouter } from 'expo-router'; // Router를 사용하여 화면 이동 처리

type QuestCardProps = {
  id: number;
  title: string;
  progress: number; // 진행도 (0 ~ 100)
  completed: boolean;
  started: boolean;
  onComplete: () => void;
  onStart: () => void;
  onCancel: () => void; // 취소 함수 추가
};

export const QuestCard: React.FC<QuestCardProps> = ({
  id,
  title,
  progress,
  completed,
  started,
  onComplete,
  onStart,
  onCancel,
}) => {
  const router = useRouter(); // useRouter 사용하여 상세 페이지로 이동

  // 상세 화면으로 이동하는 함수
  const handlePress = () => {
    router.push(`/quest/details?id=${id}`); // 퀘스트 ID를 포함한 상세 페이지로 이동
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>

          {/* Progress Bar */}
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{`진행도: ${progress}%`}</Text>

          {/* 퀘스트 시작 버튼 */}
          {!started && !completed && (
            <Button
              title="퀘스트 시작"
              onPress={onStart}
              gradientColors={['#4A90E2', '#A7C7E7']}
              style={styles.startButton}
            />
          )}

          {/* 완료 버튼 */}
          {started && !completed && (
            <Button
              title="완료하기"
              onPress={onComplete}
              gradientColors={['#4A90E2', '#4A90E2']}
              style={styles.completeButton}
            />
          )}

          {/* 완료된 퀘스트 표시 */}
          {completed && <Text style={styles.completedText}>퀘스트 완료됨</Text>}

          {/* 퀘스트 취소 버튼 */}
          {!completed && (
            <Button
              title="퀘스트 취소"
              onPress={onCancel}
              gradientColors={['#FF6347', '#FF7F50']}
              style={styles.cancelButton}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    elevation: 3,
  },
  cardContent: {},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  startButton: {
    marginTop: 10,
    width: '100%',
  },
  completeButton: {
    marginTop: 10,
    width: '100%',
  },
  completedText: {
    color: '#4A90E2',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
    width: '100%',
  },
});
