import React from 'react'
import { View, Text, StyleSheet, LogBox } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dday from './Dday/Main'
import Home from './Home/Main'
import Information from './Information/Main'
import Materials from './Materials/Main'
import Talk from './Talk/Main'
import Talk1 from './Talk/Talk1'
import Default from './Default';

LogBox.ignoreAllLogs();


const Navigation = () => {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
  
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{ height: 60, position: 'absolute', paddindgBottom: 7}}}>
          <Tab.Screen name="Default" component={Default}></Tab.Screen>
          <Tab.Screen name="Talk">
          {()=>(
               <Stack.Navigator >
                    <Stack.Screen 
                        name="TalkMain"
                        component={Talk1}
                        options={{headerShown: false}}
                        />
                    <Stack.Screen 
                        name="검색"
                        component={Talk}
                        />
               </Stack.Navigator>   
            )}
          </Tab.Screen>
          <Tab.Screen name="Dday" component={Dday}></Tab.Screen>
          <Tab.Screen name="Home" component={Home}></Tab.Screen>
          <Tab.Screen name="Marterial" component={Materials}></Tab.Screen>
          <Tab.Screen name="Information" component={Information}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
  )
}

export default Navigation