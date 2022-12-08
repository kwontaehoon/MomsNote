import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import {View, Button, Text, StyleSheet} from 'react-native';
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
import MyPage from '../MyPage/Main'
import Video from '../Test/Video'
import ImagePicker from '../Test/ImagePicker'
import FlatList from '../Test/FlateList'
import DropDown from '../Test/DropDown'
import Animation from '../Test/animation'
import Animation2 from '../Test/animation2'

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
    <Tab.Navigator initialRouteName='홈' screenOptions={{ headerShown: false, tabBarStyle:{ height: 60, position: 'absolute', paddingBottom: 7}, tabBarActiveTintColor: '#fb8c00', tabBarLabelStyle: {fontSize: 12}}}>
      <Tab.Screen name="맘스 톡" options={{tabBarIcon: ({color}) => (<Icon3 name='message-square' size={22} color={color}/>)}}>
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
               </Stack.Navigator>   
            )}
          </Tab.Screen>

          <Tab.Screen name="Dday" options={{tabBarIcon: ({color}) => (<Icon name='calendar-o' size={22} color={color}/>)}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="D-280"
                        component={Dday}
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
               </Stack.Navigator>   
        )}
      </Tab.Screen>

      <Tab.Screen name="홈" options={{tabBarIcon: ({color}) => (<Icon2 name='home' size={22} color={color}/>)}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="Home"
                        component={Animation2}
                        options={({ navigation, route }) => ({
                            title: '',
                            headerStyle:{backgroundColor: '#FEECB3'},
                            headerRight: () => (
                                <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Icon name='bell-o' size={22} onPress={()=>navigation.navigate('추가 정보 입력')}/></View>
                                    <View style={styles.iconBox}><Icon name='user-o' size={22} onPress={()=>navigation.navigate('마이페이지')}/></View>
                                </View>
                            </View>
                            ),
                          })}
                        />
                    <Stack.Screen 
                        name="마이페이지"
                        component={MyPage}
                        options={({ navigation, route }) => ({
                            headerRight: () => (
                                <View style={styles.header}>
                                    <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                        <View style={styles.iconBox}><Icon5 name='settings' size={22} onPress={()=>navigation.navigate('설정')}/></View>
                                    </View>
                                </View>
                            ),
                          })}
                        />
               </Stack.Navigator>
               
          )}
        </Tab.Screen>
       

      

      <Tab.Screen name="출산" options={{tabBarIcon: ({color}) => (<Icon2 name='bag' size={22} color={color}/>)}}>
      {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="출산준비물"
                        component={Materials}
                        options={({ navigation, route }) => ({
                            headerRight: () => (
                                <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Icon5 name='refresh-cw' size={22}/></View>
                                    <View style={styles.iconBox}><Icon4 name='download' size={22}/></View>
                                    <View style={styles.iconBox}><Icon4 name='search1' size={22} onPress={()=>navigation.navigate('출산준비물 검색')}/></View>
                                    <View style={styles.iconBox}><Icon name='bell-o' size={22} onPress={()=>navigation.navigate('출산준비물 알림')}/></View>
                                    <View style={styles.iconBox}><Icon name='user-o' size={22}/></View>
                                </View>
                            </View>
                            ),
                          })}
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