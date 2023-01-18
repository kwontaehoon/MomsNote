import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { View, Button, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Home from '../Home/Main'
import Talk from '../Talk/Main'
import Dday from '../Dday/Main'
import Materials from '../Materials/Main'
import Information from '../Information/Main'

import Search from '../../../public/assets/svg/Search.svg'
import Bell from '../../../public/assets/svg/Bell.svg'
import MyPage from '../../../public/assets/svg/Mypage.svg'
import Back from '../../../public/assets/svg/Back.svg'

import Note from '../../../public/assets/svg/Note.svg'
import Home2 from '../../../public/assets/svg/home.svg'
import Forum from '../../../public/assets/svg/forum.svg'
import Campaign from '../../../public/assets/svg/campaign.svg'
import Baby from '../../../public/assets/svg/Baby.svg'

import Note2 from '../../../public/assets/svg/Note2.svg'
import Home3 from '../../../public/assets/svg/home2.svg'
import Forum2 from '../../../public/assets/svg/forum2.svg'
import Campaign2 from '../../../public/assets/svg/campaign2.svg'
import Baby2 from '../../../public/assets/svg/Baby2.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTime from '../Test/DateTime'

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
    },
    headerBox:{
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 15,
      paddingRight: 15
    },
    iconBox:{
      paddingLeft: 5,
      padding: 10
    },
    header2:{
      width: 300,
      borderWidth: 1,
      height: 50,   
    }
});


function MainScreen() {

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const [userInfo, setUserInfo] = useState();

  useEffect(()=>{
    const userInfo = async()=> {
    
    const asyncStorage = await AsyncStorage.getItem('user');

    setUserInfo(moment(JSON.parse(asyncStorage).dueDate).diff(moment(), "days"));
  
    }
    userInfo();
  }, []);

  return (
    <Tab.Navigator initialRouteName='맘스 톡' screenOptions={Platform.OS == 'ios' ? { headerShown: false, tabBarActiveTintColor: '#fb8c00', tabBarLabelStyle: {fontSize: 11}}
      : {tabBarStyle: { height: 55, position: 'absolute', paddingBottom: 3}, headerShown: false, tabBarActiveTintColor: '#fb8c00', tabBarLabelStyle: {fontSize: 11}}}>
      <Tab.Screen name="맘스 톡" options={{tabBarIcon: ({focused, color}) => (focused ? <Forum2 /> : <Forum/>)}}>
          {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="맘스톡"
                        component={Talk}
                        options={({ navigation, route }) => ({
                          headerLeft: () => (
                            <View style={styles.header}>
                                <View style={styles.headerBox}>
                                    <Text style={{fontSize: 18, fontWeight: '600', paddingLeft: 5}}>맘스 톡</Text>
                                </View>
                            </View>
                        ),
                        headerTitle(props) {
                          <View></View>
                        },
                          headerRight: () => (
                            <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Search onPress={()=>navigation.navigate('검색')}/></View>
                                    <View style={styles.iconBox}><Bell onPress={()=>navigation.navigate('알림')}/></View>
                                    <View style={styles.iconBox}><MyPage onPress={()=>navigation.navigate('마이페이지')}/></View>
                                </View>
                            </View>
                          ),
                          headerStyle: {
                            borderWidth: 0,
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                        })}
                        />
               </Stack.Navigator>   
            )}
          </Tab.Screen>

          <Tab.Screen name="Dday" options={{tabBarIcon: ({focused, color}) => (focused ? <Baby2 /> : <Baby />), tabBarLabel: `D-${userInfo}`}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="D-280"
                        component={Dday}
                        options={({ navigation, route }) => ({
                        headerLeft: () => (
                            <View style={styles.header}>
                                <View style={styles.headerBox}>
                                    <Text style={{fontSize: 18, fontWeight: '600', paddingLeft: 5}}>{`D-${userInfo}`}</Text>
                                </View>
                            </View>
                        ),
                        headerTitle(props) {
                          <View></View>
                        },
                          headerRight: () => (
                            <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Search onPress={()=>navigation.navigate('검색')}/></View>
                                    <View style={styles.iconBox}><Bell onPress={()=>navigation.navigate('알림')}/></View>
                                    <View style={styles.iconBox}><MyPage onPress={()=>navigation.navigate('마이페이지')}/></View>
                                </View>
                            </View>
                          ),
                          headerStyle: {
                            borderWidth: 0,
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                        })}/>
               </Stack.Navigator>   
        )}
      </Tab.Screen>

      <Tab.Screen name="홈" options={{tabBarIcon: ({focused, color}) => (focused ? <Home3 /> : <Home2 />)}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="Home"
                        component={Home}
                        options={({ navigation, route }) => ({
                            title: '', headerShown: false,
                            headerStyle:{backgroundColor: '#FEECB3'},
                          })}
                        />
               </Stack.Navigator>
               
          )}
        </Tab.Screen>
       

      

      <Tab.Screen name="출산 준비물" options={{tabBarIcon: ({focused, color}) => (focused ? <Note2 /> : <Note />)}}>
      {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="출산준비물"
                        component={Materials}
                        options={({ navigation, route }) => ({
                            headerShown: false
                          })}
                        />
               </Stack.Navigator>   
          )}
      </Tab.Screen>

      <Tab.Screen name="맘스정보" options={{tabBarIcon: ({focused, color}) => (focused ? <Campaign2 /> : <Campaign />)}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="맘스 정보"
                        component={Information}
                        options={({ navigation, route }) => ({
                          headerLeft: () => (
                            <View style={styles.header}>
                                <View style={styles.headerBox}>
                                    <Text style={{fontSize: 18, fontWeight: '600', paddingLeft: 5}}>맘스 정보</Text>
                                </View>
                            </View>
                        ),
                        headerTitle(props) {
                          <View></View>
                        },
                          headerRight: () => (
                            <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Search onPress={()=>navigation.navigate('검색')}/></View>
                                    <View style={styles.iconBox}><Bell onPress={()=>navigation.navigate('알림')}/></View>
                                    <View style={styles.iconBox}><MyPage onPress={()=>navigation.navigate('마이페이지')}/></View>
                                </View>
                            </View>
                          ),
                          headerStyle: {
                            borderWidth: 0,
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                        })}
                        />
               </Stack.Navigator>   
          )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default MainScreen;