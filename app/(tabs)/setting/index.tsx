// app/(tabs)/setting/index.tsx
import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/components/common/Header'; // Ensure this path is correct
import { useRouter } from 'expo-router';
import CustomText from '@/components/common/CustomText';
import useMusicPlayer from '@/hooks/useMusicPlayer';
import songs from '@/constants/songs';

const SettingsScreen = () => {
  const router = useRouter();
  const [sleepSetting, setSleepSetting] = useState(false);
  const [personalAlert, setPersonalAlert] = useState(false);
  const { isPlaying, toggleMusic } = useMusicPlayer(songs, songs[0].name);

  return (
    <View style={styles.container}>
      <Header title="설정" titleColor="#333333" />

      {/* Settings items */}
      {/* 배경음악 설정 */}
      <View style={styles.item}>
        <CustomText style={styles.label}>배경음악</CustomText>
        <Switch
          value={isPlaying}
          onValueChange={async () => {
            try {
              await toggleMusic();
            } catch (error) {
              console.error('Failed to toggle music:', error);
            }
          }}
        />
      </View>

      <View style={styles.item}>
        <CustomText style={styles.label}>나만의 알림 설정</CustomText>
        <CustomText style={styles.timeText}>6:00 PM</CustomText>
        <Switch
          value={personalAlert}
          onValueChange={setPersonalAlert}
        />
      </View>

      {/* Navigation options */}
      <TouchableOpacity style={styles.item}>
        <CustomText style={styles.label}>다크모드/라이트모드</CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <CustomText style={styles.label}>언어 설정</CustomText>
      </TouchableOpacity>

      {/* Navigate to the Music Setting Screen */}
      <TouchableOpacity style={styles.item} onPress={() => router.push('/setting/music')}>
        <CustomText style={styles.label}>음악 변경</CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/setting/font')}>
        <CustomText style={styles.label}>폰트 변경</CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/setting/tabs')}>
        <CustomText style={styles.label}>Tab 구현</CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/setting/wallpaper')}>
        <CustomText style={styles.label}>배경화면 구현</CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/setting/animations')}>
        <CustomText style={styles.label}>VerticalList 구현</CustomText>
      </TouchableOpacity>

      {/* Footer with version */}
      <View style={styles.footer}>
        <CustomText style={styles.footerLabel}>나의 Soran 버전</CustomText>
        <CustomText style={styles.versionText}>0.0.1</CustomText>
      </View>

      <TouchableOpacity style={styles.item}>
        <CustomText style={styles.label}>앱 별점 남기기</CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <CustomText style={styles.label}>의견 및 피드백 남기기</CustomText>
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
