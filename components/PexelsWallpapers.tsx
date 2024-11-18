import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Dimensions, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, SharedValue } from 'react-native-reanimated';

// PEXELS API
const uri = `https://api.pexels.com/v1/search?query=mobile+wallpaper&orientation=portrait&size=small&per_page=10`;

type SearchPayload = {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
};

type Photo = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

const API_KEY = 'MgcD8xsJhMTlsekOIcOYRBrjARQ2Ymm8vsmSE3YbUr4JiLwsctdyXYs8';

// Get the screen width
const { width } = Dimensions.get("screen");
const _imageWidth = width * 0.7;
const _imageHeight = _imageWidth * 1.76; // Assuming a portrait aspect ratio
const _spacing = 12;

// Photo component to render each image
function Photo({
  item, index, scrollX
}: {
  item: Photo;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [index - 1, index, index + 1],
      [1.6, 1, 1.6]
    );
  
    const rotate = `${interpolate(
      scrollX.value,
      [index - 1, index, index + 1],
      [10, 0, -10]
    )}deg`;
  
    return {
      transform: [{ scale }, { rotate }],
    };
  });  

  return (
    <Animated.View style={{
      width: _imageWidth,
      height: _imageHeight,
      borderRadius: 16,
      overflow: "hidden",
    }}>
      <Animated.Image
        source={{ uri: item.src.large }}
        style={[{ flex: 1 }, stylez]}
      />
    </Animated.View>
  );
}

function BackdropPhoto({
  photo,
  index,
  scrollX
}: {
  photo: Photo;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
    };
  });  

  return (
    <Animated.Image
      source={{ uri: photo.src.large }}
      style={[StyleSheet.absoluteFillObject, stylez]}
      blurRadius={50}
    />
  );
}

const PexelsWallpapers = () => {
  const { data, isLoading, error } = useQuery<SearchPayload>({
    queryKey: ["wallpapers"],
    queryFn: async () => {
      const res = await fetch(uri, {
        headers: {
          Authorization: API_KEY,
        },
      });
      
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await res.json();
      return json;
    },
  });

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading wallpapers</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={StyleSheet.absoluteFillObject}>
        {data?.photos?.map((photo, index) => (
          <BackdropPhoto key={photo.id} photo={photo} index={index} scrollX={scrollX} />
        ))}
      </View>

      {data && data.photos ? (
        <Animated.FlatList
          data={data.photos}
          keyExtractor={(item) => String(item.id)}
          horizontal
          style={{ flexGrow: 0 }}
          snapToInterval={_imageWidth + _spacing}
          decelerationRate="fast"
          contentContainerStyle={{
            gap: _spacing,
            paddingHorizontal: (width - _imageWidth) / 2,
          }}
          renderItem={({ item, index }) => {
            return <Photo item={item} index={index} scrollX={scrollX} />;
          }}
          onScroll={onScroll}
          scrollEventThrottle={1000 / 60}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text>No wallpapers found</Text>
      )}
    </View>
  );
};

export default PexelsWallpapers;

const styles = StyleSheet.create({});
