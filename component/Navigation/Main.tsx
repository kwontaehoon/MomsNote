import React from 'react'
import { View, Text, StyleSheet, LogBox, TouchableOpacity } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddPage from '../Default/AddPage'
import Dday from '../Dday/Main'
import Home from '../Home/Main'
import Information from '../Information/Main'
import InformationTab1Detail from '../Information/Tab1/Detail';
import Materials from '../Materials/Main'
import Budget from '../Materials/Budget/Main'
import Talk from '../Talk/Main'
import TalkTab1Detail from '../Talk/Tab1/Detail'
import TalkTab3Detail from '../Talk/Tab3/Tab3Detail'
import MyPage from '../MyPage/MyPage'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/AntDesign'
import Icon5 from 'react-native-vector-icons/Feather'
import Icon6 from 'react-native-vector-icons/Entypo'
import Register from '../Talk/Register/Main';

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
        marginRight: 12,
    },
})


const Navigation = ({navigation}) => {
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
                        component={Home}
                        options={{headerShown: false}}
                        />
                    <Stack.Screen 
                        name="마이페이지"
                        component={MyPage}
                        options={{headerRight: () => (
                            <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Icon5 name='settings' size={22}/></View>
                                </View>
                            </View>
                        )}}
                        />
                    <Stack.Screen 
                        name="추가 정보 입력"
                        component={AddPage}
                        />
               </Stack.Navigator>
               
          )}
        </Tab.Screen>
          <Tab.Screen name="맘스톡" options={{tabBarIcon: ({color}) => (<Icon3 name='message-square' size={22} color={color}/>)}}>
          {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="맘스톡"
                        component={Talk}
                        options={{headerRight: () => (
                            <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Icon4 name='search1' size={22}/></View>
                                    <View style={styles.iconBox}><Icon name='bell-o' size={22}/></View>
                                    <View style={styles.iconBox}><Icon name='user-o' size={22}/></View>
                                </View>
                            </View>
                        )}}
                        />
                    <Stack.Screen 
                        name="TalkTab1Detail"
                        component={TalkTab1Detail}
                        options={{title: '',  headerRight: () => (
                            <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Icon5 name='refresh-cw' size={22}/></View>
                                    <View style={styles.iconBox}><Icon4 name='download' size={22}/></View>
                                </View>
                            </View>
                        )}}
                        />
                    <Stack.Screen 
                        name="총 예산"
                        component={Register}
                        options={{headerShown: false}}
                        />
                    <Stack.Screen 
                        name="맘스톡 서치"
                        component={TalkTab3Detail}
                        options={{title: ''}}
                        />
               </Stack.Navigator>   
            )}
          </Tab.Screen>
          <Tab.Screen name="D-280" component={Dday} options={{tabBarIcon: ({color}) => (<Icon name='calendar-o' size={22} color={color}/>)}}></Tab.Screen>
          <Tab.Screen name="출산" options={{tabBarIcon: ({color}) => (<Icon2 name='bag' size={22} color={color}/>)}}>
          {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="출산준비물"
                        component={Materials}
                        options={{
                            headerRight: ({navigation}) => (
                                <View style={styles.header}>
                                    <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                        <View style={styles.iconBox}><Icon5 name='refresh-cw' size={22}/></View>
                                        <View style={styles.iconBox}><Icon4 name='download' size={22}/></View>
                                        <View style={styles.iconBox}><Icon4 name='search1' size={22} onPress={()=>navigation.navigate('맘스톡 서치')}/></View>
                                        <View style={styles.iconBox}><Icon name='bell-o' size={22}/></View>
                                        <View style={styles.iconBox}><Icon name='user-o' size={22}/></View>
                                    </View>
                                </View>
                            ),
                          }}
                        />
                    <Stack.Screen 
                        name="총 예산"
                        component={Budget}
                    />
                    <Stack.Screen 
                        name="출산준비물 검색"
                        component={Budget}
                    />
               </Stack.Navigator>   
          )}
          </Tab.Screen>
          <Tab.Screen name="맘스정보" options={{tabBarIcon: ({color}) => (<Icon name='bullhorn' size={22} color={color}/>)}}>
          {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="맘스 정보"
                        component={Information}
                        options={{headerRight: () => (
                            <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Icon4 name='search1' size={22} onPress={()=>navigation.navigate('맘스톡 서치')}/></View>
                                    <View style={styles.iconBox}><Icon name='bell-o' size={22}/></View>
                                    <View style={styles.iconBox}><Icon name='user-o' size={22}/></View>
                                </View>
                            </View>
                        )}}
                        />
                    <Stack.Screen 
                        name="InformationTab1Detail"
                        component={InformationTab1Detail}
                        options={{title: '', headerRight: () => (
                            <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Icon3 name='share-2' size={22} onPress={()=>navigation.navigate('맘스톡 서치')}/></View>
                                    <View style={styles.iconBox}><Icon6 name='dots-three-vertical' size={22}/></View>
                                </View>
                            </View>
                        )}}
                    />
               </Stack.Navigator>   
          )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
  )
}

export default Navigation