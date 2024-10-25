// components/game/ResultModal.tsx

import React from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface ResultModalProps {
  result: string | null;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ result, onClose }) => {
  return (
    <Modal
      visible={!!result}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <LottieView
            source={
              result === 'You win!'
                ? require('@/assets/animations/win.json')
                : result === 'You lose!'
                ? require('@/assets/animations/lose.json')
                : require('@/assets/animations/draw.json')
            }
            autoPlay
            loop={false}
            style={styles.resultAnimation}
          />
          <Text style={styles.modalResultText}>{result}</Text>
          <Pressable onPress={onClose} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalResultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  resultAnimation: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default ResultModal;
