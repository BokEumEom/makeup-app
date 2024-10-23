import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: object;
    containerStyles?: object;
}

const CustomButton = ({
    onPress,
    title,
    textStyles = {},
    containerStyles = {},
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.buttonContainer, containerStyles]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, textStyles]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "white",
        borderRadius: 12, // corresponds to `rounded-xl`
        minHeight: 62, // corresponds to `min-h-[62px]`
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#007AFF", // substitute `text-primary` with your primary color
        fontWeight: "600", // corresponds to `font-semibold`
        fontSize: 18, // corresponds to `text-lg`
    },
});

export default CustomButton;
