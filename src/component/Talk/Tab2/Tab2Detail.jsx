import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Animated, ScrollView, Keyboard, SafeAreaView, StatusBar, Share, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Modal from '../../Modal/DotModal'
import Modal2 from '../../Modal/Block'
import Modal3 from '../..//Modal/Declare'
import Modal4 from '../..//Modal/DelareConfirm'
import Modal6 from '../../Modal/Declare2'
import Modal7 from '../../Modal/CommentDelete'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { postBoard } from '../../../Redux/Slices/BoardSlice'
import { postComment } from '../../../Redux/Slices/CommentSlice'
import { postCommentFlag } from '../../../Redux/Slices/CommentFlag'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    SafeAreaProvider,
  } from 'react-native-safe-area-context';

import Comment from './Comment'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'

import M1 from '../../../../public/assets/svg/1.svg'
import M2 from '../../../../public/assets/svg/2.svg'
import M3 from '../../../../public/assets/svg/3.svg'
import M4 from '../../../../public/assets/svg/4.svg'
import M5 from '../../../../public/assets/svg/5.svg'
import M6 from '../../../../public/assets/svg/6.svg'
import M7 from '../../../../public/assets/svg/7.svg'
import M8 from '../../../../public/assets/svg/8.svg'
import M9 from '../../../../public/assets/svg/9.svg'
import Icon from 'react-native-vector-icons/FontAwesome'
import Chat from '../../../../public/assets/svg/Chat.svg'
import Like from '../../../../public/assets/svg/Like.svg'
import Like2 from '../../../../public/assets/svg/Heart-1.svg'
import Back from '../../../../public/assets/svg/Back.svg'
import More from '../../../../public/assets/svg/More.svg'
import Share2 from '../../../../public/assets/svg/Share.svg'
import Close from '../../../../public/assets/svg/Close.svg'
import { postShareList } from '../../../Redux/Slices/ShareListSlice'
import { postHits } from '../../../Redux/Slices/HitsSlice'
import { postMaterialShare } from '../../../Redux/Slices/MaterialShareSlice'
import { postUser } from '../../../Redux/Slices/UserSlice'
import CoarchMark from './Modal/CoarchMark'

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
    },
    infoBox:{
        height: 42,
        marginLeft: 7,
    },
    main:{
    },
    mainBox:{
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
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
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

    console.log('## talk2 route: ', route.params);

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
        },
        {
          id: '1',
          title: '수유용품',
        },
        {
          id: '2',
          title: '위생용품',
        },
        {
          id: '3',
          title: '목욕용품',
        },
        {
          id: '4',
          title: '침구류',
        },
        {
          id: '5',
          title: '아기의류',
          color: '#FFADAD',
        },
        {
          id: '6',
          title: '외출용품',
        },
        {
          id: '7',
          title: '가전용품',
          color: '#FFADAD',
        },
        {
          id: '8',
          title: '놀이용품',
        },
    ];

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const info = [route.params];
    console.log('## 출산리스트 route: ', info, info[0].boardId);
    const info2 = useSelector(state => { return state.shareList.data }); // 게시글 리스트
    console.log('## info2: ', info2);
    const materialShare = useSelector(state => { return state.materialShare.data });
    const materialShareSet = useSelector(state => { return state.materialShare.refresh });
    const [info3, setInfo3] = useState(useSelector(state => { return state.materialShare.data }));
    console.log('## info3: ', info3);

    const user = useSelector(state => { return state.user.data; });

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
    const [modal7, setModal7] = useState(false); // comment 삭제모달

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
        dispatch(postMaterialShare(materialShareSet));
        dispatch(postUser());

        const hits = async() => {
            const hits = await AsyncStorage.getItem('hits');

            hits == null || hits.split('|').filter(x => x == String(info[0].boardId)) == '' ? 
            (dispatch(postHits({boardId: info[0].boardId})), AsyncStorage.setItem('hits', String(hits)+`|${info[0].boardId}`)) : ''
        }

   

        hits();
    }, [isFocused]);

    useEffect(()=>{
        if(materialShare !== '' && materialShare !== '0'){
            setInfo3(materialShare.filter(x => x.boardId == info[0].boardId));
        }
    }, [materialShare, isFocused]);

    useEffect(()=>{
        const arr = DATA2.map(x=>{
            if((info2.filter(y => (x.title == y.category && y.buyStatus == 1)).length !== 0)){
                return true;
            }else return false;
        }); 
        setList(arr);
    }, [info2]);

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
            }catch(error){
              console.log('출산 리스트 댓글 작성 error: ', error);
            }
        dispatch(postMaterialShare(materialShareSet));
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
                dispatch(postMaterialShare(materialShareSet));
                setBoardLike();
            }catch(error){
              console.log('출산 리스트 좋아요 error: ', error);
            }
    }

    const likeminus = async() => { // 게시판 좋아요 취소

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
                    type: 'minus'
                  }
                });
                dispatch(postMaterialShare(materialShareSet));
                setBoardLike();
            }catch(error){
              console.log('출산 리스트 좋아요 error: ', error);
            }
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
                <Text style={{fontSize: 16, color: '#9E9E9E'}}>선택된 품목이 없습니다.</Text>
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

      const dayCalculate = (date:number) => {
        switch(true){
          case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
          case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
          default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment(date).format('YY.MM.DD')}</Text>
        }
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

    const SVGSelect = (e) => {
        switch(e){
            case 0: return(<M1 />) 
            case 1: return(<M2 />) 
            case 2: return(<M3 />) 
            case 3: return(<M4 />) 
            case 4: return(<M5 />) 
            case 5: return(<M6 />) 
            case 6: return(<M7 />) 
            case 7: return(<M8 />) 
            case 8: return(<M9 />) 
        }
    }

    const socialShare = () => {
        Share.share({
            message: `[맘스노트] ${info3[0].title}`,
        })
    }


    const List = () => {
        let arr = [];
        DATA2.map((x, index) => {
            arr.push(
                <>
                    <View style={styles.listMain} key={index}>
                        <TouchableOpacity style={styles.arrowBox}
                            onPress={()=>arrow(x.id)}>{list[x.id] ? <Icon name="angle-up" size={22}/> : <Icon name='angle-down' size={22}/>}
                        </TouchableOpacity>
                        {SVGSelect(index)}
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
            console.log('##', x.itemPrice);
            if(x.category == e.title && x.buyStatus == 1){
                arr.push(
                     <View style={styles.listMain2} key={index}>
                        <View style={styles.filterBox2}><Text>{x.needsName}</Text></View>
                        <View style={styles.filterBox2}><Text>{x.itemBrand}</Text></View>
                        <View style={styles.filterBox2}>
                            <Text style={{fontWeight: '600'}}>{(x.itemPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
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
                <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/profile/${info[0].profileImage}`}} style={styles.profileBox}/>
                <View style={styles.infoBox}>
                    <Text style={{color: '#212121', fontSize: 16, fontWeight: '500'}}>{info[0].nickname}</Text>
                    <Text style={{color: '#9E9E9E', fontSize: 13}}>{dayCalculate(info[0].boardDate)}</Text>
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
                        <View style={styles.budget}><Text style={{fontSize: 18, fontWeight: '600'}}>{(sumResult.sum + sumResult.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</Text></View>
                        <Text style={{fontSize: 18, fontWeight: '600'}}>총 예산</Text>
                    </View>
                    <View style={[styles.myList2FooterBox, {paddingLeft: 20, height: 25}]}>
                        <View style={styles.budget}><Text>{(sumResult.sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</Text></View>
                        <Text style={{color: '#616161'}}>ㄴ 구매금액</Text>
                    </View>
                    <View style={[styles.myList2FooterBox, {paddingLeft: 20, height: 25}]}>
                        <View style={styles.budget}><Text>{(sumResult.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</Text></View>
                        <Text style={{color: '#616161'}}>ㄴ 구매예정 금액</Text>
                    </View>
                </View>
                {info[0].nickname == user.nickname ? '' :
                    <View style={styles.compare}>
                        <TouchableOpacity style={styles.compareButton} onPress={()=>navigation.navigate('출산리스트 비교', route.params)}>
                            <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>내 출산리스트와 비교하기</Text>
                        </TouchableOpacity>
                    </View>}

                <View style={styles.mainBox3}>
                    <View style={styles.likeBox}>
                        {boardLike == 0 | boardLike == undefined ? <Like width={16} height={16} fill='#9E9E9E' onPress={likeplus}/> : <Like2 width={16} height={16} fill='#FE9000' onPress={likeminus}/>}
                        <Text style={{color: boardLike == 0 ? '#9E9E9E' : '#FE9000', fontSize: 13, paddingRight: 10}}> 추천 { info3[0].recommend }</Text>
                        <Chat width={16} height={16}/>
                        <Text style={{color: '#9E9E9E', fontSize: 13}}> 댓글 {info3[0].commentsCount}</Text>
                    </View>
                    <View style={styles.lookupBox}>
                        <Text style={{fontSize: 13, color: '#9E9E9E'}}>조회수 {info3[0].hits}</Text>
                    </View>
                </View>
                <View style={styles.mainBox4}>
                    {comment == '0' ?
                    <View style={{alignItems: 'center', justifyContent: 'center', height: 200}}>
                        <Text style={{color: '#757575', fontSize: 15}}>아직 댓글이 없습니다.</Text>
                        <Text style={{color: '#757575', fontSize: 15}}>먼저 댓글을 남겨 소통을 시작해보세요!</Text>
                    </View> : <Comment info={comment} setCommentsId={setCommentsId} setInsert={setInsert} modal={modal} setModal={setModal} commentData={commentData}/>}
                </View>
            </View>
        </View>
      );


  return materialShare == '' || info3 == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
  : (
    <SafeAreaProvider>
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <StatusBar />
        </SafeAreaView>

        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.alarmBox, {opacity: animation}]}>
                <View style={styles.alarm}><Text style={{color: 'white', fontSize: 13, fontWeight: '500'}}>{info[0].nickname}님을 차단하였습니다.</Text></View>
            </Animated.View>

            <Modal navigation={navigation} modal={modal} setModal={setModal} modal2={modal2} setModal2={setModal2} modal3={modal3} setModal3={setModal3} commentsId={commentsId} info={info}
                modal6={modal6} setModal6={setModal6} commentData={commentData} modal7={modal7} setModal7={setModal7}/>
            <Modal2 modal2={modal2} setModal2={setModal2} userId={info[0].userId} ani={opacity_ani}/>
            <Modal3 modal3={modal3} setModal3={setModal3} modal4={modal4} setModal4={setModal4} boardId={info[0].boardId}/>
            <Modal4 modal4={modal4} setModal4={setModal4} />
            <Modal6 modal4={modal4} setModal4={setModal4} modal6={modal6} setModal6={setModal6} commentsId={commentsId}/>
            <Modal7 modal7={modal7} setModal7={setModal7} info={info} commentsId={commentsId}/>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}><Back /></TouchableOpacity>
                    <View style={styles.headerBar}>
                        <TouchableOpacity onPress={socialShare}><Share2 style={{marginRight: 12}}/></TouchableOpacity>
                        <More onPress={()=>{setModal(!modal), setCommentsId([undefined, undefined, '출산리스트'])}}/>
                    </View>
            </View>

            <FlatList ref={flatlistRef} data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}>
            </FlatList>

            <View style={[styles.commentRes, {display: insert.level === 0 ? 'none' : 'flex'}]}>
                <View style={styles.closeBox}><Close width={20} fill='#757575' onPress={()=>setInsert((prevState) => ({...prevState, level: 0}))}/></View>
                <Text style={{fontSize: 15}}>{commentsId}</Text>
                <Text style={{color: '#757575'}}> 님에게 답변 남기기</Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : ''} keyboardVerticalOffset={Platform.OS == 'ios' ? 50 : ''}>
            <View style={styles.footer}>
                <Image source={{ uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/profile/${user.profile}` }} style={styles.profileBox}/>
                <TouchableOpacity style={[styles.regisButton, {display: insert.contents === '' ? 'none' : 'flex'}]} onPress={()=>{Keyboard.dismiss(), commentRegister(), setInsert((prevState) => ({...prevState, contents: '', level: 0}))}}>
                    <Text style={{color: '#1E88E5', fontWeight: '600'}}>등록</Text>
                </TouchableOpacity>
                <TextInput style={styles.textInput} value={insert.contents} placeholder='댓글을 입력해주세요.' onChangeText={
                    (e)=> insert.level !== 0 ? setInsert((prevState) => ({...prevState, contents: e})) :
                    setInsert((prevState) => ({...prevState,
                        boardId: info[0].boardId,
                        contents: e,
                        ref: comment == 0 ? 1 : comment.length+1,
                        level: 0}))} placeholderTextColor={'#BDBDBD'}></TextInput>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Talk1Sub