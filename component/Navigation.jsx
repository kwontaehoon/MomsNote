import React from 'react'
import { View, Text, StyleSheet, LogBox } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dday from './Dday/Main'
import Home from './Home/Main'
import tt from './Talk/Talk1Sub';
import Information from './Information/Main'
import Materials from './Materials/Main'
import Talk from './Talk/Main'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import Icon3 from 'react-native-vector-icons/Feather' 

LogBox.ignoreAllLogs();


const Navigation = () => {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
  
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{ height: 60, position: 'absolute', paddindgBottom: 7}}}>
          
        <Tab.Screen name="Home" options={{tabBarIcon: () => (<Icon2 name='home' size={23}/>)}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="Home"
                        component={Home}
                        options={{headerShown: false}}
                        />
                    <Stack.Screen 
                        name=" "
                        component={tt}
                        />
               </Stack.Navigator>   
          )}
        </Tab.Screen>
          <Tab.Screen name="Talk" options={{tabBarIcon: () => (<Icon3 name='message-square' size={23}/>)}}>
          {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="TalkMain"
                        component={Talk}
                        options={{headerShown: false}}
                        />
               </Stack.Navigator>   
            )}
          </Tab.Screen>
          <Tab.Screen name="Dday" component={Dday} options={{tabBarIcon: () => (<Icon name='calendar-o' size={23}/>)}}></Tab.Screen>
          <Tab.Screen name="Marterial" component={Materials} options={{tabBarIcon: () => (<Icon2 name='bag' size={23}/>)}}></Tab.Screen>
          <Tab.Screen name="Information" component={Information} options={{tabBarIcon: () => (<Icon name='bullhorn' size={23}/>)}}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
  )
}

export default Navigation