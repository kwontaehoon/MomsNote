import React from 'react'
import { View, Text, StyleSheet, LogBox, TouchableOpacity, NavigatorIOS } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SubMain from './SubMain'
import AddPage from '../Default/AddPage'
import Talk from '../Talk/Main'
import Detail from './Detail'
import Modal from '../Default/Modal'
import Talk1Tab1Detail from '../Talk/Tab1/Detail'
import Register from '../Talk/Register/Main'

LogBox.ignoreAllLogs();

const styles = StyleSheet.create({
    header:{
        height: 100,
        flexDirection: 'row',
    },
    headerBox:{
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
    },
    iconBox:{
        marginRight: 15,
    },

    header2:{
        width: 300,
        borderWidth: 1,
        height: 50,
        
    }
})


const Navigation = () => {
    const Stack = createStackNavigator();
  
    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="main" component={SubMain} options={{headerShown: false}}/>
            <Stack.Screen name="맘스톡" component={Talk} options={{title: '맘스톡'}}/>
            <Stack.Screen name="추가 정보 입력" component={AddPage} options={{title: '추가 정보 입력'}}/>
            <Stack.Screen name="Talk1Tab1Detail" component={Talk1Tab1Detail} options={{title: ''}}/>
            <Stack.Screen name="글쓰기" component={Register} options={{title: '', headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation