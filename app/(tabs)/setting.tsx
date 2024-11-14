import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/components/common/Header'; // Adjust the import path as needed

const SettingsScreen = () => {
  const [sleepSetting, setSleepSetting] = useState(false);
  const [personalAlert, setPersonalAlert] = useState(false);

  return (
    <View style={styles.container}>
      <Header 
        title="설정" 
        showBackButton={true} 
        titleColor="#333333" 
      />

      <View style={styles.item}>
        <Text style={styles.label}>잠금 설정</Text>
        <Switch
          value={sleepSetting}
          onValueChange={setSleepSetting}
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>나만의 알림 설정</Text>
        <Text style={styles.timeText}>6:00 PM</Text>
        <Switch
          value={personalAlert}
          onValueChange={setPersonalAlert}
        />
      </View>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.label}>다크모드/라이트모드</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.label}>언어 설정</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.label}>카드 위치 변경</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.label}>음악 변경</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.label}>폰트 변경</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.label}>모든 기록 삭제하기</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>나의 Soran 버전</Text>
        <Text style={styles.versionText}>1.2.15</Text>
      </View>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.label}>앱 별점 남기기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.label}>의견 및 피드백 남기기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    color: '#333333',
  },
  timeText: {
    fontSize: 16,
    color: '#555555',
    marginRight: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginTop: 30,
  },
  footerLabel: {
    fontSize: 16,
    color: '#888888',
  },
  versionText: {
    fontSize: 16,
    color: '#888888',
  },
});

export default SettingsScreen;
