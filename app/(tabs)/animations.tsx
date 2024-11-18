import { StyleSheet, Text, View } from 'react-native'
import { Indicator } from '@/components/onboarding/Indicator'
import { useState } from 'react'


const Animations = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Indicator
        total={10}
        selectedIndex={selectedIndex}
        onIndexChange={(index) => setSelectedIndex(index)}
      />
    </View>
  )
}

export default Animations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  }
})