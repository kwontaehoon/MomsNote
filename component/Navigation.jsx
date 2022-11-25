import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dday from './Dday/Main'
import Home from './Home/Main'
import Information from './Information/Main'
import Materials from './Materials/Main'
import Talk from './Talk/Main'


const Navigation = () => {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
  
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Talk" component={Talk}></Tab.Screen>
          <Tab.Screen name="Dday" component={Dday}></Tab.Screen>
          <Tab.Screen name="Home" component={Home}></Tab.Screen>
          <Tab.Screen name="Marterial" component={Materials}></Tab.Screen>
          <Tab.Screen name="Information" component={Information}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
  )
}

export default Navigation