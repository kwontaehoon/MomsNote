import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { View, Button, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'

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

import Push from '../Test/Push'
import DateTime22 from '../Test/DateTime2'

import { postAlarm } from '../../Redux/Slices/AlarmSlice';

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
      padding: 10,
    },
    redDot:{
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'red',
      width: 7,
      height: 7,
      borderRadius: 40,
      zIndex: 999,
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

  const dispatch = useDispatch();
  const Alarm = useSelector(state => { return state.alarm.data; });

  const mainData = useSelector(state => { return state.user.data; });

  const [AlarmFlag, setAlarmFlag] = useState(false);

  useEffect(()=>{
    dispatch(postAlarm({page: 1}));
  }, []);

  useEffect(()=>{
    if(Alarm !== undefined && Alarm !== '0'){
      Alarm.filter(x => x.readFlag == true) == '' ? setAlarmFlag(false) : setAlarmFlag(true);
    }
  }, [Alarm])

  return (
    <Tab.Navigator initialRouteName='Dday' screenOptions={Platform.OS == 'ios' ? { headerShown: false, tabBarActiveTintColor: '#fb8c00', tabBarLabelStyle: {fontSize: 11}}
      : {tabBarStyle: { height: 55, position: 'absolute', paddingBottom: 5, elevation: 0 }, headerShown: false, tabBarActiveTintColor: '#fb8c00', tabBarLabelStyle: {fontSize: 11}}}>


      <Tab.Screen name="맘스 톡" options={{tabBarIcon: ({focused, color}) => (focused ? <Forum2 /> : <Forum/>), unmountOnBlur:true}}
      listeners={{tabPress: (e)=>{
      }}}>
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
                                    <View style={styles.iconBox}>
                                      <View style={[styles.redDot, {display: AlarmFlag ? 'flex' : 'none'}]} />
                                      <Bell onPress={()=>navigation.navigate('알림')}/>
                                    </View>
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

          <Tab.Screen name="Dday" options={{tabBarIcon: ({focused, color}) => (focused ? <Baby2 /> : <Baby />), tabBarLabel: `D-${mainData == '' || mainData == undefined ? '' : mainData.dday}` , unmountOnBlur:true}}
          listeners={{tabPress: (e)=>{
          }}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="D-280"
                        component={Dday}
                        options={({ navigation, route }) => ({
                        headerLeft: () => (
                            <View style={styles.header}>
                                <View style={styles.headerBox}>
                                    <Text style={{fontSize: 18, fontWeight: '600', paddingLeft: 5}}>{`D-${mainData == '' || mainData == undefined ? '' : mainData.dday}`}</Text>
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
                                    <View style={styles.iconBox}>
                                      <View style={[styles.redDot, {display: AlarmFlag ? 'flex' : 'none'}]} />
                                      <Bell onPress={()=>navigation.navigate('알림')}/>
                                    </View>
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

      <Tab.Screen name="홈" options={{tabBarIcon: ({focused, color}) => (focused ? <Home3 /> : <Home2 />) , unmountOnBlur:true}}>
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
       

      

      <Tab.Screen name="출산 준비물" options={{tabBarIcon: ({focused, color}) => (focused ? <Note2 /> : <Note />), unmountOnBlur:true}}>
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

      <Tab.Screen name="맘스 정보" options={{tabBarIcon: ({focused, color}) => (focused ? <Campaign2 /> : <Campaign />), unmountOnBlur:true}}
      listeners={{tabPress: (e)=>{ 
      }}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="맘스정보"
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
                                    <View style={styles.iconBox}>
                                      <View style={[styles.redDot, {display: AlarmFlag ? 'flex' : 'none'}]} />
                                      <Bell onPress={()=>navigation.navigate('알림')}/>
                                    </View>
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