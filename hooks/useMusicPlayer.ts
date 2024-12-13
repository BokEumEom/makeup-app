import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Song = {
  name: string;
  file: any;
};

const getStoredItem = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Failed to get ${key}:`, error);
    return null;
  }
};

const setStoredItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Failed to set ${key}:`, error);
  }
};

const useMusicPlayer = (initialSongs: Song[], initialSongName: string) => {
  const [selectedSong, setSelectedSong] = useState(initialSongName);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        const savedSong = await getStoredItem('selectedSong');
        const savedIsPlaying = await getStoredItem('isPlaying');

        const songName = savedSong || initialSongName;
        const shouldPlay = savedIsPlaying === 'true';

        const song = initialSongs.find((s) => s.name === songName) || initialSongs[0];
        setSelectedSong(song.name);

        if (shouldPlay) {
          await playMusic(song, false);
        }
      } catch (error) {
        console.error('Failed to initialize music player:', error);
      }
    };

    initializePlayer();

    return () => {
      stopMusic(); // 컴포넌트 언마운트 시 음악 중지
    };
  }, []);

  const saveState = async () => {
    try {
      await setStoredItem('selectedSong', selectedSong);
      await setStoredItem('isPlaying', isPlaying.toString());
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  };

  const playMusic = async (song: Song, save = true) => {
    try {
      // 기존 사운드 정리
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
      }

      // 새로운 사운드 로드
      const { sound: newSound } = await Audio.Sound.createAsync(song.file);
      setSound(newSound);
      setIsPlaying(true);

      // 사운드 재생
      await newSound.playAsync();

      if (save) await saveState();
    } catch (error) {
      console.error('Failed to play music:', error);
    }
  };

  const stopMusic = async () => {
    try {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.stopAsync(); // 음악 중지
          await sound.unloadAsync(); // 리소스 해제
        }
      }
      setSound(null); // 사운드 객체 정리
      setIsPlaying(false);
      await saveState();
    } catch (error) {
      console.error('Failed to stop music:', error);
    }
  };

  const toggleMusic = async () => {
    const song = initialSongs.find((s) => s.name === selectedSong) || initialSongs[0];
    if (isPlaying) {
      await stopMusic();
    } else {
      await playMusic(song);
    }
  };

  const selectSong = async (songName: string) => {
    try {
      const song = initialSongs.find((s) => s.name === songName);
      if (song) {
        setSelectedSong(songName);
        await playMusic(song);
      }
    } catch (error) {
      console.error('Failed to select song:', error);
    }
  };

  return {
    selectedSong,
    isPlaying,
    playMusic,
    stopMusic,
    toggleMusic,
    selectSong,
  };
};

export default useMusicPlayer;
