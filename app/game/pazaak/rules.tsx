// app/game/pazaak/rules.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '@/components/common/Header';
import { useRouter } from 'expo-router';

const HowToScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header 컴포넌트를 추가하여 화면 상단에 타이틀 표시 */}
      <Header title="게임 방법" titleColor="#FFD700" />

      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>1. 파작 플레이 방법</Text>
          <Text style={styles.description}>
            파작 [PAZAAK]은 일대일 카드 게임입니다. 당신의 목표는 20점을 넘지 않으면서 가능한 한 20점에 가까운 점수를 얻는 것입니다.
            가장 높은 점수를 낸 플레이어가 "세트"에서 승리합니다. 세 "세트"를 먼저 이긴 사람이 게임에서 승리합니다.
          </Text>

          <Text style={styles.header}>2. 파작 테이블</Text>
          <Text style={styles.description}>
            파작 테이블은 노란색 선으로 구분된 두 부분으로 나뉩니다. 테이블의 아랫부분은 당신 쪽입니다. 위쪽 절반은 상대방의 것입니다.
          </Text>

          <Text style={styles.header}>3. 첫 번째 세트 플레이하기</Text>
          <Text style={styles.description}>
            이 세트는 딜러가 자동으로 당신의 "드로존"에 카드를 나누는 것으로 시작됩니다. 드로존은 카드를 플레이하는 테이블의 구역입니다.
            "드로존"에 있는 모든 카드의 합이 당신의 점수입니다. 각 세트에서 두 플레이어는 딜러의 "메인덱"에서 카드를 차례로 받습니다.
          </Text>

          <Text style={styles.header}>4. 차례를 지키다</Text>
          <Text style={styles.description}>
            당신의 차례가 되면 세 가지 옵션이 있습니다:
            {"\n"}1. 사이드 덱 카드를 플레이하세요.
            {"\n"}2. 턴을 끝내세요.
            {"\n"}3. 현재 점수를 유지하세요.
            {"\n"}좋은 파작 전략은 각각의 옵션을 언제 사용할지 아는 것입니다.
          </Text>

          <Text style={styles.header}>5. 사이드 덱 카드 사용</Text>
          <Text style={styles.description}>
            사이드덱은 -6에서 +6까지의 4장의 무작위 카드로 구성됩니다. 각 턴마다 최대 1장의 사이드덱 카드를 플레이할 수 있습니다.
            사이드덱 카드는 점수를 더하거나 빼는 수적 장치입니다.
          </Text>

          <Text style={styles.header}>6. 턴 종료</Text>
          <Text style={styles.description}>
            턴을 끝내도 세트가 끝나는 것은 아니며, 대신 상대방에게 턴이 넘어갑니다. 점수가 충분히 높지 않아 버틸 수 없거나, 사이드 덱 카드를 내도 이득이 없을 때 턴을 끝내는 것은 좋은 전략입니다.
          </Text>

          <Text style={styles.header}>7. 서있기</Text>
          <Text style={styles.description}>
            상대방을 이길 만큼 점수가 높다고 생각되면 스탠딩은 좋은 전략입니다. 스탠딩을 하면 나머지 세트 동안 턴이 종료되고, 상대방이 스탠드를 할 때까지 현재 점수가 유지됩니다.
          </Text>
        </View>

        {/* 뒤로가기 버튼 */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>BACK TO MAIN MENU</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HowToScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b3b5a',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'DepartureMono',
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: 'DepartureMono',
  },
  menu: {
    width: '100%',
    padding: 20,
  },
  button: {
    backgroundColor: '#1b3b5a',
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    // paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFD700',
    fontFamily: 'DepartureMono',
  },
});
