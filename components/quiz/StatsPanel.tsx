// components/quiz/StatsPanel.tsx
import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { CircleChevronDown, CircleChevronUp } from 'lucide-react-native';

// 화면 크기 상수로 정의
const SCREEN = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
};

interface StatsPanelProps {
  stats: { [key: string]: number };
  score: number;
  skills: { [key: string]: number }; // 스킬과 레벨을 매핑한 객체
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, score, skills }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 펼침/접힘 상태

  const collapsedHeight = SCREEN.HEIGHT * 0.06; // 접힌 상태 높이 (화면 높이의 6%)
  const expandedHeight = SCREEN.HEIGHT * 0.4; // 펼친 상태 높이 (화면 높이의 40%)
  const maxHeight = useSharedValue(collapsedHeight); // 초기 높이를 접힌 상태로 설정

  useEffect(() => {
    // 애니메이션: 접기/펼치기 상태에 따라 maxHeight 설정
    maxHeight.value = withTiming(isExpanded ? expandedHeight : collapsedHeight, { duration: 300 });
  }, [isExpanded]);

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: maxHeight.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* 헤더 */}
      <TouchableOpacity
        onPress={() => setIsExpanded((prev) => !prev)}
        style={styles.header}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.score}>점수: {score}</Text>
        </View>
        <View style={styles.iconContainer}>
          {isExpanded ? (
            <CircleChevronUp color="#FFFFFF" size={20} />
          ) : (
            <CircleChevronDown color="#FFFFFF" size={20} />
          )}
        </View>
      </TouchableOpacity>

      {/* 펼쳐진 내용 */}
      {isExpanded && (
        <View style={styles.content}>
          {/* 주요 스탯 */}
          {Object.entries(stats).map(([stat, value]) => (
            <View key={stat} style={styles.statContainer}>
              <Text style={styles.statName}>{stat}</Text>
              <View style={styles.statBar}>
                <View style={[styles.statFill, { width: `${value}%` }]} />
              </View>
            </View>
          ))}

          {/* 스킬 레벨 */}
          <View style={styles.skillsContainer}>
            <Text style={styles.skillsHeader}>스킬 레벨</Text>
            {Object.entries(skills).map(([skill, level]) => (
              <View key={skill} style={styles.skillItem}>
                <Text style={styles.skillName}>{skill}</Text>
                <Text style={styles.skillLevel}>Lv {level}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

export default StatsPanel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(31, 41, 55, 0.6)',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    width: SCREEN.WIDTH * 0.35, // 화면 너비의 90%
    alignSelf: 'center', // 중앙 정렬
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(46, 58, 89, 0.5)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 10,
  },
  score: {
    color: '#00FFC6',
    fontWeight: '800',
    fontSize: 14,
  },
  content: {
    padding: 10,
  },
  statContainer: {
    marginBottom: 10,
  },
  statName: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 5,
  },
  statBar: {
    backgroundColor: 'rgba(46, 58, 89, 0.3)',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  statFill: {
    height: '100%',
    backgroundColor: '#00FFC6',
  },
  skillsContainer: {
    marginTop: 10,
  },
  skillsHeader: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 10,
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  skillName: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  skillLevel: {
    color: '#00FFC6',
    fontSize: 12,
    fontWeight: '600',
  },
});
