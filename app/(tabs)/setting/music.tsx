// app/(tabs)/setting/music.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Header } from '@/components/common/Header';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/common/CustomText';

const songs = [
  '실로폰 희망곡',
  '행복의 날들',
  '함께 걷는 길',
  '나란히 걸어가',
  '순수한 사랑',
  '바람의 노래',
  '기적의 밤',
  '우리들의 풍경',
];

const MusicChangeScreen = () => {
  const [selectedSong, setSelectedSong] = useState('실로폰 희망곡');

  const handleSelectSong = (song: string) => {
    setSelectedSong(song);
  };

  return (
    <View style={styles.container}>
      <Header title="음악 변경" showBackButton={true} titleColor="#333333" />

      <View style={styles.tipBox}>
        <CustomText style={styles.tipTitle}>Tip</CustomText>
        <CustomText style={styles.tipText}>홈 화면에서 소리 아이콘을 꾹 눌르면 음악을 변경할 수 있어요.</CustomText>
      </View>

      <FlatList
        data={songs}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.songItem} onPress={() => handleSelectSong(item)}>
            <CustomText style={styles.songText}>{item}</CustomText>
            {selectedSong === item && (
              <Ionicons name="checkmark" size={20} color="#333333" />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  tipBox: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    marginVertical: 20,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888888',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#888888',
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  songText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default MusicChangeScreen;
