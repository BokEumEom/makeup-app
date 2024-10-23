import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/common/CustomButton";
import AppGradient from "@/components/meditate/AppGradient";
import { useRouter } from "expo-router";
import Animated, {
    FadeInDown,
    withSpring,
} from "react-native-reanimated";

import beachImage from "@/assets/meditation-images/beach.webp";

const MeditateScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ImageBackground
                source={beachImage}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                <AppGradient
                    // Background Linear Gradient
                    colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
                >
                    <SafeAreaView style={styles.safeArea}>
                        <Animated.View
                            entering={FadeInDown.delay(300)
                                .mass(0.5)
                                .stiffness(80)
                                .springify(20)}
                        >
                            <Text style={styles.title}>
                                Simple Meditation
                            </Text>
                            <Text style={styles.subtitle}>
                                Simplifying Meditation for Everyone
                            </Text>
                        </Animated.View>

                        <Animated.View
                            entering={FadeInDown.delay(300)
                                .mass(0.5)
                                .stiffness(80)
                                .springify(20)}
                        >
                            <CustomButton
                                onPress={() => router.push("./nature-meditate")}
                                title="Get Started"
                            />
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
        paddingHorizontal: 4, // corresponds to `px-1` (1 * 4 = 4px padding)
        justifyContent: "space-between",
    },
    title: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 36, // corresponds to `text-4xl`
    },
    subtitle: {
        textAlign: "center",
        color: "white",
        fontSize: 24, // corresponds to `text-2xl`
        marginTop: 12, // corresponds to `mt-3`
        fontFamily: "regular", // Ensure the font is loaded correctly elsewhere
    },
});

export default MeditateScreen;
