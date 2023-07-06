import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Animated, Keyboard, Share, ActivityIndicator, Dimensions } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Modal from '../../Modal/DotModal'
import Modal2 from '../../Modal/Block'
import Modal3 from '../..//Modal/Declare'
import Modal4 from '../..//Modal/DelareConfirm'
import Modal6 from '../../Modal/Declare2'
import Modal7 from '../../Modal/CommentDelete'
import { Video, AVPlaybackStatus } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux'
import { postComment } from '../../../Redux/Slices/CommentSlice'
import { postCommentFlag } from '../../../Redux/Slices/CommentFlag'
import { postHits } from '../../../Redux/Slices/HitsSlice'
import moment from 'moment'

import Icon from 'react-native-vector-icons/FontAwesome'
import Back from '../../../../public/assets/svg/Back.svg'
import Share2 from '../../../../public/assets/svg/Share.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { postEvent } from '../../../Redux/Slices/EventSlice'
import RenderHtml from 'react-native-render-html'

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
        height: Dimensions.get('window').height - 60,
    },
    mainBox:{
        padding: 20,
        justifyContent: 'center'
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
    mainBox2TitleBox:{
       marginBottom: 20,
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
    profileBox:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
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
    },
    table: {
        borderTopWidth:1,
        borderLeftWidth:1,
      },
    tr: {
        borderBottomWidth: 1,
      },
    td: {
        borderRightWidth: 1,
    },
})
const Talk1Sub = ({navigation, route}) => {
    
    Keyboard.addListener('keyboardDidShow', () => {
        setPageHeight(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
        setPageHeight(false);
    });

    const dispatch = useDispatch();
    const info = [route.params];
    const info2 = useSelector(state => { return state.event.data; });
    const [info3, setInfo3] = useState();
    const eventSet = useSelector(state => { return state.event.refresh });

    const [pageHeight, setPageHeight] = useState(false); // 키보드 나옴에따라 높낮이 설정
    const [commentsId, setCommentsId] = useState([undefined, undefined]); // 댓글 더보기에서 commentid 때매만듬

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
    const [modal7, setModal7] = useState(false);

    const [userInfo, setUserInfo] = useState();

    const animation = useRef(new Animated.Value(0)).current;
    const flatlistRef = useRef(null);

    useEffect(()=>{ // 댓글 목록
        dispatch(postComment(commentData));
        dispatch(postCommentFlag({boardId: info[0].boardId}));
        const user = async() => {
            const user = await AsyncStorage.getItem('user');
            setUserInfo(JSON.parse(user));
        }
        const hits = async() => {
            const hits = await AsyncStorage.getItem('hits');

            hits == null || hits.split('|').filter(x => x == String(info[0].boardId)) == '' ? 
            (dispatch(postHits({boardId: info[0].boardId})), AsyncStorage.setItem('hits', String(hits)+`|${info[0].boardId}`)) : ''
        }
        
        dispatch(postEvent(eventSet));
        
        user();
        hits();
    }, []);

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

    const socialShare = () => {
        Share.share({
            message: `[맘스노트] ${info3[0].title}`,
        })
    }

    const dateFilter = (item) => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return(<Text>{`${item.eventStartDate.split('-')[1]}.${item.eventStartDate.split('-')[2]}(${days[moment(item.eventStartDate).day()]})`} ~ {`${item.eventEndDate.split('-')[1]}.${item.eventEndDate.split('-')[2]}(${days[moment(item.eventEndDate).day()]})`}</Text>)
      }

    const renderItem = ({ item }) => (
            <View style={styles.main}>
                <View style={styles.mainBox2}>
                    <View style={styles.mainBox2TitleBox}>
                        <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 3, lineHeight: 25}}>{item.title}</Text>
                        <View>
                            <Text>{dateFilter(item)}</Text>
                        </View>
                    </View>
                    <RenderHtml source={{html: `${item.contents}`}} tagsStyles={styles} />
                </View>
                {item.savedName === null ? <View></View> : ImageBox()}
            </View>
      );


  return  userInfo == undefined || info2 == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={[styles.container, {height: pageHeight ? '94%' : '97%'}]}/> : (
    <View style={[styles.container, {height: pageHeight ? '94%' : '97%'}]}>

        <Animated.View style={[styles.alarmBox, {opacity: animation}]}>
            <View style={styles.alarm}><Text style={{color: 'white', fontSize: 13, fontWeight: '500'}}>{info[0].nickname}님을 차단하였습니다.</Text></View>
        </Animated.View>

        <Modal navigation={navigation} modal={modal} setModal={setModal} modal2={modal2} setModal2={setModal2} modal3={modal3} setModal3={setModal3} commentsId={commentsId} info={info}
            modal6={modal6} setModal6={setModal6} modal7={modal7} setModal7={setModal7} commentData={commentData}/>
        <Modal2 modal2={modal2} setModal2={setModal2} userId={info[0].userId} ani={opacity_ani}/>
        <Modal3 modal3={modal3} setModal3={setModal3} modal4={modal4} setModal4={setModal4} boardId={info[0].boardId}/>
        <Modal4 modal4={modal4} setModal4={setModal4} />
        <Modal6 modal4={modal4} setModal4={setModal4} modal6={modal6} setModal6={setModal6} commentsId={commentsId}/>
        <Modal7 modal7={modal7} setModal7={setModal7} info={info}  commentsId={commentsId}/>
        
        <View style={styles.header}>
                <Back onPress={()=>navigation.goBack()}/>
                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={socialShare}><Share2 style={{marginRight: 12}}/></TouchableOpacity>
                </View>
        </View>

        <FlatList ref={flatlistRef} data={info} renderItem={renderItem}
            keyExtractor={item => String(item.boardId)}>
        </FlatList>
  
    </View>
  )
}

export default Talk1Sub