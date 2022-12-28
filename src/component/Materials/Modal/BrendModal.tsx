import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'

import Arrow_Right from '../../../../public/assets/svg/Arrow-Right.svg'

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
        height: 144,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15
    },
    header:{
        borderWidth: 1,
        height: '15%',
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
        borderWidth: 1,
        height: '50%',
        padding: 15,
    },
    mainBox:{
        height: 120,
        borderWidth: 1,
        flexDirection: 'row',
    },
    mainBoxSub:{
        borderWidth: 1,
        width: '33.4%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer:{
        borderWidth: 1,
        height: '35%',
        backgroundColor: '#EEEEEE',
        padding: 15,
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
        height: '30%',
    },
    textInput:{
        width: '47%',
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 2,
    },
    footerBox3:{
        backgroundColor: '#FEA100',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        height: 52,
        marginTop: 10,
    },
    footerBox4:{
        borderWidth: 1,
        height: '10%',
    },
})

const Main = ({modalVisible2, setModalVisible2, navigation}) => {

    const [info, setInfo] = useState([]);

    useEffect(()=>{
        const commentInfo = async() => {
            try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/needs/brand',
                headers: { 
                    'Content-Type': 'application/json'
                  },
                data : { 
                  needsId: 11
                }
            });
            setInfo(response.data);
            }catch(error){
                console.log('comment axios error:', error)
            }
        } 
        commentInfo();
      }, []);

    const renderItem = ({ item }) => (
        <View style={styles.mainBox}>
            <View style={[styles.mainBoxSub, {width: '24%'}]}>
                <Text>사진</Text>
            </View>
            <View style={[styles.mainBoxSub, {width: '40%', alignItems: 'flex-start'}]}>
                <Text style={{fontWeight: '500', marginBottom: 3}}>[{item.brandName}]</Text>
                <Text style={{marginBottom: 3}} ellipsizeMode='tail' numberOfLines={1}>{item.productName}</Text>
                <Text style={{color: '#B5B5B5'}}>구매 344건</Text>
            </View>
            <View style={[styles.mainBoxSub, {width: '36%', alignItems: 'flex-end'}]}>
                <Text>{item.price}원</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{fontWeight: '600', fontSize: 15, color: '#FEA100'}}>최저가 보기</Text>
                    <Arrow_Right fill='red'  height={18}/>
                </View>
            </View>
           
        </View>
    );

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible2}
        onRequestClose={() => {
        setModalVisible2(!modalVisible2)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={[styles.modalContainer2, {height: 626}]}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible2(!modalVisible2)}><Icon name='close' size={24}/></TouchableOpacity>
                    <Text style={{color: '#212121', fontSize: 18, fontWeight: '700'}}>브랜드 선택</Text>
                    <Text style={{color: '#212121'}}>수유브라 Best</Text>
                </View>
                <View style={styles.main}>
                    <FlatList data={info} renderItem={renderItem}
                        keyExtractor={item => item.id}>
                    </FlatList>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerBox}>
                        <View style={styles.resetBox}>
                            <Text style={{marginRight: 5}}>초기화</Text>
                            <Icon2 name='refresh' size={22}/>
                        </View>
                        <Text style={{color: '#212121', fontSize: 16, fontWeight: '700'}}>브랜드 추가</Text>
                    </View>
                    <View style={styles.footerBox2}>
                        <TextInput style={styles.textInput} placeholder='브랜드명/제품명'></TextInput>
                        <View style={{width: '6%'}}></View>
                        <TextInput style={styles.textInput} placeholder='가격(원)'></TextInput>
                    </View>
                    <TouchableOpacity style={styles.footerBox3}><Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>적용</Text></TouchableOpacity>
                    <View style={styles.footerBox4}></View>
                </View>
            </View>
        </View>
    </View>
</Modal>
  )
}

export default Main