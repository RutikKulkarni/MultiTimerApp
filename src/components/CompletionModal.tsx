import React, {useContext} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {fonts} from '../styles/fonts';

interface CompletionModalProps {
  visible: boolean;
  timerName: string;
  onClose: () => void;
}

export default function CompletionModal({
  visible,
  timerName,
  onClose,
}: CompletionModalProps) {
  const {theme} = useContext(ThemeContext);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, {backgroundColor: theme.overlay}]}>
        <View style={[styles.modal, {backgroundColor: theme.card}]}>
          <Text style={[styles.title, {color: theme.text}]}>
            Timer Completed! {timerName}
          </Text>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.primary}]}
            onPress={onClose}>
            <Text style={[styles.buttonText, {color: theme.buttonText}]}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: 300,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    ...fonts.bold,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    ...fonts.medium,
    fontSize: 16,
  },
});
