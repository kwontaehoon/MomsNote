import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, StatusBar } from 'react-native'
import Icon2 from 'react-native-vector-icons/AntDesign'
import ContentsURL from './Modal/ContentsURL'
import axios from 'axios'
import moment from 'moment'

import Like from '../../../../public/assets/svg/Like.svg'
import Like2 from '../../../../public/assets/svg/Heart.svg'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postBoardLikeFlag } from '../../../Redux/Slices/BoardLikeFlagSlice'
import { postBoardLike } from '../../../Redux/Slices/BoardLikeSlice'
import { postBoardAppFlag } from '../../../Redux/Slices/BoardAppFlagSlice'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    header:{
        height: 250,
        backgroundColor: 'yellow',
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
        paddingTop: 20,
        paddingBottom: 20,
    },
    main3Box3:{
        paddingTop: 20,
        paddingBottom: 20,
    },
    main3Box3Header:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    main3Box3Main:{
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
        justifyContent: 'center'
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
        margin: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '80%',
        height: 144,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15
    },
    modalBox:{
        height: '50%',
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
        marginBottom: 3,
    },
})
const Talk1Sub = ({navigation, route}) => {

    console.log('route: ', route.params);
    const info = route.params;

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const dispatch = useDispatch();
    const boardLikeFlag = useSelector(state => { return state.boardLikeFlag.data });
    console.log('boardLikeFlag', boardLikeFlag);
    const boardLike = useSelector(state => { return state.boardLikeFlag.data });
    console.log('boardLike: ', boardLike);
    const boardLikeFlagSet = useSelector(state => { return state.boardLikeFlag.refresh });
    console.log('boardLikeFlagSet: ', boardLikeFlagSet);
    const boardLikeSet = useSelector(state => { return state.boardLike.refresh });
    console.log('boardLikeSet: ', boardLikeSet);

    const boardAppFlag = useSelector(state => {return state.boardAppFlag.data});
    console.log('boardAppFlag: ', boardAppFlag);
    
    const [filter, setFilter] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // 체험단 신청정보 입력 -> asnyc storage
    const [modalVisible2, setModalVisible2] = useState(false); // 체험단 신청완료
    const [modalVisible3, setModalVisible3] = useState(false); // 컨텐츠 URL 등록

    useEffect(()=>{
        dispatch(postBoardLikeFlag({ boardId: info.boardId}));
        // dispatch(postBoardLike({ boardId: info.boardId, type: 'plus'}));
        // dispatch(postBoardAppFlag({ experienceId: 1 }));
    }, []);

    const recommend = async() => {
        
    }

    const renderItem = ({ item }:any) => (
        
        <View>
            <View style={styles.header}>

            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{color: '#9E9E9E', marginBottom: 3}}>신청 36명/모집 {info.maxPeople}명</Text>
                    <Text style={{fontSize: 25}}>맘스노트 신규체험단 모집</Text>
                </View>
                <View style={styles.mainBox2}>
                    <View>
                        <View><Text style={{margin: 2, fontSize: 15}}>신청기간: {moment(info.applicationStartDate).format('YY.MM.DD')} ~ {moment(info.applicationEndDate).format('YY.MM.DD')}</Text></View>
                        <View><Text style={{margin: 2, fontSize: 15}}>발표일자: {moment(info.openDate).format('YY.MM.DD')}</Text></View>
                        <View><Text style={{margin: 2, fontSize: 15}}>등록기간: {moment(info.registrationStartDate).format('YY.MM.DD')} ~ {moment(info.registrationEndDate).format('YY.MM.DD')}</Text></View>
                    </View>
                </View>
            </View>
            <View style={styles.main2}/>
            <View style={styles.main3}>
                <View style={styles.main3Box}>
                    <TouchableOpacity style={[styles.main3FilterBox, {borderBottomColor: filter ? '#BDBDBD' : 'orange'}]} onPress={()=>setFilter(false)}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: filter ? '#BDBDBD' : 'orange'}}>체험 정보</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.main3FilterBox, {borderBottomColor: filter ? 'orange' : 'lightgrey'}]} onPress={()=>setFilter(true)}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: filter ? 'orange' : 'lightgrey'}}>선정 인원</Text>
                    </TouchableOpacity>
                </View>
                <List />
            </View>
        </View>
      );

    const List = ({item}:any) => {
        switch(filter){
            case false : return (
                <View style={styles.main3Box2}>
                    <Text>체험정보 입니다.</Text>
                </View>
            )
            case true : return (
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
                        <View style={styles.winBox}>
                            <View style={styles.profileBox}></View>
                            <Text> 닉네임 님</Text>
                        </View>
                        <View style={styles.winBox}>
                            <View style={styles.profileBox}></View>
                            <Text> 닉네임 님</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }


  return (
    <View style={styles.container}>

        <StatusBar translucent={true} />

         <Modal animationType="fade" transparent={true} visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2, {height: 220}]}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>체험단 신청을 하시려면</Text>
                            <Text style={{fontSize: 16, paddingTop: 5}}>신청정보를 먼저 작성하셔야 합니다.</Text>
                            <Text style={{fontSize: 16, paddingTop: 5}}>지금 작성하시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal}><Text style={{color: 'white', fontSize: 16}}>네</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]}><Text style={{color: 'black', fontSize: 16}}>취소</Text></TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal animationType="fade" transparent={true} visible={modalVisible2}
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

            <ContentsURL modalVisible3={modalVisible3} setModalVisible3={setModalVisible3}/>

        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
        <View style={styles.footer}>
            <View style={[styles.footerBox, {width: '20%'}]}>
                {boardLikeFlagSet == 0 ? <Like width={20} fill='#BDBDBD'/> : <Like width={20} fill='#FEA100'/> }
                <Text style={{fontSize: 16, fontWeight: '500', color: '#BDBDBD'}}> {boardLike}</Text>
            </View>
            <View style={[styles.footerBox, {width: '3%', borderWidth: 0}]}></View>
            { boardAppFlag == 0 ? 
            <TouchableOpacity style={[styles.footerBox, {width: '75%'}]} onPress={()=>navigation.navigate('신청 정보')}>
                <Text style={{fontSize: 20, fontWeight: '500'}}>신청 정보 확인</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.footerBox2} onPress={()=>setModalVisible(!modalVisible)}>
                <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>신청하기</Text>
            </TouchableOpacity>}
        </View> 
    </View>
  )
}

export default Talk1Sub