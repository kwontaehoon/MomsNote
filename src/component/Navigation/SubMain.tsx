import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import {View, Button, Text, StyleSheet} from 'react-native';
import Home from '../Home/Main'
import Talk from '../Talk/Main'
import Dday from '../Dday/Main'
import Materials from '../Materials/Main'
import Information from '../Information/Main'

import Search from '../../../public/assets/svg/Search.svg'
import Bell from '../../../public/assets/svg/Bell.svg'
import MyPage from '../../../public/assets/svg/Mypage.svg'

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
})
function MainScreen() {

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return (
    <Tab.Navigator initialRouteName='맘스 톡' screenOptions={{ headerShown: false, tabBarStyle:{ height: 60, position: 'absolute', paddingBottom: 7}, tabBarActiveTintColor: '#fb8c00', tabBarLabelStyle: {fontSize: 11}}}>
      <Tab.Screen name="맘스 톡" options={{tabBarIcon: ({focused, color}) => (focused ? <Forum2 /> : <Forum/>)}}>
          {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="맘스톡"
                        component={Talk}
                        options={({ navigation, route }) => ({
                          headerRight: () => (
                            <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Search onPress={()=>navigation.navigate('검색')}/></View>
                                    <View style={styles.iconBox}><Bell onPress={()=>navigation.navigate('알림')}/></View>
                                    <View style={styles.iconBox}><MyPage onPress={()=>navigation.navigate('마이페이지')}/></View>
                                </View>
                            </View>
                          ),
                        })}
                        />
               </Stack.Navigator>   
            )}
          </Tab.Screen>

          <Tab.Screen name="D-260" options={{tabBarIcon: ({focused, color}) => (focused ? <Baby2 /> : <Baby />)}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="D-280"
                        component={Dday}
                        options={({ navigation, route }) => ({
                          headerRight: () => (
                            <View style={styles.header}>
                            <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                <View style={styles.iconBox}><Search onPress={()=>navigation.navigate('검색')}/></View>
                                <View style={styles.iconBox}><Bell onPress={()=>navigation.navigate('알림')}/></View>
                                <View style={styles.iconBox}><MyPage onPress={()=>navigation.navigate('마이페이지')}/></View>
                            </View>
                        </View>
                          ),
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
                          headerRight: () => (
                            <View style={styles.header}>
                            <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                <View style={styles.iconBox}><Search onPress={()=>navigation.navigate('맘스톡 서치')}/></View>
                                <View style={styles.iconBox}><Bell onPress={()=>navigation.navigate('알림')}/></View>
                                <View style={styles.iconBox}><MyPage onPress={()=>navigation.navigate('마이페이지')}/></View>
                            </View>
                        </View>
                          ),
                        })}
                        />
               </Stack.Navigator>   
          )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="상세보기"
        onPress={() => navigation.push('추가 정보 입력', {id: 1})}
      />
    </View>
  );
}

function SearchScreen() {
  return <Text>Search</Text>;
}

function NotificationScreen() {
  return <Text>Notification</Text>;
}

function MessageScreen() {
  return <Text>Message</Text>;
}

export default MainScreen;