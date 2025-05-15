import React, {useContext} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import useTimer from '../hooks/useTimer';
import {fonts} from '../styles/fonts';
import {exportHistory} from '../services/exportService';

export default function HistoryScreen() {
  const {theme} = useContext(ThemeContext);
  const {history} = useTimer();

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={[styles.item, {backgroundColor: theme.card}]}>
            <Text style={[styles.name, {color: theme.text}]}>{item.name}</Text>
            <Text style={[styles.time, {color: theme.secondary}]}>
              Completed: {new Date(item.completionTime).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, {color: theme.text}]}>
            No history available
          </Text>
        }
      />
      <TouchableOpacity
        style={[styles.exportButton, {backgroundColor: theme.primary}]}
        onPress={() => exportHistory(history)}>
        <Text style={[styles.buttonText, {color: theme.buttonText}]}>
          Export History
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    ...fonts.bold,
    fontSize: 16,
  },
  time: {
    ...fonts.regular,
    fontSize: 12,
  },
  empty: {
    ...fonts.regular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  exportButton: {
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
