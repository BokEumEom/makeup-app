// app/game/quiz.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Header } from '@/components/common/Header';
import { useChatQuiz } from '@/hooks/useChatQuiz';
import ChatMessage from '@/components/quiz/ChatMessage';
import OptionButton from '@/components/quiz/OptionButton';
import FeedbackPopup from '@/components/quiz/FeedbackPopup';
import StatsPanel from '@/components/quiz/StatsPanel';

const QuizGame = () => {
  const {
    messages,
    currentData,
    selectedOption,
    feedbackMessage,
    handleOptionSelect,
    isTyping,
    isOptionVisible,
    score,
    stats,
    skills,
  } = useChatQuiz();

  const flatListRef = useRef<FlatList>(null);

  const [autoOpenOptions, setAutoOpenOptions] = useState(false);

  useEffect(() => {
    if (currentData?.type === 'question' && !isTyping && isOptionVisible) {
      setAutoOpenOptions(true);
    } else {
      setAutoOpenOptions(false);
    }
  }, [currentData, isTyping, isOptionVisible]);

  const renderMessage = ({ item }: { item: { type: string; content: string } }) => (
    <ChatMessage type={item.type as any} content={item.content} />
  );

  const renderTypingIndicator = () => isTyping && <ChatMessage type="typing" content="" />;

  return (
    <View style={styles.container}>
      <Header title="Quiz Game" showBackButton titleColor="#000" />

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderTypingIndicator}
        style={styles.chatList}
        contentContainerStyle={styles.chatListContent}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
      />

      {currentData?.type === 'question' && isOptionVisible && (
        <View style={styles.optionsContainer}>
          <OptionButton
            text="Options"
            options={currentData.options}
            onSelect={(index) => {
              handleOptionSelect(index);
              setAutoOpenOptions(false);
            }}
            isSelected={selectedOption !== null}
            autoOpen={autoOpenOptions}
          />
        </View>
      )}

      {feedbackMessage && (
        <FeedbackPopup
          message={feedbackMessage}
          type={feedbackMessage === '정답입니다!' ? 'success' : 'error'}
          onClose={() => {}}
        />
      )}

      {/* 화면 오른쪽 상단에 StatsPanel 고정 */}
      <View style={styles.statsPanelWrapper}>
        <StatsPanel 
          stats={stats} 
          score={score} 
          skills={skills} 
        />
      </View>
    </View>
  );
};

export default QuizGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 10,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingBottom: 100,
  },
  optionsContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsPanelWrapper: {
    position: 'absolute',
    top: 80,
    right: 10,
    zIndex: 999,
  },
});
