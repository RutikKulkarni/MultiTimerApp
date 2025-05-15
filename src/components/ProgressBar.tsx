import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({progress}: ProgressBarProps) {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={[styles.container, {borderColor: theme.border}]}>
      <View
        style={[
          styles.filler,
          {width: `${progress}%`, backgroundColor: theme.primary},
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  filler: {
    height: '100%',
  },
});
