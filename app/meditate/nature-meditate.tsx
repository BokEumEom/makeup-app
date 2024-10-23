import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import React from "react";
import {
    FlatList,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import MEDITATION_IMAGES from "@/constants/meditation-images";

import { MEDITATION_DATA } from "@/constants/MeditationData";
import AppGradient from "@/components/meditate/AppGradient";

const Page = () => {
    return (
        <View style={styles.container}>
            <AppGradient
                // Background Linear Gradient
                colors={["#161b2e", "#0a4d4a", "#766e67"]}
            >
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>Welcome Steven</Text>
                    <Text style={styles.subtitle}>
                        Start your meditation practice today
                    </Text>
                </View>
                <View>
                    <FlatList
                        data={MEDITATION_DATA}
                        contentContainerStyle={styles.list}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    router.push(`/meditate/${item.id}`)
                                }
                                style={styles.meditationItem}
                            >
                                <ImageBackground
                                    source={MEDITATION_IMAGES[item.id - 1]}
                                    resizeMode="cover"
                                    style={styles.backgroundImage}
                                >
                                    <LinearGradient
                                        // Gradient from transparent to black
                                        colors={[
                                            "transparent",
                                            "rgba(0,0,0,0.8)",
                                        ]}
                                        style={styles.gradient}
                                    >
                                        <Text style={styles.meditationTitle}>
                                            {item.title}
                                        </Text>
                                    </LinearGradient>
                                </ImageBackground>
                            </Pressable>
                        )}
                    />
                </View>
            </AppGradient>
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcomeContainer: {
        marginBottom: 24, // corresponds to `mb-6`
    },
    welcomeText: {
        color: "#E5E7EB", // corresponds to `text-gray-200`
        marginBottom: 12, // corresponds to `mb-3`
        fontWeight: "bold",
        fontSize: 36, // corresponds to `text-4xl`
        textAlign: "left",
    },
    subtitle: {
        color: "#E0E7FF", // corresponds to `text-indigo-100`
        fontSize: 20, // corresponds to `text-xl`
        fontWeight: "500", // corresponds to `font-medium`
    },
    meditationItem: {
        height: 192, // corresponds to `h-48`
        marginVertical: 12, // corresponds to `my-3`
        borderRadius: 8, // corresponds to `rounded-md`
        overflow: "hidden",
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        borderRadius: 10,
    },
    gradient: {
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        width: "100%",
    },
    meditationTitle: {
        color: "#F3F4F6", // corresponds to `text-gray-100`
        fontSize: 28, // corresponds to `text-3xl`
        fontWeight: "bold",
        textAlign: "center",
    },
    list: {
        paddingBottom: 150, // padding to adjust for any spacing needed
    },
});

export default Page;
