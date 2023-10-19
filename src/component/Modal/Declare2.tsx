import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const styles = StyleSheet.create({
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
        borderRadius: 15,
        padding: 20,
    },
    header:{
        height: '15%',
        alignItems: 'center',
    },
    closeBox:{
        position: 'absolute',
        right: 0,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1
    },
    main:{
        height: '65%',
    },
    mainBox:{
        height: 44,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    mainBox2:{
        height: 200,
        paddingLeft: 15,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        justifyContent: 'center',
        paddingRight: 15,
        marginTop: 10,
        paddingBottom: 150,
    },
    arrowBox:{
        position: 'absolute',
        right: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollBox:{
        position: 'absolute',
        height: 200,
        width: '100%',
        top: 53,
        left: 0,
        backgroundColor: 'white',
        zIndex: 999,
        shadowColor: "#000",
        elevation: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE'
    },
    listBox:{
        height: 52,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    dropDownBox:{
        height: '100%',
        borderRadius: 0,
        borderWidth: 0,
    },
    footer:{
        height: 44,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        position: 'relative',
        zIndex: -999,
    },

})

const CheckBoxModal = ({modal4, setModal4, modal6, setModal6, commentsId}) => {

    const DATA = [
        {
            id: '0',
            title: '스팸성 홍보물',
        },
        {
            id: '1',
            title: '불법정보 포함',
        },
        {
            id: '2',
            title: '욕설/혐오/차별적인 표현',
        },
        {
            id: '3',
            title: '개인정보 노출',
        },
        {
            id: '4',
            title: '기타',
        },
    ];

    const [titleDisplay, setTitleDisplay] = useState(false); // 품목 리스트 display
    const [info, setInfo] = useState({
        sort: 'comments',
        commentsId: commentsId[1],
        userId: '',
        reason: '신고 사유',
        reasonDetails: '',
    });

    const submit = async() => {
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                  method: 'post',
                  url: 'https://momsnote.net/api/report/comments',
                  headers: { 
                      'Authorization': `bearer ${token}`
                    },
                    data: info
                });
            }catch(error){
            }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listBox} onPress={()=>{setInfo((prevState) => ({ ...prevState, reason: item.title})), setTitleDisplay(false)}}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

    const arrowIcon = () => {
        if(!titleDisplay){return(<Icon2 name='angle-down' size={22}/>)
        }else return(<Icon2 name='angle-up' size={22}/>)
    }
    

  return (
    <Modal animationType="fade" transparent={true} visible={modal6} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal6(!modal6)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    
                    <View style={[styles.modalContainer2, {height: 404}]}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.closeBox} onPress={()=>setModal6(!modal6)}><Icon name='close' size={24}/></TouchableOpacity>
                            <Text style={{color: '#212121', fontSize: 18, fontWeight: '500'}}>신고하기</Text>
                        </View>
                        <View style={styles.main}>
                        <View style={[styles.scrollBox, {display: titleDisplay ? 'flex' : 'none'}]}>
                        <FlatList data={DATA} renderItem={renderItem} initialNumToRender={4} 
                            keyExtractor={item => item.id}>
                        </FlatList>
                    </View>
                            <TouchableOpacity style={styles.mainBox} onPress={()=>setTitleDisplay(!titleDisplay)}>
                                <View style={styles.arrowBox}>{arrowIcon()}</View>
                                <Text>{info.reason}</Text>
                            </TouchableOpacity>
                            
                            <TextInput style={[styles.mainBox2, {paddingLeft: 15, position: 'relative', zIndex: -999}]} placeholder='신고사유를 상세하게 적어주세요.' placeholderTextColor={'#9E9E9E'}
                                onChangeText={(e) => setInfo((prevState) => ({ ...prevState, reasonDetails: e}))}>
                            </TextInput>
                        </View>
                        {info.reason !== '신고 사유' && info.reasonDetails.length !== 0 ?
                            <TouchableOpacity style={[styles.footer, {backgroundColor: '#FEA100'}]} onPress={()=>{submit(), setModal6(!modal6), setModal4(!modal4), setInfo((prevState) => ({ ...prevState, contents: ''}))}}>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>신고하기</Text>
                            </TouchableOpacity> : 
                            
                            <View style={[styles.footer, {backgroundColor: '#E0E0E0'}]}>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>신고하기</Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal