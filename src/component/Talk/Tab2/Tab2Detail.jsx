import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Animated, ScrollView, Keyboard, SafeAreaView, StatusBar } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Modal from '../../Modal/DotModal'
import Modal2 from '../../Modal/Block'
import Modal3 from '../..//Modal/Declare'
import Modal4 from '../..//Modal/DelareConfirm'
import Modal6 from '../../Modal/Declare2'
import moment from 'moment'
import { Video, AVPlaybackStatus } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux'
import { postBoard } from '../../../Redux/Slices/BoardSlice'
import { postComment } from '../../../Redux/Slices/CommentSlice'
import { postCommentFlag } from '../../../Redux/Slices/CommentFlag'
import { postCommentRecommend } from '../../../Redux/Slices/CommentRecommendSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';

import Comment from './Comment'
import axios from 'axios'

import Icon from 'react-native-vector-icons/FontAwesome'
import Chat from '../../../../public/assets/svg/Chat.svg'
import Like from '../../../../public/assets/svg/Like.svg'
import Like2 from '../../../../public/assets/svg/Heart-1.svg'
import Back from '../../../../public/assets/svg/Back.svg'
import More from '../../../../public/assets/svg/More.svg'
import Share from '../../../../public/assets/svg/Share.svg'
import Close from '../../../../public/assets/svg/Close.svg'
import { postShareList } from '../../../Redux/Slices/ShareListSlice'
import { postHits } from '../../../Redux/Slices/HitsSlice'
import { useIsFocused } from '@react-navigation/native'

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
    },
    header:{
        height: 60,
        justifyContent: 'center',
        padding: 20,
    },
    headerBar:{
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    header2:{
        flexDirection: 'row',
        height: 70,
        alignItems: 'flex-end',
        paddingLeft: 20,
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
    },
    profileBox:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
    },
    infoBox:{
        height: 42,
        marginLeft: 7,
    },
    main:{
    },
    mainBox:{
        height: 70,
        padding: 20,
    },
    mainBox2:{
        padding: 20,
    },
    listBox:{
        height: 400,
    },
    listHeader:{
        height: 40,
        backgroundColor: '#F47A79',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listMain:{
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        paddingLeft: 15,
        paddingRight: 15
    },
    listMain2:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#F5F5F5'
    },
    filterBox:{
        width: '33.4%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterBox2:{
        width: '33.4%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    arrowBox:{
        position: 'absolute',
        right: 15,
    },
    sum:{
        height: 130,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#EEEEEE',
        justifyContent: 'center',
    },
    myList2FooterBox:{
        height: 50,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    budget:{
        position: 'absolute',
        right: 15,
    },
    compare:{
        alignItems: 'center',
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#EEEEEE',
        height: 70,
    },
    compareButton:{
        borderRadius: 4,
        backgroundColor: '#FEA100',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 50,
    },
    mainBox3:{
        height: 50,
        flexDirection: 'row',
        borderColor: '#F5F5F5',
        borderWidth: 1,
        paddingLeft: 20,
        alignItems: 'center'
    },
    likeBox:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    lookupBox:{
        position: 'absolute',
        right: 20,
    },
    mainBox4:{
        padding: 10,
    },
    commentRes:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        paddingLeft: 15,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    closeBox:{
        position: 'absolute',
        right: 15,
    },
    footer:{
        width: '100%',
        height: 60,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 1,
    },
    regisButton:{
        position: 'absolute',
        right: '8%',
        top: 22,
        zIndex: 999,
    },
    textInput:{
        borderRadius: 99,
        width: '80%',
        height: 40,
        marginLeft: 12,
        paddingLeft: 12,
        backgroundColor: '#F5F5F5'
    },
    alarmBox:{
        width: '100%',
        height: 40,
        bottom: 90,
        position: 'absolute',
        alignItems: 'center',
        zIndex: 999,
    },
    alarm:{
        width: '90%',
        height: '100%',
        borderRadius: 5,
        paddingLeft: 15,
        justifyContent: 'center',
        backgroundColor: 'black',
    }
})
const Talk1Sub = ({navigation, route}) => {

    Keyboard.addListener('keyboardDidShow', () => {
        setPageHeight(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
        setPageHeight(false);
    });

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const DATA2 =[
        {
          id: '0',
          title: '산모용품',
          icon: require('../../../../public/assets/image/1.png'),
        },
        {
          id: '1',
          title: '수유용품',
          icon: require('../../../../public/assets/image/2.png'),
        },
        {
          id: '2',
          title: '위생용품',
          icon: require('../../../../public/assets/image/3.png'),
        },
        {
          id: '3',
          title: '목욕용품',
          icon: require('../../../../public/assets/image/4.png'),
        },
        {
          id: '4',
          title: '침구류',
          icon: require('../../../../public/assets/image/5.png'),
        },
        {
          id: '5',
          title: '아기의류',
          color: '#FFADAD',
          icon: require('../../../../public/assets/image/6.png'),
        },
        {
          id: '6',
          title: '외출용품',
          icon: require('../../../../public/assets/image/7.png'),
        },
        {
          id: '7',
          title: '가전용품',
          color: '#FFADAD',
          icon: require('../../../../public/assets/image/8.png'),
        },
        {
          id: '8',
          title: '놀이용품',
          icon: require('../../../../public/assets/image/9.png'),
        },
    ];

    const dispatch = useDispatch();
    const info = [route.params];
    console.log('출산리스트 route: ', info);
    const info2 = useSelector(state => { return state.shareList.data }); // 게시글 리스트
    console.log('출산리스트 info : ', info2);

    const [pageHeight, setPageHeight] = useState(false); // 키보드 나옴에따라 높낮이 설정
    const comment = useSelector(state => { return state.comment.data; });
    const [commentsId, setCommentsId] = useState([undefined, undefined]); // 댓글 더보기에서 commentid 때매만듬
    const [insert, setInsert] = useState(
        {
            boardId: info[0].boardId,
            contents: '',
            ref: 1,
            level: 0
        }
    ); // 댓글 입력
    console.log('insert: ', insert);
    const [list, setList] = useState(Array.from({length: 9}, () => {return true})); // list display
    const [boardLike, setBoardLike] = useState(); // 게시판 좋아요
    const [boardData, setBoardData] = useState({
        order: 'new',
        count: 1,
        page: 1,
        subcategory: '전체'
    });
    const [commentData, setCommentData] = useState({
        boardId: info[0].boardId,
        count: 1,
        page: 1
    });

    const [modal, setModal] = useState(false); // dot 모달 다른사람게시판 차단 및 신고
    const [modal2, setModal2] = useState(false); // 차단하기
    const [modal3, setModal3] = useState(false); // 게시물 신고 하기 
    const [modal4, setModal4] = useState(false); // 신고 확인
    const [modal6, setModal6] = useState(false); // comment 신고 하기 

    const [userInfo, setUserInfo] = useState();

    const animation = useRef(new Animated.Value(0)).current;
    const flatlistRef = useRef(null);

    const [sumResult, setSumResult] = useState({
        sum: 0,
        exp: 0
    });

    useEffect(()=>{
        dispatch(postComment(commentData));
        dispatch(postCommentFlag({boardId: info[0].boardId}));
        dispatch(postShareList({boardId: info[0].boardId}));
        const user = async() => {
            const user = await AsyncStorage.getItem('user');
            setUserInfo(JSON.parse(user));
        }

        const hits = async() => {
            const hits = await AsyncStorage.getItem('hits');
            console.log('hits: ', hits);

            hits == null || hits.split('|').filter(x => x == String(info[0].boardId)) == '' ? 
            (dispatch(postHits({boardId: info[0].boardId})), AsyncStorage.setItem('hits', String(hits)+`|${info[0].boardId}`)) : ''
            
        }
        user();
        hits();
    }, []);

    useEffect(()=>{
        let sum = 0;
        let exp = 0;
    
        info2.filter(x=>{
          if(x.id == 0 && x.needsBrandId !== null){
            exp += x.itemPrice
          } else sum += x.itemPrice;
        });
        setSumResult(prevState => ({...prevState, sum: sum, exp: exp}));
      }, [info2]);

    useEffect(()=>{ // 게시물 추천 Flag
        console.log('게시물 추천 여부 업데이트');
        const likeInfo = async() => {
            const token = await AsyncStorage.getItem('token');
            try{
                const response = await axios({
                    method: 'post',
                    url: 'https://momsnote.net/api/board/recommend/flag',
                    headers: { 
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                      },
                    data: { boardId : info[0].boardId }
                });
                setBoardLike(response.data);
            }catch(error){
                console.log('like axios error');
            }
        }
        likeInfo();
    }, [boardLike]);

    const commentRegister = async() => { // 댓글 업데이트 필요
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({ 
                  method: 'post',
                  url: 'https://momsnote.net/api/comments/write',
                  headers: { 
                    'Authorization': `bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                  data: insert
                });
                console.log('response: ', response.data);
            }catch(error){
              console.log('댓글 작성 error: ', error);
            }
        dispatch(postBoard(boardData));
        dispatch(postComment(commentData));
        onPressFunction();
    }
    

    const likeplus = async() => { // 게시판 좋아요
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                  method: 'post',
                  url: 'https://momsnote.net/api/board/recommend',
                  headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                  data: {
                    boardId: info[0].boardId,
                    type: 'plus'
                  }
                });
                console.log('response: ', response.data);
                dispatch(postBoard(boardData));
            }catch(error){
              console.log('error: ', error);
            }
            setBoardLike();
    }

    const arrow = (e) => { // arrow 누르면 서브페이지 display
        let arr = [...list];
        arr[e] = !arr[e];
        setList(arr);
    }

    const filtering = (e) => { // 품목 브랜드 가격 부분 none || flex
        if(info2.filter(x => x.category == e) == ''){
          return(
            <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 16, color: '#9E9E9E'}}>검색 결과가 없습니다.</Text>
            </View>
          )
        }else return(
            <View style={styles.listMain2}>
                <View style={styles.filterBox}><Text>품목</Text></View>
                <View style={styles.filterBox}><Text>브랜드</Text></View>
                <View style={styles.filterBox}><Text>금액</Text></View>
            </View>
        )
      }

    const opacity_ani = () => {
        Animated.timing(animation, {
            toValue: 1,
            useNativeDriver: true,
            duration: 1500,
        }).start(()=>{
            Animated.timing(animation, {
                toValue: 0,
                useNativeDriver: true,
                duration: 1500,
            }).start();
        });
    }

    const onPressFunction = () => {
        flatlistRef.current?.scrollToEnd();
    };


    const List = () => {
        let arr = [];
        DATA2.map((x, index) => {
            arr.push(
                <>
                    <View style={styles.listMain} key={index}>
                        <TouchableOpacity style={styles.arrowBox}
                            onPress={()=>arrow(x.id)}>{list[x.id] ? <Icon name="angle-up" size={22}/> : <Icon name='angle-down' size={22}/>}
                        </TouchableOpacity>
                        <Image source={x.icon} width={20} height={20}/>
                        <Text style={{fontSize: 15}}> {x.title}</Text>
                    </View>
                    <View style={{display: list[index] ? 'flex' : 'none'}}>
                        {filtering(x.title)}
                        <List2 title={x.title}/>
                    </View>
                </>
            )
        })
        return arr;
    }

    const List2 = (e) => {
        let arr = [];
        info2.filter((x, index)=>{
            if(x.category == e.title){
                arr.push(
                     <View style={styles.listMain2} key={index}>
                        <View style={styles.filterBox2}><Text>{x.needsName}</Text></View>
                        <View style={styles.filterBox2}><Text>{x.itemName}</Text></View>
                        <View style={styles.filterBox2}>
                            <Text style={{fontWeight: '600'}}>{(x.itemPrice).toLocaleString()}</Text>
                            <Text> 원</Text>
                        </View>
                    </View>
                )
            }
        })
        return arr;
    }


    const renderItem = ({ item }) => (
        <View>
            <View style={styles.header2}>
                <TouchableOpacity style={styles.profileBox}></TouchableOpacity>
                <View style={styles.infoBox}>
                    <Text style={{color: '#212121', fontSize: 16, fontWeight: '500'}}>{info[0].nickname}</Text>
                    <Text style={{color: '#9E9E9E', fontSize: 13}}>{moment().diff(moment(info[0].boardDate), "days")}일 전</Text>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 20, fontWeight: '400'}}>{info[0].title}</Text>
                </View>

                <View style={styles.mainBox2}>
                    <Text>{info[0].contents}</Text>
                </View>

                <View style={styles.listHeader}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>{route.params.nickname}</Text>
                            <Text style={{fontSize: 15, color: 'white'}}> 님의 출산준비물</Text>
                        </View>
                </View>

                <ScrollView style={styles.listBox} nestedScrollEnabled={true}>
                        <List />
                </ScrollView>

                <View style={styles.sum}>
                    <View style={styles.myList2FooterBox}>
                        <View style={styles.budget}><Text style={{fontSize: 18, fontWeight: '600'}}>{(sumResult.sum + sumResult.exp).toLocaleString()} 원</Text></View>
                        <Text style={{fontSize: 18, fontWeight: '600'}}>총 예산</Text>
                    </View>
                    <View style={[styles.myList2FooterBox, {paddingLeft: 20, height: 25}]}>
                        <View style={styles.budget}><Text>{(sumResult.sum).toLocaleString()} 원</Text></View>
                        <Text style={{color: '#616161'}}>ㄴ 구매금액</Text>
                    </View>
                    <View style={[styles.myList2FooterBox, {paddingLeft: 20, height: 25}]}>
                        <View style={styles.budget}><Text>{(sumResult.exp).toLocaleString()} 원</Text></View>
                        <Text style={{color: '#616161'}}>ㄴ 구매예정 금액</Text>
                    </View>
                </View>
                <View style={styles.compare}>
                    <TouchableOpacity style={styles.compareButton} onPress={()=>navigation.navigate('출산리스트 비교', route.params)}>
                        <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>내 출산리스트와 비교하기</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mainBox3}>
                    <View style={styles.likeBox}>
                        {boardLike == 0 | boardLike == undefined ? <Like width={16} height={16} fill='#9E9E9E' onPress={likeplus}/> : <Like2 width={16} height={16} fill='#FE9000'/>}
                        <Text style={{color: boardLike == 0 ? '#9E9E9E' : '#FE9000', fontSize: 13, paddingRight: 10}}> 추천 { info[0].recommend }</Text>
                        <Chat width={16} height={16}/>
                        <Text style={{color: '#9E9E9E', fontSize: 13}}> 댓글 {info[0].commentsCount}</Text>
                    </View>
                    <View style={styles.lookupBox}>
                        <Text style={{fontSize: 13, color: '#9E9E9E'}}>조회수 {info[0].hits}</Text>
                    </View>
                </View>
                <View style={styles.mainBox4}>
                    {comment.length == 0 ?
                    <View style={{alignItems: 'center', justifyContent: 'center', height: 200}}>
                        <Text style={{color: '#757575', fontSize: 15}}>아직 댓글이 없습니다.</Text>
                        <Text style={{color: '#757575', fontSize: 15}}>먼저 댓글을 남겨 소통을 시작해보세요!</Text>
                    </View> : <Comment info={comment} setCommentsId={setCommentsId} setInsert={setInsert} modal={modal} setModal={setModal} commentData={commentData}/>}
                </View>
            </View>
        </View>
      );


  return info2 == undefined || userInfo == undefined ? <View><Text>gg</Text></View> : (
    <SafeAreaProvider>
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <StatusBar />
        </SafeAreaView>

        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.alarmBox, {opacity: animation}]}>
                <View style={styles.alarm}><Text style={{color: 'white', fontSize: 13, fontWeight: '500'}}>{info[0].nickname}님을 차단하였습니다.</Text></View>
            </Animated.View>

            <Modal navigation={navigation} modal={modal} setModal={setModal} modal2={modal2} setModal2={setModal2} modal3={modal3} setModal3={setModal3} commentsId={commentsId} info={info}
                modal6={modal6} setModal6={setModal6} commentData={commentData}/>
            <Modal2 modal2={modal2} setModal2={setModal2} userId={info[0].userId} ani={opacity_ani}/>
            <Modal3 modal3={modal3} setModal3={setModal3} modal4={modal4} setModal4={setModal4} boardId={info[0].boardId}/>
            <Modal4 modal4={modal4} setModal4={setModal4} />
            <Modal6 modal4={modal4} setModal4={setModal4} modal6={modal6} setModal6={setModal6} commentsId={commentsId}/>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}><Back /></TouchableOpacity>
                    <View style={styles.headerBar}>
                        <Share style={{marginRight: 12}}/>
                        <More onPress={()=>{setModal(!modal), setCommentsId([undefined, undefined])}}/>
                    </View>
            </View>

            <FlatList ref={flatlistRef} data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false}
                keyExtractor={item => String(item.boardId)}>
            </FlatList>

            <View style={[styles.commentRes, {display: insert.level === 0 ? 'none' : 'flex'}]}>
                <View style={styles.closeBox}><Close width={20} fill='#757575' onPress={()=>setInsert((prevState) => ({...prevState, level: 0}))}/></View>
                <Text style={{fontSize: 15}}>{commentsId}</Text>
                <Text style={{color: '#757575'}}> 님에게 답변 남기기</Text>
            </View>
            <View style={styles.footer}>
                <Image source={{ uri: userInfo.profileImage }} style={styles.profileBox}/>
                <TouchableOpacity style={[styles.regisButton, {display: insert.contents === '' ? 'none' : 'flex'}]} onPress={()=>{Keyboard.dismiss(), commentRegister(), setInsert((prevState) => ({...prevState, contents: '', level: 0}))}}>
                    <Text style={{color: '#1E88E5', fontWeight: '600'}}>등록</Text>
                </TouchableOpacity>
                <TextInput style={styles.textInput} value={insert.contents} placeholder='댓글을 입력해주세요.' onChangeText={
                    (e)=> insert.level !== 0 ? setInsert((prevState) => ({...prevState, contents: e})) :
                    setInsert((prevState) => ({...prevState,
                        boardId: info[0].boardId,
                        contents: e,
                        ref: comment.length+1,
                        level: 0}))} placeholderTextColor={'#BDBDBD'}></TextInput>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Talk1Sub