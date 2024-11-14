// app/(tabs)/setting/music.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Header } from '@/components/common/Header';
import { Ionicons } from '@expo/vector-icons';

const songs = [
  '밝은 밤 도시',
  '찬란한 해변',
  '초여름 잔디',
  '유영하는 우주',
  '다시 어린 시절',
  '기다리는 기적',
  '숲의 요정',
];

const MusicChangeScreen = () => {
  const [selectedSong, setSelectedSong] = useState('밝은 밤 도시');

  const handleSelectSong = (song: string) => {
    setSelectedSong(song);
  };

  return (
    <View style={styles.container}>
      <Header title="음악 변경" showBackButton={true} titleColor="#333333" />

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>Tip</Text>
        <Text style={styles.tipText}>홈 화면에서 소리 아이콘을 꾹 눌르면 음악을 변경할 수 있어요.</Text>
      </View>

      <FlatList
        data={songs}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.songItem} onPress={() => handleSelectSong(item)}>
            <Text style={styles.songText}>{item}</Text>
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
