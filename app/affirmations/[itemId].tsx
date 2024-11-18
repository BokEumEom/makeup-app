import { AntDesign } from "@expo/vector-icons";
import { GalleryPreviewData } from "@/types/AffirmationCategory";
import { router, useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
} from "react-native";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallary";
import AppGradient from "@/components/meditate/AppGradient";
import React, { useEffect, useState } from "react";

const AffirmationPractice = () => {
    const { itemId } = useLocalSearchParams();

    const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
    const [sentences, setSentences] = useState<string[]>([]);

    useEffect(() => {
        for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
            const affirmationData = AFFIRMATION_GALLERY[idx].data;

            const affirmationToStart = affirmationData.find(
                (a) => a.id === Number(itemId)
            );

            if (affirmationToStart) {
                setAffirmation(affirmationToStart);

                const affirmationsArray = affirmationToStart.text.split(".");

                // Remove the last element if it's an empty string
                if (affirmationsArray[affirmationsArray.length - 1] === "") {
                    affirmationsArray.pop();
                }

                setSentences(affirmationsArray);
                return;
            }
        }
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={affirmation?.image}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>

                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.sentencesContainer}>
                            <View style={styles.textWrapper}>
                                {sentences.map((sentence, idx) => (
                                    <Text
                                        style={styles.sentenceText}
                                        key={idx}
                                    >
                                        {sentence}.
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
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
        top: 64, // corresponds to top-16 (16 * 4 = 64px)
        left: 24, // corresponds to left-6 (6 * 4 = 24px)
        zIndex: 10,
    },
    scrollViewContent: {
        marginTop: 80, // corresponds to mt-20 (20 * 4 = 80px)
    },
    sentencesContainer: {
        height: "100%",
        justifyContent: "center",
        borderColor: "white",
    },
    textWrapper: {
        height: "80%", // corresponds to h-4/5
        justifyContent: "center",
    },
    sentenceText: {
        color: "white",
        fontSize: 28, // corresponds to text-3xl
        marginBottom: 48, // corresponds to mb-12 (12 * 4 = 48px)
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default AffirmationPractice;
