import { View, Text, Pressable, PressableProps } from 'react-native';
import Animated, { AnimatedProps, FadeInDown, FadeInLeft, FadeOut, FadeOutLeft, interpolateColor, LinearTransition, SharedValue, useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Constants
const _spacing = 8;
const _buttonHeight = 42;
const _layoutTransition = LinearTransition.springify().damping(80).stiffness(200);
const _dotContainer = 24;
const _dotSize = _dotContainer / 3;

const _activeDot = "#000";
const _inactiveDot = "#aaa";

function Button({ children, style, ...rest }: AnimatedProps<PressableProps>) {
  return (
    <AnimatedPressable
      style={[
        {
          height: _buttonHeight,
          borderRadius: _buttonHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: _spacing * 2,
        },
        style, // Ensure custom style prop is applied last
      ]}
      entering={FadeInLeft.springify().damping(80).stiffness(200)}
      exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
      layout={_layoutTransition}
      {...rest}>
      {children}
    </AnimatedPressable>
  );
}

function Dot({
index,
animation,
}: {
index: number,
animation: SharedValue<number>
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [index - 1, index, index + 1],
        [_inactiveDot, _activeDot, _activeDot]
      )
    }
  })

  return (
    <View 
      style={{ 
        width: _dotContainer, 
        height: _dotContainer,
        justifyContent: "center",
        alignItems: "center", 
      }}>
      <Animated.View
        style={[
          stylez,
          {
          width: _dotSize,
          height: _dotSize,
          borderRadius: _dotSize,
        }]}
      />
    </View>
  );
}

function PaginationIndicator({
  animation,
}: {
  animation: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      width: _dotContainer + _dotContainer * animation.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: "",
          height: _dotContainer,
          width: _dotContainer,
          borderRadius: _dotContainer,
          position: "absolute",
          left: 0,
          top: 0,
        },
        stylez
      ]}
    />
  );
}

export function Pagination({
  selectedIndex,
  total,
}: {
  selectedIndex: number;
  total: number;
}) {
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 80,
      stiffness: 200,
    });
  });

  return (
    <View style={{ justifyContent: "center", alignItems: "center"}}>
      <View style={{ flexDirection: "row" }}>
        <PaginationIndicator animation={animation} />
        {[...Array(total).keys()].map((i) => (
          <Dot key={`dot-${i}`} index={i} animation={animation} />
        ))}
      </View>
    </View>
  );
}

export function Indicator({
  total,
  selectedIndex,
  onIndexChange,
  onFinish, // Add onFinish as a prop
}: {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  onFinish: () => void; // Define the type for onFinish
}) {
  return (
    <View style={{ padding: _spacing, gap: _spacing * 2 }}>
      <Pagination total={total} selectedIndex={selectedIndex} />
      <View style={{ flexDirection: 'row', gap: _spacing }}>
        {selectedIndex > 0 && (
          <Button
            style={{
              backgroundColor: "#ddd",
            }}
            onPress={() => onIndexChange(selectedIndex - 1)}
          >
            <Text>Back</Text>
          </Button>
        )}
        <Button
          style={{
            backgroundColor: "#FACC15",
            flex: 1,
          }}
          onPress={() => {
            if (selectedIndex === total - 1) {
              // Call the onFinish callback if it's the last step
              onFinish();
            } else {
              onIndexChange(selectedIndex + 1);
            }
          }}
        >
          <Animated.Text
            key={selectedIndex === total - 1 ? 'finish' : 'continue'}
            style={{ color: "#fff" }}
            entering={FadeInDown.springify().damping(80).stiffness(200)}
            exiting={FadeOut.springify().damping(80).stiffness(200)}
          >
            {selectedIndex === total - 1 ? 'Finish' : 'Continue'}
          </Animated.Text>
        </Button>
      </View>
    </View>
  );
}
