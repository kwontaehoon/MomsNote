import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import axios from 'axios'

import Arrow_Right from '../../../../public/assets/svg/Arrow-Right.svg'
import Reset from '../../../../public/assets/svg/Reset.svg'
import Crwon from '../../../../public/assets/svg/crown.svg'
import { postMaterial } from '../../../Redux/Slices/MaterialSlice'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
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
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        height: 640,
        overflow: 'hidden',
    },
    header:{
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        height: '13%',
        justifyContent: 'center',
        padding: 15,
    },
    closeBox:{
        position: 'absolute',
        right: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 10
    },
    main:{
        height: '50%',
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainBox:{
        height: 95,
        flexDirection: 'row',
    },
    mainBoxSub:{
        width: '33.4%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer:{
        height: '37%',
        backgroundColor: '#F5F5F5',
        paddingLeft: 20,
        paddingRight: 20,
    },
    footerBox:{
        justifyContent: 'center',
        height: '25%',
    },
    resetBox:{
        position: 'absolute',
        right: 0,
        zIndex: 999,
        alignItems: 'center',
        flexDirection: 'row',
    },
    footerBox2:{
        flexDirection: 'row',
        height: '27%',
        paddingBottom: 15,
    },
    textInput:{
        width: '47%',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 2,
    },
    redDot:{
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#EF1E1E',
        position: 'absolute',
        right: '49%',
    },
    footerBox3:{
        backgroundColor: '#FEA100',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        height: 52,
    },
    footerBox4:{
        height: '10%',
        marginTop: 15,
    },
})

const Main = ({modalVisible2, setModalVisible2, modal, setModal, setModal2}) => {

    const dispatch = useDispatch();
    const [info, setInfo] = useState(); // 브랜드 lists
    console.log('브랜드 리스트: ', info);
    const [selectBrand, setSelectBrand] = useState({
        needsId: null,
        needsBrandId: 0,
        itemName: '',
        itemPrice: 0,
        needsDataId: null,
        itemBrand: '',
    });
    console.log('select Brand: ', selectBrand);

    useEffect(()=>{
        const commentInfo = async() => {
            try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/needs/brand/list',
                headers: { 
                    'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzIxMzQ3OTQsImV4cCI6MTY3NDcyNjc5NH0.mWpz6urUmqTP138MEO8_7WcgaNcG2VkX4ZmrjU8qESo', 
                    'Content-Type': 'application/json'
                  },
                data: { 
                  needsId: modalVisible2.needsId,
                }
            });
            setInfo(response.data);
            }catch(error){
                console.log('comment axios error:', error);
                setInfo(undefined);
            }
        } 
        commentInfo();
        setSelectBrand(prevState => ({...prevState, needsId: modalVisible2.needsId, needsDataId: modalVisible2.needsDataId == null ? 0 : modalVisible2.needsDataId}));
    }, [modalVisible2]);

    const submit = async() => {
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/needs/add/brand',
                headers: { 
                    'Authorization': `bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                data: selectBrand
            });
            console.log('response: ', response.data);
            setInfo(response.data);
            }catch(error){
                console.log('comment axios error:', error)
            }
            dispatch(postMaterial({order: 'need'}));
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.mainBox} onPress={()=>setSelectBrand((prevState) => ({...prevState, itemName: item.brandName, itemPrice: item.price, needsBrandId: item.needsBrandId, itemBrand: item.productName, needsDataId: item.needsBrandId }))}>
            <View style={[styles.mainBoxSub, {width: '24%'}]}>
                <Crwon />
            </View>
            <View style={[styles.mainBoxSub, {width: '40%', alignItems: 'flex-start'}]}>
                <Text style={{fontWeight: '500', marginBottom: 3}}>[{item.brandName}]</Text>
                <Text style={{marginBottom: 3, color: '#757575'}} ellipsizeMode='tail' numberOfLines={1}>{item.productName}</Text>
                <Text style={{color: '#9E9E9E'}}>구매 344건</Text>
            </View>
            <View style={[styles.mainBoxSub, {width: '36%', alignItems: 'flex-end'}]}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
                    <Text style={{fontSize: 16, fontWeight: '600', marginRight: 5}}>{(item.price).toLocaleString()}</Text>
                    <Text>원</Text>
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: '600', fontSize: 13, color: '#FEA100'}}>최저가 보기</Text>
                    <Arrow_Right fill='#FEA100' width={16} height={16}/>
                </View>
            </View>
        </TouchableOpacity>
    );

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible2.open} statusBarTranslucent={true}
        onRequestClose={() => {
        setModalVisible2(!modalVisible2)}}>
        <KeyboardAvoidingView behavior='height' style={styles.modalContainer}>
            <View style={styles.modalView}>
                <View style={styles.modalContainer2}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.closeBox} 
                            onPress={()=>(setSelectBrand(prevState => ({...prevState, itemBrand: '', itemName: ''})),setModalVisible2((prevState)=> ({...prevState, open: false})))}>
                                <Icon name='close' size={24}/>
                        </TouchableOpacity>
                        <Text style={{color: '#212121', fontSize: 18, fontWeight: '700'}}>브랜드 선택</Text>
                        <Text style={{color: '#212121'}}>수유브라 Best</Text>
                    </View>
                    <View style={styles.main}>
                        {info == undefined || info.length == 0 ? <View><Text style={{fontSize: 15, color: '#757575'}}>등록된 품목이 없습니다.</Text></View>
                        :
                        <FlatList data={info} renderItem={renderItem}
                            keyExtractor={item => String(item.needsBrandId)} showsVerticalScrollIndicator={false}>
                        </FlatList>}
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.footerBox}>
                            <TouchableOpacity style={styles.resetBox} onPress={()=>{setSelectBrand((prevState)=> ({...prevState, itemName: '', itemBrand: ''}))}}>
                                <Text style={{marginRight: 5, color: '#757575'}}>초기화</Text>
                                <Reset width={18} fill='#757575'/>
                            </TouchableOpacity>
                            <Text style={{color: '#212121', fontSize: 16, fontWeight: '700'}}>브랜드 추가</Text>
                        </View>
                        <View style={styles.footerBox2}>
                            <View style={styles.textInput}>
                                {/* {selectBrand.itemBrand == '' ? <View style={styles.redDot}></View> : ''} */}
                                <TextInput placeholder='브랜드명' value={selectBrand.itemBrand} numberOfLines={1}  style={{paddingLeft: 10}}
                                    onChangeText={(e) => setSelectBrand(prevState => ({ ...prevState, itemBrand: e}))}>   
                                </TextInput>
                            </View>

                            <View style={{width: '6%'}}></View>

                            <View style={styles.textInput}>
                                {/* {selectBrand.itemName == '' ? <View style={[styles.redDot, {right: '58%'}]}></View> : ''} */}
                                <TextInput placeholder='제품명' value={selectBrand.itemName} numberOfLines={1} style={{paddingLeft: 10}}
                                    onChangeText={(e) => setSelectBrand(prevState => ({...prevState, itemName: e}))}>
                                </TextInput>
                                </View>
                            </View> 
                        <TouchableOpacity style={styles.footerBox3} onPress={()=>{
                            selectBrand.itemName == '' || selectBrand.itemBrand == '' ? (setModalVisible2(prevState => ({...prevState, open: false})), setModal(!modal))
                            : (submit(), setSelectBrand(prevState => ({...prevState, itemName: '', itemBrand: ''})), setModalVisible2(prevState => ({...prevState, open: false})), setModal2(prevState => ({...prevState, open: true, content: '리스트에 적용되었습니다.', buttonCount: 1})))
                        }}><Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>적용</Text></TouchableOpacity>
                        <View style={styles.footerBox4}><Text>#해시태그</Text></View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    </Modal>
  )
}

export default Main