import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const {theme} = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: theme.primary},
          headerTintColor: theme.buttonText,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Multi Timer'}}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{title: 'Timer History'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
