// app/(modal)/adjust-meditation-duration.tsx
import AppGradient from "@/components/meditate/AppGradient";
import { TimerContext } from "@/contexts/TimerContext";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Pressable, Text, View, StyleSheet, ActionSheetIOS, Platform } from "react-native";

const AdjustMeditationDuration = () => {
    const { setDuration } = useContext(TimerContext);

    const options = ["10 seconds", "5 minutes", "10 minutes", "15 minutes", "Cancel"];
    const durations = [10, 5 * 60, 10 * 60, 15 * 60]; // options와 인덱스 매칭

    const showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: options,
                cancelButtonIndex: options.length - 1,
                title: "Adjust your meditation duration"
            },
            buttonIndex => {
                if (buttonIndex !== options.length - 1) {
                    // Cancel 이외의 옵션 선택 시
                    setDuration(durations[buttonIndex]);
                    router.back();
                }
            }
        );
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 액션 시트 표시 (iOS 전용)
        // iOS에서만 액션 시트를 표시하고, 다른 플랫폼에서는 다른 UI 방식을 고려해야 합니다.
        if (Platform.OS === "ios") {
            showActionSheet();
        }
    }, []);

    // iOS가 아닌 경우를 위한 대체 UI (예: Android용)
    // 실제 서비스에서는 Platform check 후 다른 UI로 변경하는 로직 추가 필요
    if (Platform.OS !== "ios") {
        return (
            <View style={styles.container}>
                <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>
                    <View style={styles.centerContent}>
                        <Text style={styles.headerText}>
                            Adjust your meditation duration
                        </Text>
                        {/* 안드로이드나 웹일 경우 Pressable을 이용한 선택 UI 표시 */}
                        <Pressable
                            onPress={() => { setDuration(10); router.back(); }}
                            style={[styles.button, styles.buttonSpacing]}
                        >
                            <Text style={styles.buttonText}>10 seconds</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => { setDuration(5 * 60); router.back(); }}
                            style={[styles.button, styles.buttonSpacing]}
                        >
                            <Text style={styles.buttonText}>5 minutes</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => { setDuration(10 * 60); router.back(); }}
                            style={[styles.button, styles.buttonSpacing]}
                        >
                            <Text style={styles.buttonText}>10 minutes</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => { setDuration(15 * 60); router.back(); }}
                            style={[styles.button, styles.buttonSpacing]}
                        >
                            <Text style={styles.buttonText}>15 minutes</Text>
                        </Pressable>
                    </View>
                </AppGradient>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <AntDesign name="leftcircleo" size={50} color="white" />
                </Pressable>
                {/* iOS에서는 액션시트가 이미 표시되므로 별도 UI 필요 없음 */}
                <View style={styles.centerContent}>
                    <Text style={styles.headerText}>
                        Adjusting duration...
                    </Text>
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
        top: 32, // top-8
        left: 24, // left-6
        zIndex: 10,
    },
    centerContent: {
        justifyContent: "center",
        height: "80%", // h-4/5
    },
    headerText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 28, // text-3xl
        color: "white",
        marginBottom: 32, // mb-8
    },
    buttonSpacing: {
        marginBottom: 20, // mb-5
    },
    button: {
        backgroundColor: "#C8E6C9",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    buttonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default AdjustMeditationDuration;
