import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';  // Pantalla principal
import SafeAreaScreen from '../screens/SafeAreaScreen';  // Nueva pantalla de área segura

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SafeArea" component={SafeAreaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}