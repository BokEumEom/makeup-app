import { icons } from 'lucide-react-native';
import { MotiProps, MotiView } from 'moti';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';
import React from 'react';

// Use `LucideProps` for proper typing of icon props
import type { LucideProps } from 'lucide-react-native';

type IconNames = keyof typeof icons;

type TabItem = {
  icon: IconNames;
  label: string;
};

type TabProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
};

type IconProp = {
  name: IconNames;
} & MotiProps;

function Icon({ name, ...rest }: IconProp) {
  // Get the specific icon from `icons` and wrap it in a compatible component
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null; // Handle missing icons gracefully
  }

  return (
    <MotiView
      animate={{
        opacity: 1,
        scale: 1,
      }}
      from={{
        opacity: 0,
        scale: 0.8,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 200,
      }}
    >
      <IconComponent size={16} {...(rest as LucideProps)} />
    </MotiView>
  );
}

const Tabs = ({
  data,
  selectedIndex,
  onChange,
  activeColor = '#fff',
  inactiveColor = '#999',
  activeBackgroundColor = '#111',
  inactiveBackgroundColor = '#ddd',
}: TabProps) => {
  const _spacing = 4;

  return (
    <View style={[styles.tabContainer, { gap: _spacing }]}>
      {data.map((item, index) => {
        const isSelected = selectedIndex === index;
        return (
          <MotiView
            key={`tab-${index}`}
            animate={{
              backgroundColor: isSelected
                ? activeBackgroundColor
                : inactiveBackgroundColor,
            }}
            style={styles.tab}
          >
            <Pressable
              onPress={() => onChange(index)}
              style={[
                styles.pressable,
                {
                  backgroundColor: isSelected ? activeBackgroundColor : inactiveBackgroundColor,
                },
              ]}
            >
              <Icon
                name={item.icon}
                animate={{
                  color: isSelected ? activeColor : inactiveColor,
                }}
              />
              {isSelected && (
                <Animated.Text
                  entering={FadeInRight.springify().damping(20).stiffness(200)}
                  exiting={FadeOutRight.springify().damping(20).stiffness(200)}
                  style={[
                    styles.label,
                    {
                      color: isSelected ? activeColor : inactiveColor,
                    },
                  ]}
                >
                  {item.label}
                </Animated.Text>
              )}
            </Pressable>
          </MotiView>
        );
      })}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    padding: 4,
  },
  tab: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  label: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
  },
});
