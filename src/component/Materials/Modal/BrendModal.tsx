import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

import Arrow_Right from '../../../../public/assets/svg/Arrow-Right.svg'
import Reset from '../../../../public/assets/svg/Reset.svg'

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
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    footerBox2:{
        flexDirection: 'row',
        height: '27%',
        paddingBottom: 15,
    },
    textInput:{
        width: '47%',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 2,
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

const Main = ({modalVisible2, setModalVisible2, setModal}) => {

    const [info, setInfo] = useState([]); // 브랜드 list
    const [selectBrand, setSelectBrand] = useState({
        needsId: 0,
        needsBrandId: '',
        itemName: '',
        itemPrice: '',
    });

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
                  needsId: 11,
                }
            });
            setInfo(response.data);
            console.log('response: ', response.data);
            }catch(error){
                console.log('comment axios error:', error)
            }
        } 
        commentInfo();
        setSelectBrand(prevState => ({...prevState, needsId: modalVisible2.needsId}));
    }, [modalVisible2]);

    const submit = async() => {
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/needs/add/brand',
                headers: { 
                    'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzIxMzQ3OTQsImV4cCI6MTY3NDcyNjc5NH0.mWpz6urUmqTP138MEO8_7WcgaNcG2VkX4ZmrjU8qESo', 
                    'Content-Type': 'application/json'
                  },
                data: selectBrand
            });
            setInfo(response.data);
            }catch(error){
                console.log('comment axios error:', error)
            }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.mainBox} onPress={()=>setSelectBrand((prevState) => ({...prevState, itemName: item.brandName, itemPrice: item.price, needsBrandId: item.needsBrandId}))}>
            <View style={[styles.mainBoxSub, {width: '24%'}]}>
                <Text>사진</Text>
            </View>
            <View style={[styles.mainBoxSub, {width: '40%', alignItems: 'flex-start'}]}>
                <Text style={{fontWeight: '500', marginBottom: 3}}>[{item.brandName}]</Text>
                <Text style={{marginBottom: 3, color: '#757575'}} ellipsizeMode='tail' numberOfLines={1}>{item.productName}</Text>
                <Text style={{color: '#9E9E9E'}}>구매 344건</Text>
            </View>
            <View style={[styles.mainBoxSub, {width: '36%', alignItems: 'flex-end'}]}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
                    <Text style={{fontSize: 16, fontWeight: '600', marginRight: 5}}>{item.price}</Text>
                    <Text>원</Text>
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: '600', fontSize: 13, color: '#FEA100'}}>최저가 보기</Text>
                    <Arrow_Right fill='red' width={16} height={16}/>
                </View>
            </View>
        </TouchableOpacity>
    );

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible2.open}
        onRequestClose={() => {
        setModalVisible2((prevState)=> ({...prevState, open: true}))}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={styles.modalContainer2}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible2((prevState)=> ({...prevState, open: false}))}><Icon name='close' size={24}/></TouchableOpacity>
                    <Text style={{color: '#212121', fontSize: 18, fontWeight: '700'}}>브랜드 선택</Text>
                    <Text style={{color: '#212121'}}>수유브라 Best</Text>
                </View>
                <View style={styles.main}>
                    <FlatList data={info} renderItem={renderItem}
                        keyExtractor={item => String(item.needsBrandId)} showsVerticalScrollIndicator={false}>
                    </FlatList>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerBox}>
                        <View style={styles.resetBox}>
                            <Text style={{marginRight: 5}}>초기화</Text>
                            <TouchableOpacity onPress={()=>{console.log('초기화 ㄱㄱ'), setSelectBrand((preState)=> ({...preState, title: '', price: ''}))}}><Reset width={18}/></TouchableOpacity>
                        </View>
                        <Text style={{color: '#212121', fontSize: 16, fontWeight: '700'}}>브랜드 추가</Text>
                    </View>
                    <View style={styles.footerBox2}>
                        {selectBrand.itemName !== '' ? <TextInput style={styles.textInput} placeholder='브랜드명/제품명' value={selectBrand.itemName}></TextInput>
                        : <TextInput style={styles.textInput} placeholder='브랜드명/제품명'></TextInput>}
                        <View style={{width: '6%'}}></View>
                        {selectBrand.itemPrice !== '' ? <TextInput style={styles.textInput} placeholder='가격(원)' value={String(selectBrand.itemPrice)}></TextInput>
                        : <TextInput style={styles.textInput} placeholder='가격(원)'></TextInput>}
                    </View> 
                    <TouchableOpacity style={styles.footerBox3} onPress={()=>{
                        selectBrand.itemName == '' ? setModal((prevState) => ({...prevState, open: true, content: '브랜드/제품명은 필수 입력 항목입니다.', buttonCount: 1}))
                        : (submit(), setModalVisible2((prevState)=> ({...prevState, open: false})), setModal((prevState) => ({...prevState, open: true, content: '리스트에 적용되었습니다.', buttonCount: 1})))
                    }}><Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>적용</Text></TouchableOpacity>
                    <View style={styles.footerBox4}><Text>#해시태그</Text></View>
                </View>
            </View>
        </View>
    </View>
</Modal>
  )
}

export default Main