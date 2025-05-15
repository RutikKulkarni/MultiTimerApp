import {HistoryEntry} from '../hooks/useTimer';

export function exportHistory(history: HistoryEntry[]) {
  const data = JSON.stringify(history, null, 2);
  console.log('Exported history:', data);
}
