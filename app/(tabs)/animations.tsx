import { StyleSheet, Text, View } from 'react-native'
import mockData from "@/constants/mockData"
import VerticalList from '@/components/VerticalList'


const Animations = () => {

  return (
    <View style={styles.container}>
       <VerticalList data={mockData} />
    </View>
  )
}

export default Animations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
  }
})