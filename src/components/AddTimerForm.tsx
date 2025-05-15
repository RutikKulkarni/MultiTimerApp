import React, {useState, useContext} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {fonts} from '../styles/fonts';

interface AddTimerFormProps {
  onAddTimer: (name: string, duration: number, category: string) => void;
}

export default function AddTimerForm({onAddTimer}: AddTimerFormProps) {
  const {theme} = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (name && duration && category) {
      onAddTimer(name, parseInt(duration), category);
      setName('');
      setDuration('');
      setCategory('');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.label, {color: theme.text}]}>Timer Name</Text>
      <TextInput
        style={[styles.input, {borderColor: theme.border, color: theme.text}]}
        value={name}
        onChangeText={setName}
        placeholder="Enter timer name"
        placeholderTextColor={theme.placeholder}
      />
      <Text style={[styles.label, {color: theme.text}]}>
        Duration (seconds)
      </Text>
      <TextInput
        style={[styles.input, {borderColor: theme.border, color: theme.text}]}
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration"
        placeholderTextColor={theme.placeholder}
        keyboardType="numeric"
      />
      <Text style={[styles.label, {color: theme.text}]}>Category</Text>
      <TextInput
        style={[styles.input, {borderColor: theme.border, color: theme.text}]}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
        placeholderTextColor={theme.placeholder}
      />
      <Button title="Add Timer" onPress={handleSubmit} color={theme.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    ...fonts.medium,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    ...fonts.regular,
  },
});
