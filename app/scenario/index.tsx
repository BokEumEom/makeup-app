import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { scenarios } from '../../constants/scenarios';
import { useRouter } from 'expo-router';
import { Header } from '../../components/common/Header'; // Header 컴포넌트
import { FontAwesome } from '@expo/vector-icons'; // AntDesign 아이콘 대신 FontAwesome 사용

const ScenarioListScreen = () => {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push(`/scenario/${item.id}`)}
    >
      <View style={styles.iconAndTextContainer}>
        <FontAwesome name="pencil-square-o" size={26} color="#1D3557" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="시나리오 리스트" showBackButton={true} titleColor="#000" /> 
      <FlatList
        data={scenarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ScenarioListScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F1FAEE',
  },
  listContainer: { 
    padding: 20, 
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconAndTextContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  icon: {
    marginRight: 15, 
  },
  textContainer: {
    flex: 1,
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#1D3557',
    flexShrink: 1, 
  },
  description: { 
    fontSize: 14, 
    color: '#457B9D',
    flexShrink: 1,
  },
});
