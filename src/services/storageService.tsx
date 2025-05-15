import AsyncStorage from '@react-native-async-storage/async-storage';
import {Timer, HistoryEntry} from '../hooks/useTimer';

const TIMERS_KEY = 'timers';
const HISTORY_KEY = 'history';

export async function saveTimers(timers: Timer[]) {
  try {
    await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
  } catch (error) {
    console.error('Error saving timers:', error);
  }
}

export async function loadTimers(): Promise<Timer[]> {
  try {
    const data = await AsyncStorage.getItem(TIMERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading timers:', error);
    return [];
  }
}

export async function saveHistory(history: HistoryEntry[]) {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history:', error);
  }
}

export async function loadHistory(): Promise<HistoryEntry[]> {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
}
