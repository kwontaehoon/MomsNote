import React from 'react'
import { View, Text, StyleSheet, LogBox, TouchableOpacity, NavigatorIOS } from 'react-native'
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
import Categories from '../Talk/Register/Categories'
import Apply from '../Talk/Tab3/Apply'
import MyPage from '../MyPage/Main'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/AntDesign'
import Icon5 from 'react-native-vector-icons/Feather'
import Icon6 from 'react-native-vector-icons/Entypo'
import Register from '../Talk/Register/Main';
import Inquiry from '../MyPage/Inquiry/Main';
import Notice from '../MyPage/Notice/Main'
import NoticeDetail from '../MyPage/Notice/NoticeDetail';
import Like from '../MyPage/Like/Main'
import Edit from '../MyPage/Edit/Main'
import Withdraw from '../MyPage/Withdraw/Main'
import Setting from '..//MyPage/Setting/Main'
import Block from '../MyPage/Setting/Block'
import Term1 from '../MyPage/Setting/Terms1'
import Term2 from '../MyPage/Setting/Terms2'
import ImagePicker from '../Default/ImagePicker'
import DateTime from  '../Default/DateTime'
import Picker from '../Default/Picker'
import Modal from '../Default/Modal'
import Slide from '../Default/Slide'


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

    header2:{
        width: 300,
        borderWidth: 1,
        height: 50,
        
    }
})


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
                        component={Slide}
                        options={({ navigation, route }) => ({
                            title: '',
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
                    <Stack.Screen 
                        name="추가 정보 입력"
                        component={AddPage}
                    />
                    <Stack.Screen 
                        name="1:1 문의"
                        component={Inquiry}
                    />
                    <Stack.Screen 
                        name="공지사항"
                        component={Notice}
                    />
                    <Stack.Screen 
                        name="공지사항2"
                        component={NoticeDetail}
                        options={{title: '공지사항'}}
                    />
                    <Stack.Screen 
                        name="추천 게시물"
                        component={Like}
                    />
                    <Stack.Screen 
                        name="내 정보 수정"
                        component={Edit}
                    />
                     <Stack.Screen 
                        name="회원탈퇴"
                        component={Withdraw}
                    />
                    <Stack.Screen 
                        name="설정"
                        component={Setting}
                    />
                    <Stack.Screen 
                        name="차단한 사용자"
                        component={Block}
                    />
                    <Stack.Screen 
                        name="이용약관"
                        component={Term1}
                    />
                    <Stack.Screen 
                        name="개인정보처리방침"
                        component={Term2}
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
                        options={{headerShown: false}}/>
                    <Stack.Screen 
                        name="맘스톡 서치"
                        component={TalkTab3Detail}
                        options={{title: ''}}/>
                    <Stack.Screen 
                        name="카테고리 선택"
                        component={Categories}/>
                    <Stack.Screen 
                        name="체험단 상세페이지"
                        component={TalkTab3Detail}
                        options={{title: ''}}/>
                    <Stack.Screen 
                        name="신청 정보"
                        component={Apply}
                        options={{title: '', headerShown: false}}/>
               </Stack.Navigator>   
            )}
          </Tab.Screen>
          <Tab.Screen name="D-280" options={{tabBarIcon: ({color}) => (<Icon name='calendar-o' size={22} color={color}/>)}}>
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
                                    <View style={styles.iconBox}><Icon name='bell-o' size={22}/></View>
                                    <View style={styles.iconBox}><Icon name='user-o' size={22}/></View>
                                </View>
                            </View>
                            ),
                          })}
                        />
                    <Stack.Screen 
                        name="총 예산"
                        component={Budget}
                    />
                    <Stack.Screen 
                        name="출산준비물 검색"
                        component={Budget}
                        options={{title:'', headerTitle: () => (
                            <View style={styles.header2}>
                                
                            </View>
                        )}}
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