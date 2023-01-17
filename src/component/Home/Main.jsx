import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar, Animated, Platform } from 'react-native'
import Icon2 from 'react-native-vector-icons/Feather'
import * as MediaLibrary from 'expo-media-library'
import ViewShot from 'react-native-view-shot'
import axios from 'axios'
import Modal from './Modal/ListSelect'
import moment from 'moment'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import MainImage from '../../../public/assets/svg/main.svg'
import Bell from '../../../public/assets/svg/Bell.svg'
import MyPage from '../../../public/assets/svg/Mypage.svg'

import { useIsFocused } from '@react-navigation/native'
import { getStatusBarHeight } from "react-native-status-bar-height"

import { useSelector, useDispatch } from 'react-redux'
import { postBoard } from '../../Redux/Slices/BoardSlice'
import { postBoardPopularSlice } from '../../Redux/Slices/BoardPopularSlice'
import { postMaterialPopularSlice } from '../../Redux/Slices/MaterialPopularSlice'
import { postInfoPopularSlice } from '../../Redux/Slices/InfoPopularSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FEECB3',
        marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
    },
    container2:{

    },
    header:{
        height: 60,
        justifyContent: 'center',
        padding: 15,
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
    },
    mainBox:{
        height: '20%',
        justifyContent: 'center',
    },
    mainBox2:{
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubble:{
        width: 250,
        height: 30,
        position: 'absolute',
        zIndex: 999,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        transtion: '1s',
    },  
    imageBox:{
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainBox3:{
        height: '20%',
        flexDirection: 'row',
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
        zIndex: 999,
        bottom: -10,
        right: 40,
        transform: [{ rotate: "180deg" }],
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
        dispatch(postBoardPopularSlice());
        dispatch(postMaterialPopularSlice());
        dispatch(postInfoPopularSlice());
    }, []);

    const ref = useRef();
    const [date, setDate] = useState(new Date());
    const boardPopular = useSelector(state => { return state.boardPopular.data });
    const materialPopular = useSelector(state => { return state.materialPopular.data });
    const infoPopular = useSelector(state => { return state.infoPopular.data });
    const [test, setTest] = useState(); // 캡쳐 uri
    const [bubble, setBubble] = useState([true, false, false, false]); // 말풍선
    const [modal, setModal] = useState(true); // 모달 원하는 출산준비물 리스트
    const animation = useRef(new Animated.Value(0)).current;

    const [userInfo, setUserInfo] = useState();
    console.log('home userInfo: ', userInfo);

    useEffect(()=>{
        const recommendList = async() => {
            const asyncStorage = await AsyncStorage.getItem('recommendList');
            const user = await  AsyncStorage.getItem('user');
            setUserInfo(JSON.parse(user));

            asyncStorage == null ? setModal(true) : '';
        }
        recommendList();
        
    }, []);

    useEffect(()=>{
        save();
    }, [test]);

    const save = async() => {
       
        if(test !== undefined){
            let { status } = await MediaLibrary.requestPermissionsAsync();
            const asset = await MediaLibrary.createAssetAsync(test);
            // const moms = await MediaLibrary.getAlbumAsync('맘스노트');

            console.log('status: ', status);
            console.log('asset: ', asset);
            // console.log('moms: ', moms);
           
            
            if(status === 'granted'){
                // const kwon = await MediaLibrary.getAlbumAsync('DCIM');
                // const moms = await MediaLibrary.getAlbumAsync('맘스노트');
                // if(moms === null){
                //     MediaLibrary.createAlbumAsync('맘스노트', asset);
                // }
                // MediaLibrary.addAssetsToAlbumAsync(moms, moms.id);
                // MediaLibrary.migrateAlbumIfNeededAsync(moms.id);
                // const album = await MediaLibrary.getAlbumAsync('맘스노트');
                // // console.log('album: ', album);
    
                // MediaLibrary.createAlbumAsync('맘스노트', asset);
                // // const asset = await MediaLibrary.createAssetAsync(test);
            }
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
        let arr = Array.from({length: 4}, ()=>{return false});
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

    const FocusAwareStatusBar = () => {
        const isFocused = useIsFocused();
        return isFocused ? <StatusBar backgroundColor='#FEECB3' /> : null;
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <ViewShot style={[styles.main]} ref={ref} options={{ fileName: "MomsNote", format: "png", quality: 1 }}>
                <View style={styles.mainBox}>
                    <Text style={{color: '#424242', fontSize: 18, marginBottom: 3}}>{date.getFullYear()}년 {moment(date).format("MM")}월 {date.getDate()}일</Text>
                    <Text style={{color: '#212121', fontSize: 32, fontWeight: '700'}}>{userInfo.babyName}</Text>
                </View>
                <View style={styles.mainBox2}>

                    <View style={[styles.bubble, {top: 20, right: 20, display: bubble[0] ? 'flex' : 'none'}]}>
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
                    </View>

                    <View style={styles.imageBox}><MainImage width={300} height={300} onPress={bubbleRandom}/></View>
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
                                D-{moment(userInfo.dueDate).diff(moment(), "days")} ({moment(userInfo.dueDate).diff(moment(), "week")}주차 {moment(userInfo.dueDate).diff(moment(), "day")%7}일)</Text>
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
                            <View style={styles.add}><Text style={{color: '#9E9E9E', fontSize: 13}} onPress={()=>navigation.navigate('맘스 톡')}>+ 더보기</Text></View>
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
                                    <Text numberOfLines={1}> {boardPopular[0].title}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>2 </Text>
                                    <Text numberOfLines={1}> {boardPopular[1].title}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>3 </Text>
                                    <Text numberOfLines={1}> {boardPopular[2].title}</Text>
                                </View>
                            </View>
                        </View>}
                    </View>
                    <View style={[styles.main3Box2, {borderLeftWidth: 1, borderColor: '#EEEEEE',}]}>
                        <View style={styles.titleBox}>
                            <View style={styles.title}><Text style={{fontSize: 18, fontWeight: 'bold'}}>맘스 토크</Text></View>
                            <View style={styles.add}><Text style={{color: '#9E9E9E', fontSize: 13}} onPress={()=>navigation.navigate('맘스 톡')}>+ 더보기</Text></View>
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
                                    <Text numberOfLines={1}> {materialPopular[0].title}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>2 </Text>
                                    <Text numberOfLines={1}> {materialPopular[1].title}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>3 </Text>
                                    <Text numberOfLines={1}> {materialPopular[2].title}</Text>
                                </View>
                            </View>
                        </View> }
                    </View>
                </View>
            </View>
            <View style={styles.main4}>
                <View style={styles.main4Box}>
                    <View style={[styles.titleBox, {height: '100%'}]}>
                        <View style={styles.title}><Text style={{fontSize: 20, fontWeight: 'bold'}}>맘스 정보</Text></View>
                        <View style={styles.add}><Text style={{color: '#9E9E9E', fontSize: 13}}>+ 더보기</Text></View>
                    </View>
                </View>
                <View style={styles.main4Box2}>
                {infoPopular !== '' ? <FlatList data={infoPopular} renderItem={renderItem2} showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.boardId} horizontal={true}>
                </FlatList> : <View><Text style={{color: '#757575'}}>새로운 정보가 없습니다.</Text></View>}
                </View>
            </View>
            

        </View>
    );
    
    const renderItem2 = ({ item }) => (
        <View style={styles.albumBox}>
            <View style={styles.albumPhoto}></View>
            <View style={styles.albumTitle}><Text>{item.title}</Text></View>
        </View>
    );
    
  return infoPopular == '' || infoPopular == undefined || materialPopular == undefined || materialPopular == '' ||  userInfo == undefined ?
    <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> :
    (
        <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: '#FEECB3' }}>
                    <StatusBar />
            </SafeAreaView>
            <FocusAwareStatusBar />
            <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <View style={styles.headerBar}>
                <Bell style={{marginRight: 12}} onPress={()=>navigation.navigate('알림')}/>
                <MyPage style={{marginRight: 5}} onPress={()=>navigation.navigate('마이페이지')}/>
            </View>
        </View>
            
            <Modal modal={modal} setModal={setModal} />

            <FlatList data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}>
            </FlatList>
            <Animated.View style={[styles.saveModalBox, {opacity: animation}]}>
                <View style={styles.saveModal}>
                    <Text style={{color: 'white'}}>출산 리스트가 내 앨범에 저장되었습니다.</Text>
                </View>
            </Animated.View>

            </SafeAreaView>

        
        </SafeAreaProvider>
    )
}

export default Home