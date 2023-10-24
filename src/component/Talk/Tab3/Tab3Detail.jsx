import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal, StatusBar, Image, SafeAreaView, Platform, Share } from 'react-native'
import ContentsURL from './Modal/ContentsURL'
import moment from 'moment'
import Swiper from 'react-native-swiper'
import CompleteModal from './Modal/Complete'
import Like from '../../../../public/assets/svg/Like.svg'
import Heart from '../../../../public/assets/svg/Heart-1.svg'
import Share2 from '../../../../public/assets/svg/Share.svg'
import Back from '../../../../public/assets/svg/Back.svg'
import { getStatusBarHeight } from "react-native-status-bar-height"
import {
    SafeAreaProvider,
  } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postBoardLikeFlag } from '../../../Redux/Slices/BoardLikeFlagSlice'
import { postBoardLike } from '../../../Redux/Slices/BoardLikeSlice'
import { postBoardAppFlag } from '../../../Redux/Slices/BoardAppFlagSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import { postWinList } from '../../../Redux/Slices/WinListSlice'
import { postHits } from '../../../Redux/Slices/HitsSlice'
import Modal2 from '../../Modal/First'
import { postExperience } from '../../../Redux/Slices/ExperienceSlice'
import { postMyExp } from '../../../Redux/Slices/MyExpSlice'
import RenderHtml from 'react-native-render-html'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
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
        height: 250,
    },
    image:{
        width: '100%',
        height: '100%',
      },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot:{
        backgroundColor: '#E0E0E0',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 3,
        marginBottom: 3
      },
      dotActive:{
        backgroundColor: 'white',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 3,
        marginBottom: 3
    },
    main:{
        height: 220,
        padding: 10,
    },
    mainBox:{
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        height: '50%',
        justifyContent: 'center',
        paddingTop: 10,
    },
    mainBox2:{
        height: '50%',
        justifyContent: 'center',
    },
    main2:{
        height: 10,
        backgroundColor: '#F5F5F5'
    },
    main3:{

    },
    main3Box:{
        height: 56,
        flexDirection: 'row',
    },
    main3FilterBox:{
        width: '50%',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main3Box2:{
        padding: 20,
    },
    main3Box3:{
        borderWidth: 1,
    },
    main3Box3Header:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    main3Box3Main:{
        paddingTop: 60,
        paddingBottom: 60,
        flexDirection: 'row',
    },
    winBox:{
        height: 50,
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    profileBox:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
    },
    footer:{
        height: '12%',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F5F5F5'
    },
    footerBox:{
        borderWidth: 1,
        height: 60,
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    footerBox2:{
        width: '75%',
        height: 60,
        backgroundColor: '#FEA100',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    modalContainer:{
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 15
    },
    modalBox:{
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal:{
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 7,
    },
})
const Talk1Sub = ({navigation, route}) => {

    const info = route.params;
    const exp = useSelector(state => { return state.experience.data; });
    const [info2, setInfo2] = useState(exp);

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const [async, setAsync] = useState(); // 임시저장 및 체험단 정보 저장 유무
    const [userInfo, setUserInfo] = useState(); // user 정보 asyncStorage
    const boardLikeFlag = useSelector(state => { return state.boardLikeFlag.data });
    const boardAppFlag = useSelector(state => { return state.boardAppFlag.data });
    const winList = useSelector(state => { return state.winList.data });
    const [filter, setFilter] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // 체험단 신청정보 입력 -> asnyc storage
    const [modalVisible2, setModalVisible2] = useState(false); // 체험단 신청완료
    const [modalVisible3, setModalVisible3] = useState(false); // 컨텐츠 URL 등록
    const [modal4, setModal4] = useState(false) // 임시저장 불러올거냐
    const [modal, setModal] = useState({
        open: false,
        content: '발표일자 이후 확인이 가능합니다.',
        buttonCount: 1
    })
    const [completeModal ,setCompleteModal] = useState(false); // 신청 완료 모달

    useEffect(()=>{
        dispatch(postBoardLikeFlag({ boardId: info.boardId}));
        dispatch(postExperience({
            order: 'new',
            count: 1,
            page: 1,
        }));
        dispatch(postBoardAppFlag({ experienceId: info?.experienceId}));
        dispatch(postWinList({ experienceId: info.experienceId }));
        dispatch(postMyExp());

        const hits = async() => {
            const hits = await AsyncStorage.getItem('hits');

            hits == null || hits.split('|').filter(x => x == String(info.boardId)) == '' ? 
            (dispatch(postHits({boardId: info.boardId})), AsyncStorage.setItem('hits', String(hits)+`|${info.boardId}`)) : ''
        }
        hits();
    }, [isFocused]);

    useEffect(()=>{
        setInfo2(exp.filter(x => x.boardId == info.boardId));
    }, [exp, boardLikeFlag]);

    useEffect(()=>{
        const load = async() => {
            const asyncStorage = await AsyncStorage.getItem('application');
            const asyncStorage2 = await AsyncStorage.getItem('user');
            const asyncStorage3 = await AsyncStorage.getItem('applicationFlag');
            setUserInfo(JSON.parse(asyncStorage2));
            setAsync(asyncStorage);        
            // setAsyncFlag(asyncStorage3);
        }
        load();
    }, [isFocused]);

    const recommend = async() => {
        dispatch(postBoardLike({ boardId: route.params.boardId, type: 'plus'}));
        setTimeout(()=>{
            dispatch(postExperience({
                order: 'new',
                count: 1,
                page: 1,
            }));
            dispatch(postBoardLikeFlag({ boardId: info.boardId}));
        }, 100);
        
    }

    const recommendminus = async() => {
        dispatch(postBoardLike({ boardId: route.params.boardId, type: 'minus'})); 
        setTimeout(()=>{
            dispatch(postExperience({
                order: 'new',
                count: 1,
                page: 1,
            }));
            dispatch(postBoardLikeFlag({ boardId: info.boardId}));
        }, 100);
    }

    const socialShare = () => {
        Share.share({
            message: `[맘스노트] ${info2[0].title}`,
        })
    }

    const renderItem = ({ item }) => (
        
        <View>
            <Swiper style={styles.header2} showsButtons={false} dot={<View style={styles.dot}/>} activeDot={<View style={styles.dotActive}/>}>
                {info.savedName == null ? '' : (info.savedName.split('|')).map((x, index)=>{
                    return(
                        <View style={styles.slide}>
                            <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}} style={styles.image} key={index}/>
                        </View>
                    )
                })}
                
            </Swiper>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{color: '#9E9E9E', marginBottom: 3}}>신청 {info.appCount}명/모집 {info.maxPeople}명</Text>
                    <Text style={{fontSize: 25}}>{info.title}</Text>
                </View>
                <View style={styles.mainBox2}>
                    <View>
                        <View><Text style={{margin: 2, fontSize: 13}}>신청기간: {moment(info.applicationStartDate).format('YY.MM.DD')} ~ {moment(info.applicationEndDate).format('YY.MM.DD')}</Text></View>
                        <View><Text style={{margin: 2, fontSize: 13}}>발표일자: {moment(info.openDate).format('YY.MM.DD')}</Text></View>
                        <View><Text style={{margin: 2, fontSize: 13}}>등록기간: {moment(info.registrationStartDate).format('YY.MM.DD')} ~ {moment(info.registrationEndDate).format('YY.MM.DD')}</Text></View>
                    </View>
                </View>
            </View>
            <View style={styles.main2}/>
            <View style={styles.main3}>
                <View style={styles.main3Box}>
                    <TouchableOpacity style={[styles.main3FilterBox, {borderBottomColor: filter ? '#BDBDBD' : 'orange'}]} onPress={()=>setFilter(false)}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: filter ? '#BDBDBD' : 'orange'}}>체험 정보</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.main3FilterBox, {borderBottomColor: filter ? 'orange' : 'lightgrey'}]} 
                        onPress={()=>moment(info.openDate).diff(moment(), "days") <= 0 ? setFilter(true) : setModal(prevState => ({...prevState, open: true}))}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: filter ? 'orange' : 'lightgrey'}}>선정 인원</Text>
                    </TouchableOpacity>
                </View>
                <List />
            </View>
        </View>
      );

    const renderItem2 = () => {
        return(
            <>

<FlatList data={DATA} renderItem={renderItem}
 keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
</FlatList>

</>
        )
    }

    const List = ({item}) => {
        switch(filter){
            case false : return (
                <View style={styles.main3Box2}>
                     <RenderHtml source={{html: `${info.contents}`}} tagsStyles={styles} />
                </View>
            )
            case true && winList.length !== 0 : return (
                <View style={styles.main3Box3}>
                    <View style={styles.main3Box3Header}>
                        <Text style={{fontSize: 20}}>축하합니다.</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 20, fontWeight: '500'}}>"맘스노트 신규 체험단" </Text>
                            <Text style={{fontSize: 20}}>당첨자 리스트</Text>
                        </View>
                        <Text style={{color: '#757575', marginTop: 10}}>등록기간에 맞춰 컨텐츠 업로드 해주시기 바랍니다.</Text>
                        <Text style={{color: '#757575'}}>체험 관련 상세 정보는 알림으로 발송됩니다.</Text>
                    </View>
                    <View style={styles.main3Box3Main}>
                        {winList.map((x, index)=>{
                            return(
                                <View style={styles.winBox} key={index}>
                                    <Image source={{uri: x.profileImage}} style={styles.profileBox}/>
                                    <Text style={{fontSize: 15, marginLeft: 3}}>{x.nickname} 님</Text>
                                </View>
                                ) 
                        })}
                    </View>
                </View>
            )
            case true && winList.length == 0  : return (
                <View style={{justifyContent: 'center', alignItems: 'center', padding: 40, height: 200}}>
                    <Text style={{fontSize: 20}}>아직 선정된 인원이 없습니다.</Text>
                </View>
            )
        }
    }


  return boardAppFlag == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
  : (
    <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                    <StatusBar />
            </SafeAreaView>
            <SafeAreaView style={styles.container}>

            <CompleteModal navigation={navigation} modal={completeModal} setModal={setCompleteModal}/>

            <View style={styles.header}>
   <TouchableOpacity onPress={()=>navigation.goBack()}><Back /></TouchableOpacity>
   <View style={styles.headerBar}>
   <TouchableOpacity onPress={socialShare}><Share2 style={{marginRight: 15}}/></TouchableOpacity>
   </View>
</View>

            <FlatList data={DATA} renderItem={renderItem2}
             showsVerticalScrollIndicator={false}>
            </FlatList>


<Modal animationType="fade" transparent={true} visible={modalVisible} statusBarTranslucent={true}
   onRequestClose={() => {
   setModalVisible(!modalVisible)}}>
   <View style={styles.modalContainer}>
       <View style={styles.modalView}>
           <View style={styles.modalContainer2}>
               <View style={styles.modalBox}>
                   <Text style={{fontSize: 16, lineHeight: 25, textAlign: 'center', paddingTop: 20}}>체험단 신청을 하시려면 신청정보를 먼저 작성하셔야 합니다. 지금 작성하시겠습니까?</Text>
               </View>
               <View style={styles.modalBox}>
                   <TouchableOpacity style={styles.modal} onPress={()=>{setModalVisible(!modalVisible), navigation.navigate('신청 정보', route.params)}}>
                       <Text style={{color: 'white', fontSize: 16}}>네</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModalVisible(!modalVisible)}>
                       <Text style={{color: 'black', fontSize: 16}}>취소</Text>
                   </TouchableOpacity>
               </View>
               </View>
           </View>
       </View>
   </Modal>

   <Modal animationType="fade" transparent={true} visible={modalVisible2} statusBarTranslucent={true}
   onRequestClose={() => {
   setModalVisible2(!modalVisible2)}}>
   <View style={styles.modalContainer}>
       <View style={styles.modalView}>
           <View style={styles.modalContainer2}>
               <View style={styles.modalBox}><Text style={{fontSize: 16, paddingTop: 10}}>체험단 신청이 완료되었습니다.</Text></View>
               <View style={styles.modalBox}>
                   <TouchableOpacity style={styles.modal} onPress={()=>setModalVisible2(!modalVisible2)}><Text style={{color: 'white', fontSize: 16}}>확인</Text></TouchableOpacity>
               </View>
               </View>
           </View>
       </View>
   </Modal>

   <Modal animationType="fade" transparent={true} visible={modal4} statusBarTranslucent={true}
   onRequestClose={() => {
   setModal4(!modal4)}}>
   <View style={styles.modalContainer}>
       <View style={styles.modalView}>
           <View style={styles.modalContainer2}>
               <View style={styles.modalBox}>
                   <Text style={{fontSize: 16, paddingTop: 10}}>작성 중이던 게시글이 존재합니다.</Text>
                   <Text style={{fontSize: 16, paddingTop: 5}}>임시저장된 게시글을 불러오시겠습니까?</Text>
               </View>
               <View style={styles.modalBox}>
                   <TouchableOpacity style={styles.modal} onPress={()=>{setModal4(!modal4), navigation.navigate('신청 정보', '신청 정보 불러오기')}}>
                     <Text style={{color: 'white', fontSize: 16}}>신청 정보 불러오기</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>{setModal4(!modal4), navigation.navigate('신청 정보', route.params), AsyncStorage.removeItem('application')}}>
                     <Text style={{color: 'black', fontSize: 16}}>새로 작성하기</Text>
                   </TouchableOpacity>
               </View>
           </View>
       </View>
   </View>
</Modal>

   <ContentsURL modalVisible3={modalVisible3} setModalVisible3={setModalVisible3}/>
   <Modal2 modal={modal} setModal={setModal} />

   {filter ? winList.filter(x=> x.nickname == userInfo.nickname) == '' ?  '' :
   <View style={styles.footer}>
       <TouchableOpacity style={[styles.footerBox2, {width: '100%'}]} onPress={()=>setModalVisible3(!modalVisible3)}>
           <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>컨텐츠 등록</Text>
       </TouchableOpacity>
   </View>
   : <View style={styles.footer}>
   {moment(info.registrationEndDate).diff(moment(), "days") < 0 ?
    <View style={[styles.footerBox, {width: '20%'}]}>
        <Like width={20} fill='#BDBDBD'/>  
        <Text style={{fontSize: 16, fontWeight: '500', color: '#BDBDBD'}}> {info2[0]?.recommend}</Text>
    </View>
   : boardLikeFlag == 0 ? 
   <TouchableOpacity style={[styles.footerBox, {width: '20%'}]} onPress={recommend}>
       <Like width={20} fill='#BDBDBD'/>  
       <Text style={{fontSize: 16, fontWeight: '500', color: '#BDBDBD'}}> {info2[0]?.recommend}</Text>
   </TouchableOpacity>
   :
   <TouchableOpacity style={[styles.footerBox, {width: '20%'}]}  onPress={recommendminus}>
       <Heart width={20} fill='#FEA100'/> 
       <Text style={{fontSize: 16, fontWeight: '500', color: '#FEA100'}}> {info2[0]?.recommend}</Text>
   </TouchableOpacity>
   }

   <View style={[styles.footerBox, {width: '3%', borderWidth: 0}]}></View>
   { boardAppFlag == 200 || boardAppFlag?.status == 200 ?
    <TouchableOpacity style={[styles.footerBox, {width: '75%'}]} onPress={()=>navigation.navigate('신청 정보 확인', route.params)}>
        <Text style={{fontSize: 20, fontWeight: '500'}}>신청 정보 확인</Text>
    </TouchableOpacity>
    :
    moment(info.applicationEndDate).diff(moment(), "days") < 0 ?
    <View style={[styles.footerBox2, {backgroundColor: '#EEEEEE'}]}>
        <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>신청하기</Text>
    </View> :
    <TouchableOpacity style={styles.footerBox2} onPress={()=>
       {!async ?  navigation.navigate('신청 정보', [route.params, '신청하기']) : setModal4(!modal4); }}>
       <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>신청하기</Text>
    </TouchableOpacity>
   }
</View>}

            </SafeAreaView>

        </SafeAreaProvider>
    
  )
}

export default Talk1Sub