import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Animated, ActivityIndicator, Keyboard, SafeAreaView, Platform, KeyboardAvoidingView, Share } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Modal from '../../Modal/DotModal'
import Modal2 from '../../Modal/Block'
import Modal3 from '../..//Modal/Declare'
import Modal4 from '../..//Modal/DelareConfirm'
import Modal6 from '../../Modal/Declare2'
import Modal7 from '../../Modal/CommentDelete'
import moment from 'moment'
import { Video } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux'
import { postBoard } from '../../../Redux/Slices/BoardSlice'
import { postComment } from '../../../Redux/Slices/CommentSlice'
import { postCommentFlag } from '../../../Redux/Slices/CommentFlag'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    SafeAreaProvider,
  } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native'
import Comment from './Comment'
import axios from 'axios'

import Icon from 'react-native-vector-icons/FontAwesome'
import Chat from '../../../../public/assets/svg/Chat.svg'
import Like from '../../../../public/assets/svg/Like.svg'
import Like2 from '../../../../public/assets/svg/Heart-1.svg'
import Back from '../../../../public/assets/svg/Back.svg'
import More from '../../../../public/assets/svg/More.svg'
import Share2 from '../../../../public/assets/svg/Share.svg'
import Close from '../../../../public/assets/svg/Close.svg'
import { postHits } from '../../../Redux/Slices/HitsSlice'
import { postUser } from '../../../Redux/Slices/UserSlice'

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
        flex: 1,
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
    mainBox2ImageBox:{
        height: 400,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    mainBox2ImageBox2:{
        height: 150,
        flexDirection: 'row',
        padding: 10,
    },
    image:{
        width: '95%',
        height: '95%',
        borderRadius: 4,
    },
    image2:{
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
    imageBox:{
        width: '31%',
        height: 114,
        borderRadius: 4,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoImage:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',
        zIndex: 999
    },
    mainBox3:{
        height: 50,
        flexDirection: 'row',
        borderColor: '#F5F5F5',
        borderBottomWidth: 1,
        paddingLeft: 20,
        alignItems: 'center',
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
        alignItems: 'center',
        backgroundColor: 'white'
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

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const boardInfo = useSelector(state => { return state.board.data });
    const [info, setInfo] = useState(useSelector(state => { return state.board.data } ));
    const [pageHeight, setPageHeight] = useState(false); // 키보드 나옴에따라 높낮이 설정
    const comment = useSelector(state => { return state.comment.data; });
    const [commentsId, setCommentsId] = useState([undefined, undefined]); // 댓글 더보기에서 commentid 때매만듬
    const [insert, setInsert] = useState(
        {
            boardId: route.params.item.boardId,
            contents: '',
            ref: comment.length,
            level: 0,
            tag: null,
        }
    ); // 댓글 입력
    const [boardLike, setBoardLike] = useState(); // 게시판 좋아요 Flag
    const [boardData, setBoardData] = useState({
        order: 'new',
        count: 1,
        page: 1,
        subcategory: '전체'
    })

    const [commentData, setCommentData] = useState({
        boardId: route.params.item.boardId,
        count: 1,
        page: 1
    });

    const [modal, setModal] = useState(false); // dot 모달 다른사람게시판 차단 및 신고
    const [modal2, setModal2] = useState(false); // 차단하기
    const [modal3, setModal3] = useState(false); // 게시물 신고 하기 
    const [modal4, setModal4] = useState(false); // 신고 확인
    const [modal6, setModal6] = useState(false); // comment 신고 하기
    const [modal7, setModal7] = useState(false); // comment 정말 삭제?

    const user = useSelector(state => { return state.user.data; });

    const [userInfo, setUserInfo] = useState();

    const animation = useRef(new Animated.Value(0)).current;
    const flatlistRef = useRef(null);

    useEffect(()=>{
        dispatch(postBoard(boardData));
        dispatch(postUser());
        dispatch(postComment({
            boardId: route.params.item.boardId,
            count: 1,
            page: 1
        }));
        dispatch(postCommentFlag({boardId: route.params.item.boardId}));
        const user = async() => {
            const user = await AsyncStorage.getItem('user');
            setUserInfo(JSON.parse(user));
        }
        const hits = async() => {
            const hits = await AsyncStorage.getItem('hits');

            hits == null || hits.split('|').filter(x => x == String(info[0].boardId)) == '' ? 
            (dispatch(postHits({boardId: info[0].boardId})), AsyncStorage.setItem('hits', String(hits)+`|${info[0].boardId}`)) : ''
        }
        
        setTimeout(() => {
            dispatch(postBoard(boardData));
        }, 100);

        user();
        hits();
    }, [isFocused, modal7]);

    useEffect(()=>{
        if(boardInfo !== '' && boardInfo !== '0'){
            setInfo(boardInfo.filter(x => x.boardId == route.params.item.boardId));
        }
    }, [boardInfo]);

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
                return undefined; 
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
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                  data: insert
                });
            }catch(error){
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
                dispatch(postBoard(boardData));
                setBoardLike();
            }catch(error){
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
                dispatch(postBoard(boardData));
                setBoardLike();
            }catch(error){
            }
    }

    const dayCalculate = (date) => {
        switch(true){
          case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
          case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
          default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment(date).format('YY.MM.DD')}</Text>
        }
      }

    const ImageBox = () => {
        const arr = [];
        const a = (info[0].savedName.split('|')).filter(x => {
            return x;
        });
        
        const infoFiltering = [...arr, ...a];
        switch(true){
    
            case info[0].savedName.split('|').length == 1: return(
                <TouchableOpacity style={styles.mainBox2ImageBox} onPress={()=>navigation.navigate('갤러리', [infoFiltering, 0])} activeOpacity={1}>
                    {
                    infoFiltering[0].charAt(infoFiltering[0].length-1) !== '4' ?
                    <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${infoFiltering[0]}`}} style={styles.image}/>
                    :
                    <Video source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${infoFiltering[0]}`}} style={styles.image2} resizeMode='cover'/>
                    }
                </TouchableOpacity>
            )
            case info[0].savedName.split('|').length < 4: return(
                <View style={styles.mainBox2ImageBox2}>
                    {infoFiltering.map((x, index)=>{
                        if(x.charAt(x.length-1) === '4'){
                            return (
                                <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', [infoFiltering, index])} activeOpacity={1} key={index}>
                                    <View style={styles.videoImage}><Icon name='play' size={17} style={{color: 'white'}}/></View>
                                    <Video source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}} style={styles.image2} resizeMode='cover'/>
                                </TouchableOpacity>
                            )
                        }else return (
                            <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', [infoFiltering, index])} activeOpacity={1} key={index}>
                                    <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}} style={styles.image2}/>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
            default: return(
                <View style={styles.mainBox2ImageBox2}>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', [infoFiltering, 0])} activeOpacity={1}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', [infoFiltering, 1])} activeOpacity={1}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[1]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', [infoFiltering, 2])} activeOpacity={1}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[2]}`}} style={styles.image2}/>
                        <View style={{position: 'absolute', top: '40%', left: '40%'}}><Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>+{info[0].savedName.split('|').length-3}</Text></View>
                    </TouchableOpacity>
                </View>
            )
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

    const socialShare = () => {
        Share.share({
            message: `[맘스노트] ${route.params.item.title}`,
        })
    }

    const renderItem = ({ item, index }) => (
        <View>
            <View style={styles.header2}>
                    <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/profile/${item.profileImage}`}} style={styles.profileBox}/>
                <View style={styles.infoBox}>
                    <Text style={{color: '#212121', fontSize: 16, fontWeight: '500'}}>{item.nickname}</Text>
                    <Text style={{color: '#9E9E9E', fontSize: 13}}>{dayCalculate(item.boardDate)}</Text>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 20, fontWeight: '400', lineHeight: 24}}>{item.title}</Text>
                </View>
                <View style={styles.mainBox2}>
                    <Text style={{lineHeight: 20}}>{item.contents}</Text>
                </View>
                {!item.savedName ? <View></View> : ImageBox(index)}
                <View style={styles.mainBox3}>
                    <View style={styles.likeBox}>
                        {boardLike == 0 | boardLike == undefined ? <Like width={20} height={20} fill='#9E9E9E' onPress={likeplus}/> : <Like2 width={20} height={20} fill='#FE9000' onPress={likeminus}/>}
                        <Text style={{color: boardLike == 0 || boardLike == undefined ? '#9E9E9E' : '#FE9000', fontSize: 13, paddingRight: 10}}> 추천 { item.recommend }</Text>
                        <Chat width={20} height={20}/>
                        <Text style={{color: '#9E9E9E', fontSize: 13}}> 댓글 {item.commentsCount}</Text>
                    </View>
                    <View style={styles.lookupBox}>
                        <Text style={{fontSize: 13, color: '#9E9E9E'}}>조회수 {item.hits}</Text>
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


  return info == '' || comment == '' || userInfo == undefined || boardInfo == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
  : (
    <SafeAreaProvider>
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
            <Modal7 modal7={modal7} setModal7={setModal7} info={info}  commentsId={commentsId}/>

            <View style={styles.header}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}><Back /></TouchableOpacity>
                    <View style={styles.headerBar}>
                        <TouchableOpacity onPress={socialShare}><Share2 style={{marginRight: 12}}/></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setModal(!modal), setCommentsId([undefined, undefined, '맘스토크'])}}><More /></TouchableOpacity>
                    </View>
            </View>

            <FlatList ref={flatlistRef} data={info} renderItem={renderItem} showsVerticalScrollIndicator={false}
                keyExtractor={item => String(item.boardId)}>
            </FlatList>

            <View style={[styles.commentRes, {display: insert.level === 0 ? 'none' : 'flex'}]}>
                <View style={styles.closeBox}><Close width={20} fill='#757575' onPress={()=>setInsert((prevState) => ({...prevState, level: 0, tag: null}))}/></View>
                <Text style={{fontSize: 15}}>{commentsId}</Text>
                <Text style={{color: '#757575'}}> 님에게 답변 남기기</Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : ''}>
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