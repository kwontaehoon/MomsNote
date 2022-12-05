import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/AntDesign'
import Icon5 from 'react-native-vector-icons/Feather'
import Icon6 from 'react-native-vector-icons/Entypo'
import Home from '../Home/Main'
import Talk from '../Talk/Main'
import Dday from '../Dday/Main'
import Materials from '../Materials/Main'
import Information from '../Information/Main'



const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{ height: 60, position: 'absolute', paddingBottom: 7}, tabBarActiveTintColor: '#fb8c00', tabBarLabelStyle: {fontSize: 12}}}>
      <Tab.Screen
        name="Talk"
        component={Talk}
        options={{tabBarIcon: ({color}) => (<Icon3 name='message-square' size={22} color={color}/>)}}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;