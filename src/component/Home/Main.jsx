import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar, Animated, Platform, Image } from 'react-native'
import Icon2 from 'react-native-vector-icons/Feather'
import * as MediaLibrary from 'expo-media-library'
import ViewShot from 'react-native-view-shot'
import Modal from './Modal/ListSelect'
import moment from 'moment'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import CoarchMark from './Modal/CoarchMark'
import Bell from '../../../public/assets/svg/Bell.svg'
import MyPage from '../../../public/assets/svg/Mypage.svg'

import { useIsFocused } from '@react-navigation/native'
import { getStatusBarHeight } from "react-native-status-bar-height"

import { useSelector, useDispatch } from 'react-redux'
import { postBoardPopular } from '../../Redux/Slices/BoardPopularSlice'
import { postMaterialPopularSlice } from '../../Redux/Slices/MaterialPopularSlice'
import { postInfoPopularSlice } from '../../Redux/Slices/InfoPopularSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { postUser } from '../../Redux/Slices/UserSlice'
import { postEvent, setEventRefresh } from '../../Redux/Slices/EventSlice'


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FEECB3',
        marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
    },
    container2:{
    },
    header:{
        height: 55,
        justifyContent: 'center',
        padding: 17,
      },
    headerBar:{
          position: 'absolute',
          right: 20,
          alignItems: 'center',
          flexDirection: 'row',
    },
    main:{
        height: 500,
        padding: 20,
        backgroundColor: '#FEECB3',
    },
    mainBox:{
        height: 100,
        justifyContent: 'center',
    },
    mainBox2:{
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubble:{
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        position: 'absolute',
        zIndex: 999,
        // borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        transtion: '1s',
    },
    triangle:{
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 25,
        borderRightWidth: 5,
        borderBottomWidth: 20,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "white",
        position: 'absolute',
        zIndex: 900,
        bottom: -15,
        right: 0,
        transform: [{ rotate: "180deg" }],
    },
    profileBox:{
        width: 300,
        height: 300,
        borderRadius: 150,
    },
    mainBox3:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10
    },
    mainBox3Sub:{
        width: '30%',
        justifyContent: 'center',
    },
    captureBox:{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF8E1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    DdayBox:{
        alignItems: 'flex-end',
    },
    main3:{
        height: 250,
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: 'white',
    },
    main3Box:{
        flexDirection: 'row',
        padding: 3,

    },
    main3Box2:{
        width: '50%',
        paddingLeft: 10,
        paddingRight: 10,

    },
    titleBox:{
        flexDirection: 'row',
        height: '25%',

        alignItems: 'center'
    },
    title:{

    },
    add:{
        position: 'absolute',
        right: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    contentBox:{
        height: '75%',
        paddingLeft: 5,
        paddingRight: 5,
    },
    content:{
        height: '28.4%',
        justifyContent: 'center',
        paddingTop: 15,
    },
    main4:{
        backgroundColor: 'white',
        height: 300,
        paddingLeft: 10,
        paddingRight: 10,
    },
    main4Box:{
        height: '20%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    main4Box2:{
        height: 196,
        justifyContent: 'center',
        alignItems: 'center',
    },
    albumBox:{
        width: 156,
        margin: 10,
        padding: 5,
    },
    albumPhoto:{
        height: 156,
        borderWidth: 1,
        borderRadius: 10,
    },
    albumTitle:{
        height: 30,
        justifyContent: 'center',
    },
    saveModal:{
        width: '90%',
        height: 40,
        backgroundColor: 'black',
        opacity: 0.7,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    saveModalBox:{
        width: '100%',
        height: 40,
        position: 'absolute',
        zIndex: 1,
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const Home = ({navigation}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
      ];

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(postBoardPopular());
        dispatch(postMaterialPopularSlice());
        dispatch(postInfoPopularSlice());
    }, []);

    const ref = useRef();
    const [date, setDate] = useState(new Date());
    const boardPopular = useSelector(state => { return state.boardPopular.data });
    console.log('boardPopular: ', boardPopular);
    const materialPopular = useSelector(state => { return state.materialPopular.data });
    const infoPopular = useSelector(state => { return state.infoPopular.data });
    const mainData = useSelector(state => { return state.user.data; });
    console.log('mainData: ', mainData);
    const [test, setTest] = useState(); // 캡쳐 uri
    const [bubble, setBubble] = useState([true]); // 말풍선
    const [modal, setModal] = useState(false); // 모달 원하는 출산준비물 리스트
    const animation = useRef(new Animated.Value(0)).current;
    const [modal2, setModal2] = useState(true); // 코치마크

    const [userInfo, setUserInfo] = useState();

    useEffect(()=>{
        const recommendList = async() => {
            const asyncStorage = await AsyncStorage.getItem('recommendList');
            const user = await AsyncStorage.getItem('user');
            const userId = await AsyncStorage.getItem('userId');
            console.log('user: ', JSON.parse(user));
            const a = await AsyncStorage.getItem('token');
            console.log('token: ', a);
            console.log('userId: ', userId);
            setUserInfo(JSON.parse(user));

            asyncStorage == null ? setModal(true) : '';
        }
        recommendList();

        dispatch(postUser());
    }, []);

    useEffect(()=>{
        save();
    }, [test]);

    const save = async() => {
       
        if(test !== undefined){
            let { status } = await MediaLibrary.requestPermissionsAsync();
            const asset = await MediaLibrary.createAssetAsync(test);
            const moms = await MediaLibrary.getAlbumAsync('맘스노트');
        }
        setTest(undefined);
    }

    const capture = async() => {
        opacity_ani();
        setTest('1');

        ref.current.capture().then(uri => {
            setTest(uri);
          });
    }

    const bubbleRandom = () => {
        let number = bubble.indexOf(true);
        let arr = Array.from({length: mainData.message.length}, ()=>{return false});
        console.log('arr: ', arr);
        if(number === 3){ number = -1 }
        arr[number+1] = !arr[number+1];
        setBubble(arr); 
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

    const eventNavi = (item) => {
        let e = item.month - 1;

        if(e-9 < 0){
            e = '0' + (e+1);
          } else e += 1;

        dispatch(setEventRefresh({
            page: 1,
            count: 1,
            start: `${new Date().getFullYear()}-${e}`,
            end: `${new Date().getFullYear()}-${e}`
        }));

        navigation.navigate('행사정보 상세페이지', item)
    }

    const FocusAwareStatusBar = () => {
        const isFocused = useIsFocused();
        return isFocused ? <StatusBar backgroundColor='#FEECB3' /> : null;
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <ViewShot style={styles.main} ref={ref} options={{ fileName: "MomsNote", format: "png", quality: 1 }}>
                <View style={styles.mainBox}>
                    <Text style={{color: '#424242', fontSize: 18, marginBottom: 3}}>{date.getFullYear()}년 {moment(date).format("MM")}월 {date.getDate()}일</Text>
                    <Text style={{color: '#212121', fontSize: 32, fontWeight: '700'}}>{userInfo.babyName}</Text>
                </View>
                <View style={styles.mainBox2}>

                    {mainData.message[0] == null ? '' :  mainData.message.map(x => {
                        console.log('x: ', x);
                        return(
                            <View style={[styles.bubble, {top: 20, right: 20, display: bubble[0] ? 'flex' : 'none'}]}>
                                <View style={[styles.triangle, {borderBottomColor: bubble[0] ? 'white' : 'transparent'}]}></View>
                                <Text>{x}</Text>
                            </View>
                        )
                    })}
                    {/* <View style={[styles.bubble, {top: 20, right: 20, display: bubble[0] ? 'flex' : 'none'}]}>
                        <View style={[styles.triangle, {borderBottomColor: bubble[0] ? 'white' : 'transparent'}]}></View>
                        <Text>아무말이나 하고싶어요</Text>
                    </View>
                    <View style={[styles.bubble, {top: 10, right: 70, display: bubble[1] ? 'flex' : 'none'}]}>
                        <View style={[styles.triangle, {borderBottomColor: bubble[1] ? 'white' : 'transparent'}]}></View>
                        <Text>출산리스트 맘스토크 체험단</Text>
                    </View>
                    <View style={[styles.bubble, {top: 60, right: 60, display: bubble[2] ? 'flex' : 'none'}]}>
                        <View style={[styles.triangle, {borderBottomColor: bubble[2] ? 'white' : 'transparent'}]}></View>
                        <Text>First Item Second Item</Text>
                    </View>
                    <View style={[styles.bubble, {top: 40, right: 80, display: bubble[3] ? 'flex' : 'none'}]}>
                        <View style={[styles.triangle, {borderBottomColor: bubble[3] ? 'white' : 'transparent'}]}></View>
                        <Text>IDENITIDENITIDENITIDENIT</Text>
                    </View> */}

                    <TouchableOpacity style={styles.profileBox} activeOpacity={1} onPress={bubbleRandom}>
                        <Image style={styles.profileBox} source={{ uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/d-day/${mainData.weekImage}`}} />
                    </TouchableOpacity>

                </View>
                <View style={styles.mainBox3}>
                    <View style={styles.mainBox3Sub}>
                        <TouchableOpacity style={[styles.captureBox, {display: test === undefined ? 'flex' : 'none'}]} onPress={capture}>
                            <Icon2 name='download' size={22} style={{color: '#FE9000'}} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.mainBox3Sub, {width: '70%'}]}>
                        <View style={styles.DdayBox}>
                            <Text style={{color: '#FE9000', fontSize: 24, fontWeight: '700', marginBottom: 3}}>
                                D-{mainData.dday} ({mainData.week}주차 {mainData.day}일)</Text>
                            <Text style={{color: '#424242', fontSize: 15}}>
                                예정일 : {moment(userInfo.dueDate).format("YYYY")}년 {moment(userInfo.dueDate).format("MM")}월 {moment(userInfo.dueDate).format("DD")}일</Text>
                        </View>
                    </View>
                </View> 
            </ViewShot>
            <View style={styles.main3}>
                <View style={styles.main3Box}>
                    <View style={styles.main3Box2}>
                        <View style={styles.titleBox}>
                            <View style={styles.title}><Text style={{fontSize: 18, fontWeight: 'bold'}}>출산 리스트</Text></View>
                            <View style={styles.add}><Text style={{color: '#9E9E9E', fontSize: 13}} onPress={()=>navigation.navigate('맘스 톡', '12345')}>+ 더보기</Text></View>
                        </View>
                        {materialPopular == '' ? 
                            <View style={[styles.contentBox, {justifyContent: 'center', alignItems: 'center'}]}>
                                <Text style={{color: '#757575'}}>등록된</Text>
                                <Text style={{color: '#757575'}}>게시물이 없습니다.</Text>
                            </View>
                        :
                        <View style={styles.contentBox}>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>1 </Text>
                                    <Text numberOfLines={1} onPress={()=>navigation.navigate('출산리스트 공유 상세내용', materialPopular[0])}> {materialPopular == '' ? '' : materialPopular[0].title }</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>2 </Text>
                                    <Text numberOfLines={1} onPress={()=>navigation.navigate('출산리스트 공유 상세내용', materialPopular[1])}> {materialPopular == '' ? '' : materialPopular[1].title }</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>3 </Text>
                                    <Text numberOfLines={1} onPress={()=>navigation.navigate('출산리스트 공유 상세내용', materialPopular[2])}> {materialPopular == '' ? '' : materialPopular[2].title }</Text>
                                </View>
                            </View>
                        </View>}
                    </View>
                    <View style={[styles.main3Box2, {borderLeftWidth: 1, borderColor: '#EEEEEE',}]}>
                        <View style={styles.titleBox}>
                            <View style={styles.title}><Text style={{fontSize: 18, fontWeight: 'bold'}}>맘스 토크</Text></View>
                            <View style={styles.add}><Text style={{color: '#9E9E9E', fontSize: 13}} onPress={()=>navigation.navigate('맘스 톡', '맘')}>+ 더보기</Text></View>
                        </View>
                        {boardPopular == '' ? 
                        <View style={[styles.contentBox, {justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={{color: '#757575'}}>등록된</Text>
                            <Text style={{color: '#757575'}}>게시물이 없습니다.</Text>
                        </View>
                        :
                        <View style={styles.contentBox}>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>1 </Text>
                                    <Text numberOfLines={1} onPress={()=>navigation.navigate('맘스토크 상세내용', {item: boardPopular[0]})}> {boardPopular == '' ? '' : boardPopular[0].title}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>2 </Text>
                                    <Text numberOfLines={1} onPress={()=>navigation.navigate('맘스토크 상세내용', {item: boardPopular[1]})}> {boardPopular == '' ? '' :boardPopular[1].title}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>3 </Text>
                                    <Text numberOfLines={1} onPress={()=>navigation.navigate('맘스토크 상세내용', {item: boardPopular[2]})}> {boardPopular == '' ? '' :boardPopular[2].title}</Text>
                                </View>
                            </View>
                        </View> }
                    </View>
                </View>
            </View>
            <View style={styles.main4}>
                <View style={styles.main4Box}>
                    <View style={[styles.titleBox, {height: '100%'}]}>
                        <View style={styles.title}><Text style={{fontSize: 18, fontWeight: 'bold'}}>맘스 정보</Text></View>
                        <View style={styles.add}><Text style={{color: '#9E9E9E', fontSize: 13}} onPress={()=>navigation.reset({routes: [{name: "맘스정보"}]})}>+ 더보기</Text></View>
                    </View>
                </View>
                <View style={styles.main4Box2}>
                {infoPopular == '' ? <View><Text style={{color: '#757575'}}>새로운 정보가 없습니다.</Text></View>
                :
                <FlatList data={infoPopular} renderItem={renderItem2} showsHorizontalScrollIndicator={false}
                        keyExtractor={item => String(item.boardId)} horizontal={true}>
                </FlatList>}
                </View>
            </View>
            

        </View>
    );
    
    const renderItem2 = ({ item, index }) => (
        <TouchableOpacity style={styles.albumBox} onPress={()=>eventNavi(item)} key={index}>
            <View style={styles.albumPhoto}></View>
            <View style={styles.albumTitle}><Text>{item.title}</Text></View>
        </TouchableOpacity>
    );
    
  return (
        <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: '#FEECB3' }}>
                    <StatusBar />
            </SafeAreaView>
            <FocusAwareStatusBar />
            { userInfo == '' || userInfo == undefined || mainData == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={[styles.container, {height: Platform.OS == 'ios' ? null : '91%', flex: Platform.OS === 'ios' ? 1 : null}]}/>
                : <SafeAreaView style={[styles.container, {height: Platform.OS == 'ios' ? null : '91%', flex: Platform.OS === 'ios' ? 1 : null}]}>
            <View style={styles.header}>
                <View style={styles.headerBar}>
                    <Bell style={{marginRight: 20}} onPress={()=>navigation.navigate('알림')}/>
                    <MyPage style={{marginRight: 5}} onPress={()=>navigation.navigate('마이페이지')}/>
                </View>
            </View>
            
            <Modal modal={modal} setModal={setModal} />
            <CoarchMark modal={modal2} setModal={setModal2}/>

            <FlatList data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}>
            </FlatList>
            <Animated.View style={[styles.saveModalBox, {opacity: animation}]}>
                <View style={styles.saveModal}>
                    <Text style={{color: 'white'}}>출산 리스트가 내 앨범에 저장되었습니다.</Text>
                </View>
            </Animated.View>

            </SafeAreaView>}
        </SafeAreaProvider>
    )
}

export default Home