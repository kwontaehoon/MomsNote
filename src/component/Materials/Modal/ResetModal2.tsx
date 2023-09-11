import React from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Switch, Modal, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    container2:{

    },
    main:{
    },
    mainBox:{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text:{
        fontSize: 15,
    },
    mainBoxSub:{
        width: '50%',
        justifyContent: 'center',
    },
    clockBox:{
        width: 70,
        height: 30,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    main2:{
        height: 120,
    },
    main2Box:{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
const Main = ({modalVisible6, setModalVisible6, setMaterialFlag}) => {

    const confirm = async() => {
        const token = await AsyncStorage.getItem('token');
        if(modalVisible6.content == 0){
           await AsyncStorage.removeItem('materialFlag');
           setMaterialFlag(null);
            try{
                const response = await axios({ 
                  method: 'post',
                  url: 'https://momsnote.net/api/needs/list/reset',
                  headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                  data: {resetStatus: "recommend"}
                });
                console.log('## 추천 리스트 response: ', response);
            }catch(error){
              console.log('실제맘 추천 리스트 error: ', error);
            }

            try{
                const response2 = await axios({ 
                  method: 'post',
                  url: 'https://momsnote.net/api/needs/list/reset/recommend',
                  headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                  data: {}
                });
                console.log('## 추천리스트 response2: ', response2);
            }catch(error){
              console.log('실제맘 추천 리스트 error: ', error);
            }
        }else{
            await AsyncStorage.setItem('materialFlag', 'self');
            setMaterialFlag('self');
            try{
                const response = await axios({ 
                  method: 'post',
                  url: 'https://momsnote.net/api/needs/list/reset',
                  headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                  data: {resetStatus: "self"}
                });
                console.log('## 직접 작성 response: ', response);
            }catch(error){
              console.log('실제맘 추천 리스트 error: ', error);
            }

            try{
                const response = await axios({ 
                      method: 'get',
                      url: 'https://momsnote.net/api/needs/brand/delete',
                      headers: { 
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                      },
                    });
                    console.log('response: ', response);
                }catch(error){
                  console.log('직접 작성 error: ', error);
                }
        }
        setModalVisible6(prevState => ({...prevState, open: false, content: null}))
    }

  return (
        <Modal animationType="fade" transparent={true} visible={modalVisible6.open} statusBarTranslucent={true}
            onRequestClose={() => {
            setModalVisible6(!modalVisible6)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, textAlign: 'center', lineHeight: 25, paddingTop: 10}}>기존 작성내용은 초기화됩니다. 변경하시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={confirm}>
                                <Text style={{color: 'white', fontSize: 16}}>확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModalVisible6(prevState => ({...prevState, open: false}))}>
                                <Text style={{color: 'black', fontSize: 16}}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default Main