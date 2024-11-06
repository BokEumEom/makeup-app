// GenericModal.tsx

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type GenericModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  icon?: string; // 이모지나 아이콘 코드
  buttonText?: string;
};

const GenericModal: React.FC<GenericModalProps> = ({ visible, onClose, title, message, icon, buttonText = "OK" }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={styles.titleText}>{title}</Text>
          {message && <Text style={styles.messageText}>{message}</Text>}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GenericModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#f4b400',
    padding: 20,
    borderRadius: 15,
    width: 300,
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 24,
    color: '#1b3b5a',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'DepartureMono',
    marginBottom: 15,
  },
  messageText: {
    fontSize: 16,
    color: '#1b3b5a',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'DepartureMono',
  },
  button: {
    borderWidth: 1,
    borderColor: '#1b3b5a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#1b3b5a',
    fontWeight: 'bold',
    fontFamily: 'DepartureMono',
  },
});
