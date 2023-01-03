import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native'
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

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
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
        alignItems: 'center'
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

    const dispatch = useDispatch();
    const info = [route.params.item];

    const [pageHeight, setPageHeight] = useState(false); // 키보드 나옴에따라 높낮이 설정
    const comment = useSelector(state => { return state.comment.data; });
    console.log('comment: ', comment);
    const [commentsId, setCommentsId] = useState([undefined, undefined]); // 댓글 더보기에서 commentid 때매만듬
    const [insert, setInsert] = useState(
        {
            boardId: null,
            contents: '',
            ref: 0,
            level: 0
        }
    ); // 댓글 입력
    console.log('insert: ', insert);
    const [boardLike, setBoardLike] = useState(); // 게시판 좋아요
    const [boardData, setBoardData] = useState({
        order: 'new',
        count: 5,
        page: 1,
        subcategory: '전체'
    })

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

    const animation = useRef(new Animated.Value(0)).current;

    useEffect(()=>{ // 댓글 목록
        dispatch(postComment(commentData));
    }, []);

    useEffect(()=>{ // 댓글 추쳔 Flag
        dispatch(postCommentFlag({boardId: info[0].boardId}));
    }, []);

    useEffect(()=>{ // 게시물 추천 Flag
        console.log('게시물 추천 여부 업데이트');
        const likeInfo = async() => {
            try{
                const response = await axios({
                    method: 'post',
                    url: 'https://momsnote.net/api/board/recommend/flag',
                    headers: { 
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE1OTE0OTIsImV4cCI6MTY3NDE4MzQ5Mn0.d8GpqvEmnnrUZKumuL4OPzp7wSGXiTo47hGkCSM2HO0', 
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
        try{
            const response = await axios({ 
                  method: 'post',
                  url: 'https://momsnote.net/api/comments/write',
                  headers: { 
                    'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE3NzUwMzAsImV4cCI6MTY3NDM2NzAzMH0.sXaK1MqIIiSpnF-xGkY-TRIu-O-ndUa1QuG9HFkGrMM', 
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
    }

    const likeplus = async() => { // 게시판 좋아요
        console.log('likeplus');
        try{
            const response = await axios({
                  method: 'post',
                  url: 'https://momsnote.net/api/board/recommend',
                  headers: { 
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE1MjMyMDMsImV4cCI6MTY3NDExNTIwM30.dv8l7-7MWKAPpc9kXwxxgUSy84pz_7gvpsJPpa4TX0M', 
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

    const ImageBox = () => {
        const arr:any[] = [];
        const a = (info[0].savedName.split('|')).filter(x => {
            if(x.charAt(x.length-1) === '4'){ arr.push(x); }else return x;
        });
        
        const infoFiltering = [...arr, ...a];
        switch(true){
    
            case info[0].savedName.split('|').length == 1: return(
                <TouchableOpacity style={styles.mainBox2ImageBox} onPress={()=>navigation.navigate('갤러리', infoFiltering)}>
                    <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${infoFiltering[0]}`}} style={styles.image}/>
                </TouchableOpacity>
            )
            case info[0].savedName.split('|').length < 4: return(
                <View style={styles.mainBox2ImageBox2}>
                    {infoFiltering.map(x=>{
                        if(x.charAt(x.length-1) === '4'){
                            return (
                                <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', infoFiltering)}>
                                    <View style={styles.videoImage}><Icon name='play' size={17} style={{color: 'white'}}/></View>
                                    <Video source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}} style={styles.image2} resizeMode='cover'/>
                                </TouchableOpacity>
                            )
                        }else return (
                            <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', infoFiltering)}>
                                    <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}} style={styles.image2}/>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
            default: return(
                <View style={styles.mainBox2ImageBox2}>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리')}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[1]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://reactnative.dev/img/tiny_logo.png`}} style={styles.image2}/>
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

    const renderItem = ({ item }) => (
        <View>
            <View style={styles.header2}>
                <TouchableOpacity style={styles.profileBox}></TouchableOpacity>
                <View style={styles.infoBox}>
                    <Text style={{color: '#212121', fontSize: 16, fontWeight: '500'}}>{item.nickname}</Text>
                    <Text style={{color: '#9E9E9E', fontSize: 13}}>{moment().diff(moment(item.boardDate), "days")}일 전</Text>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 20, fontWeight: '400'}}>{item.title}</Text>
                </View>
                <View style={styles.mainBox2}>
                    <Text>{item.contents}</Text>
                </View>
                {item.savedName === null ? <View></View> : ImageBox()}
                <View style={styles.mainBox3}>
                    <View style={styles.likeBox}>
                        {boardLike == 0 | boardLike == undefined ? <Like width={16} height={16} fill='#9E9E9E' onPress={likeplus}/> : <Like2 width={16} height={16} fill='#FE9000'/>}
                        <Text style={{color: boardLike == 0 ? '#9E9E9E' : '#FE9000', fontSize: 13, paddingRight: 10}}> 추천 { boardLike }</Text>
                        <Chat width={16} height={16}/>
                        <Text style={{color: '#9E9E9E', fontSize: 13}}> 댓글 {item.commentsCount}</Text>
                    </View>
                    <View style={styles.lookupBox}>
                        <Text style={{fontSize: 13, color: '#9E9E9E'}}>조회수 {item.hits}</Text>
                    </View>
                </View>
                <View style={styles.mainBox4}>
                    {comment == '' ?
                    <View style={{alignItems: 'center', justifyContent: 'center', height: 200}}>
                        <Text style={{color: '#757575', fontSize: 15}}>아직 댓글이 없습니다.</Text>
                        <Text style={{color: '#757575', fontSize: 15}}>먼저 댓글을 남겨 소통을 시작해보세요!</Text>
                    </View> : <Comment info={comment} setCommentsId={setCommentsId} setInsert={setInsert} modal={modal} setModal={setModal} commentData={commentData}/>}
                </View>
            </View>
        </View>
      );


  return (
    <View style={[styles.container, {height: pageHeight ? '94%' : '97%'}]}>

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
                <Back onPress={()=>navigation.goBack()}/>
                <View style={styles.headerBar}>
                    <Share style={{marginRight: 12}}/>
                    <More style={{marginRight: 5}} onPress={()=>{setModal(!modal), setCommentsId([undefined, undefined])}}/>
                </View>
        </View>

        <FlatList data={info} renderItem={renderItem}
            keyExtractor={item => String(item.boardId)}>
        </FlatList>
        <View style={[styles.commentRes, {display: insert.level === 0 ? 'none' : 'flex'}]}>
            <View style={styles.closeBox}><Close width={20} fill='#757575' onPress={()=>setInsert((prevState) => ({...prevState, level: 0}))}/></View>
            <Text style={{fontSize: 15}}>{commentsId}</Text>
            <Text style={{color: '#757575'}}> 님에게 답변 남기기</Text>
        </View>
        <View style={styles.footer}>
            <View style={styles.profileBox}></View>
            <TouchableOpacity style={[styles.regisButton, {display: insert.contents === '' ? 'none' : 'flex'}]} onPress={()=>{Keyboard.dismiss(), commentRegister(), setInsert((prevState) => ({...prevState, contents: '', level: 0}))}}>
                <Text style={{color: '#1E88E5', fontWeight: '600'}}>등록</Text>
            </TouchableOpacity>
            <TextInput style={styles.textInput} value={insert.contents} placeholder='댓글을 입력해주세요.' onChangeText={
                (e)=> insert.level !== 0 ? setInsert((prevState) => ({...prevState, contents: e})) :
                setInsert((prevState) => ({...prevState,
                    boardId: info[0].boardId,
                    contents: e,
                    ref: 0,
                    level: 0}))} placeholderTextColor={'#BDBDBD'}></TextInput>
        </View>
    </View>
  )
}

export default Talk1Sub