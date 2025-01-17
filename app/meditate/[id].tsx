// app/meditate/[id].tsx
import AppGradient from "@/components/meditate/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, Pressable, Text, View, StyleSheet, ActionSheetIOS, Platform, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

import MEDITATION_IMAGES from "@/constants/meditation-images";
import { TimerContext } from "@/contexts/TimerContext";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";

const INITIAL_TIMER_DURATION = 10; // 초기 시간(초)

const Page = () => {
    const { id } = useLocalSearchParams();
    const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

    const [isMeditating, setMeditating] = useState(false);
    const [audioSound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlayingAudio, setPlayingAudio] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        // 명상 중이고 시간이 0초면 명상 종료
        if (isMeditating && secondsRemaining === 0) {
            if (isPlayingAudio) audioSound?.pauseAsync();
            setMeditating(false);
            setPlayingAudio(false);
        }

        // 명상 중이고 시간이 남아있다면 1초마다 감소
        if (isMeditating && secondsRemaining > 0) {
            timerId = setTimeout(() => {
                setDuration((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [secondsRemaining, isMeditating, setDuration]);

    useEffect(() => {
        // 컴포넌트 언마운트 시 타이머 및 오디오 리소스 정리
        return () => {
            setDuration(INITIAL_TIMER_DURATION);
            audioSound?.unloadAsync();
        };
    }, [audioSound, setDuration]);

    const initializeSound = async () => {
        const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
        const { sound } = await Audio.Sound.createAsync(
            AUDIO_FILES[audioFileName]
        );
        setSound(sound);
        return sound;
    };

    const togglePlayPause = async () => {
        const sound = audioSound ? audioSound : await initializeSound();
        const status = await sound?.getStatusAsync();

        if (status?.isLoaded && !isPlayingAudio) {
            await sound.playAsync();
            setPlayingAudio(true);
        } else {
            await sound.pauseAsync();
            setPlayingAudio(false);
        }
    };

    async function toggleMeditationSessionStatus() {
        // 시간이 0초라면 다시 초기화
        if (secondsRemaining === 0) {
            setDuration(INITIAL_TIMER_DURATION);
        }

        setMeditating((prev) => !prev);
        await togglePlayPause();
    }

    const showActionSheet = () => {
        const options = ["10 seconds", "5 minutes", "10 minutes", "15 minutes", "Cancel"];
        const durations = [10, 5 * 60, 10 * 60, 15 * 60];

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: options,
                cancelButtonIndex: options.length - 1,
                title: "Adjust your meditation duration"
            },
            (buttonIndex) => {
                if (buttonIndex !== options.length - 1) {
                    setDuration(durations[buttonIndex]);
                    // 명상 중이라면 시간 변경 후에도 명상은 계속 진행
                    // 필요 시, 여기에서 멈추거나 다시 시작 로직을 추가할 수 있음
                }
            }
        );
    };

    const handleAdjustDuration = () => {
        if (Platform.OS !== "ios") {
            // iOS가 아닌 경우 대체 UI 또는 경고 메시지 표시
            Alert.alert("Not supported", "This feature is only available on iOS.");
            return;
        }

        if (isMeditating) {
            toggleMeditationSessionStatus();
        }
        showActionSheet();
    };

    // 시간 형식 지정
    const formattedTimeMinutes = String(
        Math.floor(secondsRemaining / 60)
    ).padStart(2, "0");
    const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

    return (
        <View style={styles.container}>
            <ImageBackground
                source={MEDITATION_IMAGES[Number(id) - 1]}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>

                    <View style={styles.timerContainer}>
                        <View style={styles.timerWrapper}>
                            <Text style={styles.timerText}>
                                {formattedTimeMinutes}.{formattedTimeSeconds}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={handleAdjustDuration}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Adjust Duration</Text>
                        </Pressable>
                        <Pressable
                            onPress={toggleMeditationSessionStatus}
                            style={[styles.button, styles.meditationButton]}
                        >
                            <Text style={styles.buttonText}>
                                {isMeditating ? "Stop" : "Start Meditation"}
                            </Text>
                        </Pressable>
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
    },
    backButton: {
        position: "absolute",
        top: 64,
        left: 24,
        zIndex: 10,
    },
    timerContainer: {
        flex: 1,
        justifyContent: "center",
    },
    timerWrapper: {
        alignSelf: "center",
        backgroundColor: "#D3D3D3",
        borderRadius: 9999,
        width: 176,
        height: 176,
        justifyContent: "center",
        alignItems: "center",
    },
    timerText: {
        fontSize: 36,
        color: "#000080",
        fontFamily: "rmono",
    },
    buttonContainer: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#C8E6C9",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
        elevation: 5,
    },
    buttonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: "bold",
    },
    meditationButton: {
        marginTop: 16,
    },
});

export default Page;
