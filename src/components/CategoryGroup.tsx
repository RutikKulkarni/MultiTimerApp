import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import TimerItem from './TimerItem';
import {fonts} from '../styles/fonts';
import {Timer} from '../hooks/useTimer';

interface CategoryGroupProps {
  category: string;
  timers: Timer[];
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
  onStartAll: (category: string) => void;
  onPauseAll: (category: string) => void;
  onResetAll: (category: string) => void;
}

export default function CategoryGroup({
  category,
  timers,
  onStart,
  onPause,
  onReset,
  onStartAll,
  onPauseAll,
  onResetAll,
}: CategoryGroupProps) {
  const {theme} = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={[styles.container, {backgroundColor: theme.card}]}>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={[styles.categoryTitle, {color: theme.text}]}>
          {category}
        </Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onStartAll(category)}>
          <Text style={[styles.actionText, {color: theme.primary}]}>
            Start All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPauseAll(category)}>
          <Text style={[styles.actionText, {color: theme.primary}]}>
            Pause All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onResetAll(category)}>
          <Text style={[styles.actionText, {color: theme.primary}]}>
            Reset All
          </Text>
        </TouchableOpacity>
      </View>
      {isExpanded && (
        <View>
          {timers.map(timer => (
            <TimerItem
              key={timer.id}
              timer={timer}
              onStart={onStart}
              onPause={onPause}
              onReset={onReset}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
  },
  categoryTitle: {
    ...fonts.bold,
    fontSize: 18,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  actionText: {
    ...fonts.medium,
    fontSize: 14,
  },
});
