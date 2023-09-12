import React, { useEffect, useCallback, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { View, Button, Text, StyleSheet, Platform, BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

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

import { postAlarm } from '../../Redux/Slices/AlarmSlice';
import { postUser } from '../../Redux/Slices/UserSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      top: 7,
      right: 7,
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

  const navigate = useNavigation();

  const dispatch = useDispatch();
  const Alarm = useSelector(state => { return state.alarm.data; });
  const mainData = useSelector(state => { return state.user.data; });

  const [AlarmFlag, setAlarmFlag] = useState(false);

  useEffect(()=>{
    dispatch(postAlarm({page: 1}));
    dispatch(postUser());
  }, []);

  useEffect(()=>{
    Alarm?.filter(x => x.readFlag == false) == '' ? setAlarmFlag(false) : setAlarmFlag(true);
  }, [Alarm]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      dispatch(postAlarm({page: 1}));

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []));

  return (
    <Tab.Navigator initialRouteName='홈' backBehavior='initialRoute' screenOptions={Platform.OS == 'ios' ? { headerShown: false, tabBarActiveTintColor: '#fb8c00', tabBarLabelStyle: {fontSize: 11}}
      : {tabBarStyle: { height: 55, position: 'absolute', paddingBottom: 5, elevation: 0 }, headerShown: false, tabBarActiveTintColor: '#fb8c00', tabBarLabelStyle: {fontSize: 11}}}>


      <Tab.Screen name="맘스 톡" options={{tabBarIcon: ({focused, color}) => (focused ? <Forum2 /> : <Forum/>), unmountOnBlur:true}}
      listeners={{tabPress: (e)=>{
        AsyncStorage.setItem('momsTalk_filter', '최신 순');
        AsyncStorage.setItem('materialList_filter', '최신 순');
        AsyncStorage.setItem('event_filter', '최신 순');
        AsyncStorage.setItem('momsTalkTab', '전체');
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

      <Tab.Screen name="홈" options={{tabBarIcon: ({focused, color}) => (focused ? <Home3 /> : <Home2 />) , unmountOnBlur:true, tabPress: e => {
        navigation.popToTo();
      }}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="Home"
                        component={Home}
                        options={({ navigation, route }) => ({
                            title: '', headerShown: false,
                            headerStyle:{backgroundColor: '#FEECB3'},
                            
                          })}/>
               </Stack.Navigator>
               
          )}
        </Tab.Screen>
       

      

      <Tab.Screen name="출산 준비물" options={{tabBarIcon: ({focused, color}) => (focused ? <Note2 /> : <Note />), unmountOnBlur: true}}>
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

      <Tab.Screen name="맘스 정보" options={{tabBarIcon: ({focused, color}) => (focused ? <Campaign2 /> : <Campaign />), unmountOnBlur: true}}
      listeners={{tabPress: async(e)=>{ 
        AsyncStorage.removeItem('eventMonth');
        AsyncStorage.setItem('momsInfoTab', '전체');
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
                            height: 80
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