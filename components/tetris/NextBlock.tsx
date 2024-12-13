// components/tetris/NextBlock.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // 화면 너비 가져오기

interface NextBlockProps {
  nextPiece: any; // Adjust this type based on your piece object
}

const NextBlock: React.FC<NextBlockProps> = ({ nextPiece }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOLD</Text>
      <View style={styles.blockContainer}>
        {nextPiece.shape.map((row: number[], rowIndex: number) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell: number, cellIndex: number) => (
              <View
                key={cellIndex}
                style={[
                  styles.cell,
                  cell ? { backgroundColor: nextPiece.color } : null,
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.23, // 고정된 넓이
    height: width * 0.23, // 고정된 높이
    backgroundColor: '#1E1E3A',
    padding: width * 0.03, // 동적으로 패딩 설정
    borderRadius: width * 0.02, // 둥근 모서리
    borderWidth: 1,
    borderColor: '#00FFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: width * 0.02, // 외부 간격
  },
  title: {
    fontSize: width * 0.04, // 동적으로 텍스트 크기 설정
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  blockContainer: {
    width: '100%',
    height: '60%', // 블록 컨테이너의 비율 설정
    backgroundColor: '#2A2A4A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.01,
    padding: width * 0.02,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: width * 0.05, // 블록 크기 고정
    height: width * 0.05,
    margin: 1,
    backgroundColor: 'transparent',
  },
});

export default NextBlock;
