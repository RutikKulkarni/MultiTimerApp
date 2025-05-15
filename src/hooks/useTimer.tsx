import {useState, useEffect, useCallback} from 'react';
import {
  saveTimers,
  loadTimers,
  saveHistory,
  loadHistory,
} from '../services/storageService';

export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category: string;
  status: 'running' | 'paused' | 'completed';
  halfwayAlert: boolean;
}

export interface HistoryEntry {
  id: string;
  name: string;
  completionTime: string;
}

export default function useTimer() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    loadTimers().then(setTimers);
    loadHistory().then(setHistory);
  }, []);

  useEffect(() => {
    saveTimers(timers);
  }, [timers]);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addTimer = useCallback(
    (name: string, duration: number, category: string) => {
      const newTimer: Timer = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        duration,
        remainingTime: duration,
        category,
        status: 'paused',
        halfwayAlert: true,
      };
      setTimers(prev => [...prev, newTimer]);
    },
    [],
  );

  const updateTimer = useCallback((id: string, updates: Partial<Timer>) => {
    setTimers(prev =>
      prev.map(timer => (timer.id === id ? {...timer, ...updates} : timer)),
    );
  }, []);

  const startTimer = useCallback(
    (id: string) => {
      updateTimer(id, {status: 'running'});
    },
    [updateTimer],
  );

  const pauseTimer = useCallback(
    (id: string) => {
      updateTimer(id, {status: 'paused'});
    },
    [updateTimer],
  );

  const resetTimer = useCallback((id: string) => {
    setTimers(prev =>
      prev.map(timer =>
        timer.id === id
          ? {...timer, remainingTime: timer.duration, status: 'paused'}
          : timer,
      ),
    );
  }, []);

  const startAll = useCallback((category: string) => {
    setTimers(prev =>
      prev.map(timer =>
        timer.category === category && timer.status !== 'completed'
          ? {...timer, status: 'running'}
          : timer,
      ),
    );
  }, []);

  const pauseAll = useCallback((category: string) => {
    setTimers(prev =>
      prev.map(timer =>
        timer.category === category && timer.status === 'running'
          ? {...timer, status: 'paused'}
          : timer,
      ),
    );
  }, []);

  const resetAll = useCallback((category: string) => {
    setTimers(prev =>
      prev.map(timer =>
        timer.category === category
          ? {...timer, remainingTime: timer.duration, status: 'paused'}
          : timer,
      ),
    );
  }, []);

  const tick = useCallback(() => {
    setTimers(prev =>
      prev.map(timer => {
        if (timer.status !== 'running') return timer;
        const newTime = timer.remainingTime - 1;
        if (newTime <= 0) {
          setHistory(prev => [
            ...prev,
            {
              id: timer.id,
              name: timer.name,
              completionTime: new Date().toISOString(),
            },
          ]);
          return {...timer, remainingTime: 0, status: 'completed'};
        }
        if (timer.halfwayAlert && newTime === Math.floor(timer.duration / 2)) {
          console.log(`Halfway alert for ${timer.name}`);
        }
        return {...timer, remainingTime: newTime};
      }),
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  return {
    timers,
    history,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    startAll,
    pauseAll,
    resetAll,
  };
}
