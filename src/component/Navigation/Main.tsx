import React from 'react'
import { View, Text, StyleSheet, LogBox, TouchableOpacity, NavigatorIOS } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SubMain from './SubMain'
import AddPage from '../Default/AddPage'
import Talk from '../Talk/Main'
import Detail from './Detail'
import Talk1Tab1Detail from '../Talk/Tab1/Detail'
import Register from '../Talk/Register/Main'
import Inquiry from '../MyPage/Inquiry/Main'
import Notice from '../MyPage/Notice/Main'
import NoticeDetail from '../MyPage/Notice/NoticeDetail'
import Like from '../MyPage/Like/Main'
import Edit from '../MyPage/Edit/Main'
import Withdraw from '../MyPage/Withdraw/Main'
import Setting from '..//MyPage/Setting/Main'
import Block from '../MyPage/Setting/Block'
import Term1 from '../MyPage/Setting/Terms1'
import Term2 from '../MyPage/Setting/Terms2'
import InquiryDetail from '../MyPage/Inquiry/InquiryDetail'
import BrendSelect from '../Materials/Brend/Main'
import Login from '../Default/Login'
import Talk3Detail from '../Talk/Tab3/Tab3Detail'
import Apply from '../Talk/Tab3/Apply'
import Post from '../Talk/Tab3/Post'

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


            <Stack.Screen name="로그인 페이지" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="맘스톡" component={Talk} options={{title: '맘스톡'}}/>
            <Stack.Screen name="추가 정보 입력" component={AddPage} options={{title: '추가 정보 입력'}}/>
            <Stack.Screen name="Talk1Tab1Detail" component={Talk1Tab1Detail} options={{title: ''}}/>
            <Stack.Screen name="글쓰기" component={Register} options={{title: '', headerShown: false}} />
            <Stack.Screen name="1:1 문의" component={Inquiry} />
            <Stack.Screen name="문의 상세" component={InquiryDetail} />
            <Stack.Screen name="공지사항" component={Notice} />
            <Stack.Screen name="공지사항2" component={NoticeDetail} options={{title: '공지사항'}} />
            <Stack.Screen name="추천 게시물" component={Like} />
            <Stack.Screen name="내 정보 수정" component={Edit} />
            <Stack.Screen name="회원탈퇴" component={Withdraw} />
            <Stack.Screen name="브랜드 선택" component={BrendSelect} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="체험단 상세페이지" component={Talk3Detail} options={{title: ''}}/>
            <Stack.Screen name="신청 정보" component={Apply}  options={{title: '', headerShown: false}}/>
            <Stack.Screen name="주소 찾기" component={Post}  options={{title: ''}}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation