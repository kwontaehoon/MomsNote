import React from 'react'
import { View, Text, StyleSheet, LogBox } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dday from '../Dday/Main'
import Home from '../Home/Main'
import Talk1Detail from '../Talk/tab1/Tab1Detail'
import TalkRegister from '../Talk/Register/Main'
import TalkCategories from '../Talk/Register/Categories'
import Information from '../Information/Main'
import Materials from '../Materials/Main'
import Talk from '../Talk/Main'
import TaklTab2 from '../Talk/Tab2/Main'
import TalkTab3Detail from '../Talk/Tab3/Tab3Detail'
import MyPage from '../MyPage/MyPage'
import MyPageInquiry from '../MyPage/Inquiry/Main'
import MyPageInquiryDetail from '../MyPage/Inquiry/InquiryDetail'
import MyPageNotice from '../MyPage/Notice/Main' // 공지사항
import MyPageNoticeDetail from '../MyPage/Notice/NoticeDetail' // 공지사항 내용
import MyPageEdit from '../MyPage/Edit/Main' // 내 정보 수정
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import Icon3 from 'react-native-vector-icons/Feather' 

LogBox.ignoreAllLogs();


const Navigation = () => {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
  
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{ height: 60, position: 'absolute', paddingBottom: 7}, tabBarActiveTintColor: '#fb8c00', tabBarLabelStyle: {fontSize: 12}}}>
          
        <Tab.Screen name="홈" options={{tabBarIcon: ({color}) => (<Icon2 name='home' size={22} color={color}/>)}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="Home"
                        component={Materials}
                        options={{headerShown: false}}
                        />
                    <Stack.Screen 
                        name=" "
                        component={TalkTab3Detail}
                        />
                    <Stack.Screen 
                        name="aa"
                        component={TalkTab3Detail}
                        />
               </Stack.Navigator>   
          )}
        </Tab.Screen>
          <Tab.Screen name="맘스톡" options={{tabBarIcon: ({color}) => (<Icon3 name='message-square' size={22} color={color}/>), tabBarStyle: {display: 'none'}}}>
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
          <Tab.Screen name="D-280" component={Dday} options={{tabBarIcon: ({color}) => (<Icon name='calendar-o' size={22} color={color}/>)}}></Tab.Screen>
          <Tab.Screen name="출산준비물" component={Materials} options={{tabBarIcon: ({color}) => (<Icon2 name='bag' size={22} color={color}/>)}}></Tab.Screen>
          <Tab.Screen name="맘스정보" component={Information} options={{tabBarIcon: ({color}) => (<Icon name='bullhorn' size={22} color={color}/>)}}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
  )
}

export default Navigation