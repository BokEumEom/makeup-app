import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Tabs from "@/components/common/Tabs";
import { useState } from 'react';
import Animated, { FadeInRight, FadeOutLeft, FadeOutRight, LayoutAnimationConfig } from 'react-native-reanimated';

const tabs = ["#FF005C", "#FFBD00", "#00B3E6", "#00CC96", "gold"];

const AnimatedTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Tabs
        data={[
          { icon: "Sprout", label: "Sprout" },
          { icon: "Fish", label: "Fresh fish" },
          { icon: "Sailboat", label: "Sail" },
          { icon: "Ship", label: "Ship it" },
          { icon: "ShipWheel", label: "Manage it" },
        ]}
        onChange={(index) => setSelectedIndex(index)}
        selectedIndex={selectedIndex}
      />
      
      <LayoutAnimationConfig skipEntering>
        <Animated.View
          key={`tab-content-${selectedIndex}`}
          entering={FadeInRight.springify().damping(80).stiffness(200)}
          exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
          style={{
            backgroundColor: tabs[selectedIndex],
            flex: 1,
            borderRadius: 8,
          }}
        />
      </LayoutAnimationConfig>
    </SafeAreaView>
  )
}

export default AnimatedTabs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    margin: 12,
    gap: 12,
  }
})