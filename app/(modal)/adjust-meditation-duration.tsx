import AppGradient from "@/components/meditate/AppGradient";
import CustomButton from "@/components/common/CustomButton";
import { TimerContext } from "@/context/TimerContext";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

const AdjustMeditationDuration = () => {
    const { setDuration } = useContext(TimerContext);

    const handlePress = (duration: number) => {
        setDuration(duration);
        router.back();
    };

    return (
        <View style={styles.container}>
            <AppGradient
                // Background Linear Gradient
                colors={["#161b2e", "#0a4d4a", "#766e67"]}
            >
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <AntDesign name="leftcircleo" size={50} color="white" />
                </Pressable>
                <View style={styles.centerContent}>
                    <View>
                        <Text style={styles.headerText}>
                            Adjust your meditation duration
                        </Text>
                    </View>

                    <View>
                        <CustomButton
                            title="10 seconds"
                            onPress={() => handlePress(10)}
                            containerStyles={styles.buttonSpacing}
                        />
                        <CustomButton
                            title="5 minutes"
                            onPress={() => handlePress(5 * 60)}
                            containerStyles={styles.buttonSpacing}
                        />
                        <CustomButton
                            title="10 minutes"
                            onPress={() => handlePress(10 * 60)}
                            containerStyles={styles.buttonSpacing}
                        />
                        <CustomButton
                            title="15 minutes"
                            onPress={() => handlePress(15 * 60)}
                            containerStyles={styles.buttonSpacing}
                        />
                    </View>
                </View>
            </AppGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    backButton: {
        position: "absolute",
        top: 32, // corresponds to top-8 (8 * 4 = 32px)
        left: 24, // corresponds to left-6 (6 * 4 = 24px)
        zIndex: 10,
    },
    centerContent: {
        justifyContent: "center",
        height: "80%", // corresponds to h-4/5
    },
    headerText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 28, // corresponds to text-3xl
        color: "white",
        marginBottom: 32, // corresponds to mb-8 (8 * 4 = 32px)
    },
    buttonSpacing: {
        marginBottom: 20, // corresponds to mb-5 (5 * 4 = 20px)
    },
});

export default AdjustMeditationDuration;
