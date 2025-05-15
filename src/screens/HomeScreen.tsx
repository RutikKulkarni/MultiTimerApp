import React, {useContext, useState} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import useTimer, {Timer} from '../hooks/useTimer';
import AddTimerForm from '../components/AddTimerForm';
import CategoryGroup from '../components/CategoryGroup';
import ThemeSwitcher from '../components/ThemeSwitcher';
import CompletionModal from '../components/CompletionModal';
import {fonts} from '../styles/fonts';

import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  History: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({navigation}: HomeScreenProps) {
  const {theme} = useContext(ThemeContext);
  const {
    timers,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    startAll,
    pauseAll,
    resetAll,
  } = useTimer();
  const [completedTimer, setCompletedTimer] = useState<string | null>(null);

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {} as Record<string, Timer[]>);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <ThemeSwitcher />
      <AddTimerForm onAddTimer={addTimer} />
      <FlatList
        data={Object.keys(groupedTimers)}
        keyExtractor={item => item}
        renderItem={({item: category}) => (
          <CategoryGroup
            category={category}
            timers={groupedTimers[category]}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
            onStartAll={startAll}
            onPauseAll={pauseAll}
            onResetAll={resetAll}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, {color: theme.text}]}>
            No timers available
          </Text>
        }
      />
      <TouchableOpacity
        style={[styles.historyButton, {backgroundColor: theme.primary}]}
        onPress={() => navigation.navigate('History')}>
        <Text style={[styles.buttonText, {color: theme.buttonText}]}>
          View History
        </Text>
      </TouchableOpacity>
      {completedTimer && (
        <CompletionModal
          visible={!!completedTimer}
          timerName={timers.find(t => t.id === completedTimer)?.name || ''}
          onClose={() => setCompletedTimer(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  empty: {
    ...fonts.regular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  historyButton: {
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    ...fonts.medium,
    fontSize: 16,
  },
});
