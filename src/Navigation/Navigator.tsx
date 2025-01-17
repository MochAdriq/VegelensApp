// src/Navigation/Navigator.js
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import HamburgerScreen from '../Screens/HamburgerScreen';
import InformationScreen from '../Screens/InformationScreen';
import ImageCard from '../component/imageCard';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HamburgerScreen"
        component={HamburgerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InformationScreen"
        component={InformationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
