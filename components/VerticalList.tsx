import { View, Text, FlatList, Dimensions, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Item } from '@/constants/mockData'
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

type VerticalListProps = {
  data: Item[];
}

type AnimatedCardProps ={
  item: Item;
  index: number;
  scrollY: SharedValue<number>;
}

const {height}  = Dimensions.get("screen");
const _spacing = 4;
const _itemSize = height * 0.72;
const _itemFullsize = _itemSize + _spacing * 2;

function AnimatedCard({ item, index, scrollY }: AnimatedCardProps) {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.3, 1, 0.3]
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.92, 1, 0.92]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View 
      style={[
        {
          backgroundColor: "#fff",
          flex: 1,
          height: _itemSize,
          padding: _spacing * 2,
          borderRadius: 8,
          gap: _spacing,
        },
        stylez,
      ]}>
      <Image
        source={{
          uri: item.image,
        }}
        style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]}
        blurRadius={50}
      />
      <Image
        source={{uri: item.image}}
        style={{ flex:1, height: _itemSize * 0.4 }}
      />
      <View style={{ gap: _spacing }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#fff" }}>{item.title}</Text>
        <Text style={{ color: "#ddd" }} numberOfLines={3}>{item.description}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: _spacing, alignItems: "center" }}>
        <Image
          source={{
            uri: item.author.avatar,
          }}
          style={{
            width: 24,
            aspectRatio: 1,
            borderRadius: 12,
          }}
        />
        <Text style={{ color: "#ddd", fontSize: 12 }}>{item.author.name}</Text>
      </View>
    </Animated.View>
  )
}

const VerticalList = ({ data }: VerticalListProps) => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y / _itemFullsize;

  })
  return (
    <Animated.FlatList
      data={data}
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        paddingVertical: (height - _itemFullsize) / 2,
        gap: _spacing * 2
      }}
      renderItem={({ item, index }) => <AnimatedCard item={item} index={index} scrollY={scrollY} />}
      snapToInterval={_itemFullsize}
      decelerationRate={"fast"}
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  )
}

export default VerticalList