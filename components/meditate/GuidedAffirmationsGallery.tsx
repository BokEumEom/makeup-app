import { Image, View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { GalleryPreviewData } from "@/types/AffirmationCategory";
import { Link } from "expo-router";

interface GuidedAffirmationsGalleryProps {
    title: string;
    products: GalleryPreviewData[];
}

const GuidedAffirmationsGallery = ({ title, products }: GuidedAffirmationsGalleryProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={products}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Link href={`/affirmations/${item.id}`} asChild>
                            <Pressable>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={item.image}
                                        resizeMode="cover"
                                        style={styles.image}
                                    />
                                    <Text>ProductGallery</Text>
                                </View>
                            </Pressable>
                        </Link>
                    )}
                    horizontal
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20, // equivalent to `my-5` (5 * 4 = 20px)
    },
    titleContainer: {
        marginBottom: 8, // equivalent to `mb-2` (2 * 4 = 8px)
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20, // equivalent to `text-xl`
    },
    flatListContainer: {
        marginVertical: 8, // equivalent to `space-y-2` creating vertical spacing
    },
    imageContainer: {
        height: 144, // equivalent to `h-36` (36 * 4 = 144px)
        width: 128, // equivalent to `w-32` (32 * 4 = 128px)
        borderRadius: 8, // equivalent to `rounded-md`
        marginRight: 16, // equivalent to `mr-4` (4 * 4 = 16px)
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

export default GuidedAffirmationsGallery;
