// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/Navigator'; // Navigasi utama Anda
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
