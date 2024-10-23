import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

const SearchInput = () => {
    const [query, setQuery] = useState("");

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={query}
                placeholder="Search a video topic"
                placeholderTextColor="#CDCDE0"
                onChangeText={(e: any) => setQuery(e)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", // corresponds to `flex-row`
        alignItems: "center", // corresponds to `items-center`
        paddingHorizontal: 16, // corresponds to `px-4` (4 * 4 = 16px)
        height: 64, // corresponds to `h-16` (16 * 4 = 64px)
        backgroundColor: "#161616", // equivalent to `bg-black-100`
        borderRadius: 20, // corresponds to `rounded-2xl`
        borderWidth: 2, // corresponds to `border-2`
        borderColor: "#333333", // equivalent to `border-black-200`
    },
    textInput: {
        flex: 1, // corresponds to `flex-1`
        fontSize: 16, // corresponds to `text-base`
        marginTop: 2, // corresponds to `mt-0.5` (0.5 * 4 = 2px)
        color: "white", // corresponds to `text-white`
    },
});

export default SearchInput;
