import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';

type ConfirmationModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Decorative Icon */}
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/icons/warning.png')}
              style={styles.icon}
            />
          </View>

          {/* Message */}
          <Text style={styles.modalText}>{message}</Text>

          {/* Buttons in Two Rows */}
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fefefe',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalButtons: {
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#38a169',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10, // Add space between the buttons
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e53e3e',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ConfirmationModal;
