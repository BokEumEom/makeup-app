import AppGradient from "@/components/meditate/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, Pressable, Text, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import CustomButton from "@/components/common/CustomButton";

import MEDITATION_IMAGES from "@/constants/meditation-images";
import { TimerContext } from "@/contexts/TimerContext";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";

const Page = () => {
    const { id } = useLocalSearchParams();

    const { duration: secondsRemaining, setDuration } =
        useContext(TimerContext);

    const [isMeditating, setMeditating] = useState(false);
    const [audioSound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlayingAudio, setPlayingAudio] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        // Exit early when we reach 0
        if (secondsRemaining === 0) {
            if (isPlayingAudio) audioSound?.pauseAsync();
            setMeditating(false);
            setPlayingAudio(false);
            return;
        }

        if (isMeditating) {
            // Save the interval ID to clear it when the component unmounts
            timerId = setTimeout(() => {
                setDuration(secondsRemaining - 1);
            }, 1000);
        }

        // Clear timeout if the component is unmounted or the time left changes
        return () => {
            clearTimeout(timerId);
        };
    }, [secondsRemaining, isMeditating]);

    useEffect(() => {
        return () => {
            setDuration(10);
            audioSound?.unloadAsync();
        };
    }, [audioSound]);

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
            await sound?.playAsync();
            setPlayingAudio(true);
        } else {
            await sound?.pauseAsync();
            setPlayingAudio(false);
        }
    };

    async function toggleMeditationSessionStatus() {
        if (secondsRemaining === 0) setDuration(10);

        setMeditating(!isMeditating);

        await togglePlayPause();
    }

    const handleAdjustDuration = () => {
        if (isMeditating) toggleMeditationSessionStatus();

        router.push("/(modal)/adjust-meditation-duration");
    };

    // Format the timeLeft to ensure two digits are displayed
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
                        <CustomButton
                            title="Adjust duration"
                            onPress={handleAdjustDuration}
                        />
                        <CustomButton
                            title={isMeditating ? "Stop" : "Start Meditation"}
                            onPress={toggleMeditationSessionStatus}
                            containerStyles={styles.meditationButton}
                        />
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
        top: 64, // top-16 in rem units
        left: 24, // left-6 in rem units
        zIndex: 10,
    },
    timerContainer: {
        flex: 1,
        justifyContent: "center",
    },
    timerWrapper: {
        alignSelf: "center",
        backgroundColor: "#D3D3D3", // neutral-200 equivalent
        borderRadius: 9999, // for full circle
        width: 176, // w-44 equivalent (44 * 4 px)
        height: 176, // h-44 equivalent (44 * 4 px)
        justifyContent: "center",
        alignItems: "center",
    },
    timerText: {
        fontSize: 36, // text-4xl
        color: "#000080", // blue-800 equivalent
        fontFamily: "rmono", // custom font
    },
    buttonContainer: {
        marginBottom: 20, // mb-5
    },
    meditationButton: {
        marginTop: 16, // mt-4
    },
});

export default Page;
