import { icons } from 'lucide-react-native';
import { MotiProps, MotiView } from 'moti';
import { motifySvg } from 'moti/svg'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeInRight, FadeOutRight, LayoutAnimationConfig, LinearTransition } from 'react-native-reanimated';

type IconNames = keyof typeof icons;

type TabItem = {
  icon: IconNames;
  label: string;
}

type TabProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
}

type IconProp = {
  name: IconNames;
} & MotiProps;

function Icon({ name, ...rest }: IconProp) {
  const IconComponent = motifySvg(icons[name])();
  return <IconComponent size={16} {...rest} />;
}

const _spacing = 4;

const Tabs = ({
  data,
  selectedIndex,
  onChange,
  activeColor = "#fff",
  inactiveColor = "#999",
  activeBackgroundColor = "#111",
  inactiveBackgroundColor = "#ddd"
}: TabProps) => {
  return (
    <View style={{ flexDirection: "row", gap: _spacing }}>
      {data.map((item, index) => {
        const isSelected = selectedIndex === index;
        return (
          <MotiView
            key={`tab-${index}`}
            animate={{
              backgroundColor: isSelected
                ? activeBackgroundColor
                : inactiveBackgroundColor,
              overflow: "hidden",
              borderRadius: 8,
            }}
            layout={LinearTransition.springify().damping(80).stiffness(200)}
          >
            <Pressable
              onPress={() => onChange(index)}
              style={{
                padding: _spacing * 3,
                justifyContent: "center",
                alignItems: "center",
                gap: _spacing,
                flexDirection: "row",
                backgroundColor: isSelected
                  ? activeBackgroundColor
                  : inactiveBackgroundColor,
                borderRadius: 8,
              }}
            >
              
              <Icon name={item.icon}
                animate={{
                  color: isSelected ? activeColor : inactiveColor,
                }}
                transition={{
                  
                }}
              />
              <LayoutAnimationConfig skipEntering>
                { isSelected && (
                  <Animated.Text
                    entering={FadeInRight.springify().damping(80).stiffness(200)}
                    exiting={FadeOutRight.springify().damping(80).stiffness(200)}
                    style={{
                      color: isSelected ? activeColor : inactiveColor,
                    }}
                  >
                    {item.label}
                  </Animated.Text>
                )}
              </LayoutAnimationConfig>
            </Pressable>
          </MotiView>
        );
      })}
    </View>
  )
}

export default Tabs

const styles = StyleSheet.create({})