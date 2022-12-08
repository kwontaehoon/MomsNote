import React from 'react'
import { View, Text, StyleSheet, LogBox, TouchableOpacity, TextInput } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/AntDesign'
import SubMain from './SubMain'
import AddPage from '../Default/AddPage'
import Talk from '../Talk/Main'
import Detail from './Detail'
import Talk1Tab1Detail from '../Talk/Tab1/Detail'
import Talk1Register from '../Talk/Tab1/Register/Main'
import Inquiry from '../MyPage/Inquiry/Main'
import Notice from '../MyPage/Notice/Main'
import NoticeDetail from '../MyPage/Notice/NoticeDetail'
import Like from '../MyPage/Like/Main'
import Edit from '../MyPage/Edit/Main'
import Withdraw from '../MyPage/Withdraw/Main'
import Block from '../MyPage/Setting/Block'
import Term1 from '../MyPage/Setting/Terms1'
import Term2 from '../MyPage/Setting/Terms2'
import InquiryDetail from '../MyPage/Inquiry/InquiryDetail'
import BrendSelect from '../Materials/Brend/Main'
import Login from '../Default/Login'
import Talk3Detail from '../Talk/Tab3/Tab3Detail'
import Apply from '../Talk/Tab3/Apply'
import Post from '../Talk/Tab3/Post'
import Setting from '../MyPage/Setting/Main'
import TalkTab1Detail from '../Talk/Tab1/Detail'
import Search from '../Materials/Search/Main'
import Notice2 from '../Materials/Notice'
import Talk2Detail from '../Talk/Tab2/Tab2Detail'
import Talk2Register from '../Talk/Tab2/Register/Main'
import Categoires from '../Talk/Tab2/Register/Categoires'

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
        
    },
    searchBox:{
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: '80%',
        marginRight: 16,
        flexDirection: 'row',
        borderRadius: 4
    },
    iconBox2:{
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputBox:{
        width: '85%',
    }
    
})


const Navigation = () => {
    const Stack = createStackNavigator();
  
    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="main" component={SubMain} options={{headerShown: false}}/>


            <Stack.Screen name="로그인 페이지" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="맘스톡" component={Talk} options={{title: '맘스톡'}}/>
            <Stack.Screen name="추가 정보 입력" component={AddPage} options={{title: '추가 정보 입력'}}/>
            <Stack.Screen name="글쓰기" component={Talk1Register} options={{title: '', headerShown: false}} />
            <Stack.Screen name="1:1 문의" component={Inquiry} />
            <Stack.Screen name="문의 상세" component={InquiryDetail} />
            <Stack.Screen name="공지사항" component={Notice} />
            <Stack.Screen name="공지사항2" component={NoticeDetail} options={{title: '공지사항'}} />
            <Stack.Screen name="추천 게시물" component={Like} />
            <Stack.Screen name="내 정보 수정" component={Edit} />
            <Stack.Screen name="회원탈퇴" component={Withdraw} />
            <Stack.Screen name="브랜드 선택" component={BrendSelect} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="체험단 상세페이지" component={Talk3Detail} options={{title: ''}}/>
            <Stack.Screen name="출산리스트 공유 상세내용" component={Talk2Detail} options={{title: ''}}/>
            <Stack.Screen name="출산리스트 공유 등록" component={Talk2Register} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="출산리스트" component={Categoires}/>
            <Stack.Screen name="신청 정보" component={Apply}  options={{title: '', headerShown: false}}/>
            <Stack.Screen name="주소 찾기" component={Post}  options={{title: ''}}/>
            <Stack.Screen name="설정" component={Setting}/>
            <Stack.Screen name="차단한 사용자" component={Block}/>
            <Stack.Screen name="이용약관" component={Term1}/>
            <Stack.Screen name="개인정보처리방침" component={Term2}/>
            <Stack.Screen name="맘스토크 상세내용" component={Talk1Tab1Detail}
                            options={{title: '', headerRight: () => (
                            <View style={styles.header}>
                                <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                    <View style={styles.iconBox}><Icon2 name='share-social-outline' size={22}/></View>
                                    <View style={styles.iconBox}><Icon3 name='dots-three-vertical' size={20}/></View>
                                </View>
                            </View>
                        )}}/>
            <Stack.Screen name="출산준비물 검색" component={Search}
                            options={{title: '', headerRight: () => (
                                <View style={styles.searchBox}>
                                    <View style={styles.iconBox2}><Icon4 name='search1' size={16} style={{color: '#424242'}}/></View>
                                    <TextInput style={styles.textInputBox} placeholder='검색하실 단어를 입력해주세요.'></TextInput>
                                </View>
                            )}}/>
            <Stack.Screen name="출산준비물 알림" component={Notice2} options={{title: '알림'}}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation