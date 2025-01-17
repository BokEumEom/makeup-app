import { View, Text, ImageBackground, StyleSheet, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppGradient from "@/components/meditate/AppGradient";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

import mediTating from "@/assets/meditation-images/meditating.webp";

const MeditateScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ImageBackground
                source={mediTating}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                <AppGradient
                    // Background Linear Gradient
                    colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
                >
                    <SafeAreaView style={styles.safeArea}>
                        <Animated.View
                            entering={FadeInDown.delay(300).stiffness(80)}
                        >
                            <Text style={styles.title}>Simple Meditation</Text>
                            <Text style={styles.subtitle}>
                                Simplifying Meditation for Everyone
                            </Text>
                        </Animated.View>

                        <Animated.View
                            entering={FadeInDown.delay(500).stiffness(80)}
                        >
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={() => router.push("/meditate/nature-meditate")}
                                accessibilityLabel="Get Started"
                            >
                                <Text style={styles.buttonText}>Get Started</Text>
                            </Pressable>
                        </Animated.View>

                        <StatusBar style="light" />
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: "space-between",
    },
    title: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 36,
    },
    subtitle: {
        textAlign: "center",
        color: "white",
        fontSize: 24,
        marginTop: 12,
        fontFamily: "regular",
    },
    button: {
        backgroundColor: "#C8E6C9",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
    },
    buttonPressed: {
        backgroundColor: "#45A049", // 버튼이 눌렸을 때의 색상
    },
    buttonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default MeditateScreen;
