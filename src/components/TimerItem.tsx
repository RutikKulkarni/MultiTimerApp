import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import ProgressBar from './ProgressBar';
import {fonts} from '../styles/fonts';
import {formatTime} from '../utils/timeUtils';
import {Timer} from '../hooks/useTimer';

interface TimerItemProps {
  timer: Timer;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
}

export default function TimerItem({
  timer,
  onStart,
  onPause,
  onReset,
}: TimerItemProps) {
  const {theme} = useContext(ThemeContext);
  const progress = (timer.remainingTime / timer.duration) * 100;

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.name, {color: theme.text}]}>{timer.name}</Text>
      <Text style={[styles.time, {color: theme.text}]}>
        {formatTime(timer.remainingTime)}
      </Text>
      <Text style={[styles.status, {color: theme.secondary}]}>
        {timer.status}
      </Text>
      <ProgressBar progress={progress} />
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onStart(timer.id)}>
          <Text style={[styles.actionText, {color: theme.primary}]}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPause(timer.id)}>
          <Text style={[styles.actionText, {color: theme.primary}]}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onReset(timer.id)}>
          <Text style={[styles.actionText, {color: theme.primary}]}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  name: {
    ...fonts.bold,
    fontSize: 16,
  },
  time: {
    ...fonts.regular,
    fontSize: 14,
    marginVertical: 4,
  },
  status: {
    ...fonts.regular,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionText: {
    ...fonts.medium,
    fontSize: 14,
  },
});
