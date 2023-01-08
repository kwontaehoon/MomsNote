import React from 'react'
import { View, Text, StyleSheet, LogBox, TouchableOpacity, TextInput } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Icon5 from 'react-native-vector-icons/Feather'
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
import Login from '../Default/Login'
import Talk3Detail from '../Talk/Tab3/Tab3Detail'
import Apply from '../Talk/Tab3/Apply'
import Post from '../Talk/Tab3/Post'
import Setting from '../MyPage/Setting/Main'
import Search from '../Navigation/Search'
import MaterialSearch from '../Materials/Search/Search'
import Talk2Detail from '../Talk/Tab2/Tab2Detail'
import Talk2Register from '../Talk/Tab2/Register/Main'
import MaterialList from '../Talk/Tab2/Register/MaterialList'
import Initial from '../Default/Main'
import Budget from '../Materials/Budget/Main'
import KakaoWebView from '../Default/KakaoWebView'
import DdayDetail from '../Dday/Tab1/Detail'
import DdayDetail2 from '../Dday/Tab2/Detail'
import Experience from '../MyPage/Experience/Main'
import Info2Detail from '../Information/Tab2/Detail'
import MyPage from '../MyPage/Main'
import Alarm from '../Navigation/Alarm'
import Compare from '../Talk/Tab2/Compare'
import Gallery from '../Modal/Gallery'
import Government from '../Information/Tab3/Detail'
import GuideDetail from '../Information/Tab1/Detail'
import ReduxTest2 from '../Test/ReduxTest2'
import MomsSearchDetail from '../Navigation/SearchTab/MomsTalk'
import MaterialDetail from '../Navigation/SearchTab/Material'
import CommentDetail from '../Navigation/SearchTab/Comment'
import ExperienceDetail from '../Navigation/SearchTab/Expreience'


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
            <Stack.Navigator initialRouteName='초기접근'>
            <Stack.Screen name="초기접근" component={Initial} options={{headerShown: false}}/>

            <Stack.Screen name="main" component={SubMain} options={{headerShown: false}}/>

            <Stack.Screen name="카카오 로그인" component={KakaoWebView} options={{headerShown: false}}/>


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
            <Stack.Screen name="체험단 상세페이지" component={Talk3Detail} options={{title: ''}}/>
            <Stack.Screen name="출산리스트 공유 상세내용" component={Talk2Detail} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="출산리스트 공유 등록" component={Talk2Register} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="출산리스트 비교" component={Compare}/>
            <Stack.Screen name="출산리스트" component={MaterialList}/>
            <Stack.Screen name="신청 정보" component={Apply}  options={{title: '', headerShown: false}}/>
            <Stack.Screen name="주소 찾기" component={Post}  options={{title: ''}}/>
            <Stack.Screen name="설정" component={Setting}/>
            <Stack.Screen name="차단한 사용자" component={Block}/>
            <Stack.Screen name="이용약관" component={Term1}/>
            <Stack.Screen name="개인정보처리방침" component={Term2}/>
            <Stack.Screen name="맘스토크 상세내용" component={Talk1Tab1Detail} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="맘스가이드 상세내용" component={GuideDetail} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="정부지원혜택 상세내용" component={Government} options={{title: '', headerShown: false}}/>

            <Stack.Screen name="검색" component={Search} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="출산 준비물 검색" component={MaterialSearch} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="알림" component={Alarm}/>
            <Stack.Screen name="총 예산" component={Budget}/>
            <Stack.Screen name="오늘의편지 상세페이지" component={DdayDetail} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="이시기에는 상세페이지" component={DdayDetail2} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="신청한 체험단" component={Experience}/>
            <Stack.Screen name="행사정보 상세페이지" component={Info2Detail} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="마이페이지" component={MyPage}
                            options={({ navigation, route }) => ({
                                headerRight: () => (
                                    <View style={styles.header}>
                                        <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
                                            <View style={styles.iconBox}><Icon5 name='settings' size={22} onPress={()=>navigation.navigate('설정')}/></View>
                                        </View>
                                    </View>
                                ),
                            })}/>
            <Stack.Screen name="갤러리" component={Gallery} options={{title: '', headerShown: false}}/>
            <Stack.Screen name="리덕스 테스트2" component={ReduxTest2} />

            <Stack.Screen name="맘스 톡 서치" component={MomsSearchDetail} options={{title: '맘스 톡 전체'}}/>
            <Stack.Screen name="출산준비물 공유 서치" component={MaterialDetail} options={{title: '출산리스트 공유 전체'}}/>
            <Stack.Screen name="댓글 서치" component={CommentDetail} options={{title: '댓글 전체'}}/>
            <Stack.Screen name="체험단 서치" component={ExperienceDetail} options={{title: '체험단 전체'}}/>

        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation