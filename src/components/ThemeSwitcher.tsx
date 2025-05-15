import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {fonts} from '../styles/fonts';

export default function ThemeSwitcher() {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: theme.primary}]}
      onPress={toggleTheme}>
      <Text style={[styles.text, {color: theme.buttonText}]}>Toggle Theme</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  text: {
    ...fonts.medium,
    fontSize: 16,
  },
});
