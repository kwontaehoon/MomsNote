import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
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
    modalBox:{
        justifyContent: 'center',
        padding: 10,
    },
    modalBox2:{
        height: 44,
        borderWidth: 1,
        borderColor: '#FE7000',
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#FE7000'
    },


})
const Main = ({navigation, modal, setModal}) => {

    const rec = async() => {
        const token = await AsyncStorage.getItem('token');
            try{
                const response = await axios({ 
                  method: 'post',
                  url: 'https://momsnote.net/api/needs/list/rec',
                  headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                  data: {
                    order: 'need'
                  }
                });
                console.log('실제맘 추천 리스트 response: ', response.data);
            }catch(error){
              console.log('실제맘 추천 리스트 error: ', error);
            }
            AsyncStorage.setItem('recommendList', '1');
            setModal(false);
            navigation.navigate('출산 준비물');
    }

    const self = async() => {
        const token = await AsyncStorage.getItem('token');
            try{
                const response = await axios({ 
                method: 'post',
                url: 'https://momsnote.net/api/needs/list/self',
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: {
                    order: 'need'
                }
                });
                console.log('직접 작성 response: ', response.data);
            }catch(error){
            console.log('직접 작성 error: ', error);
            }
            AsyncStorage.setItem('recommendList', '1');
            setModal(!modal);
            navigation.navigate('출산 준비물');
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true}
        onRequestClose={() => {
    setModal(!modal)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={styles.modalContainer2}>
               <View style={[styles.modalBox, {justifyContent: 'flex-start'}]}>
                    <Text style={{fontSize: 15, textAlign: 'center', lineHeight: 20}}>출산 준비물 리스트를 생성합니다. 실제 맘들이 추천한 리스트로 보시겠어요?</Text>
               </View>
               <TouchableOpacity style={styles.modalBox2} onPress={rec}>
                    <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>네, 추천 리스트로 보여주세요.</Text>
               </TouchableOpacity>
               <View style={styles.modalBox}>
                    <Text style={{fontSize: 15, lineHeight: 20}}>많은 임산부들이 추천한 품목을 필수, 권장, 선택 항목으로 나눠서 알기 쉽게 보여줘요!</Text>
               </View>
               <TouchableOpacity style={styles.modalBox2} onPress={self}>
                    <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>아니요, 직접 작성할게요.</Text>
               </TouchableOpacity>
               <View style={styles.modalBox}>
                    <Text style={{fontSize: 15, lineHeight: 20}}>카테고리만 기본 제공하며, 필요한 품목을 직접 작성할 수 있어요.</Text>
               </View>
               <View style={styles.modalBox}>
                    <Text style={{color: '#EF1E1E', fontSize: 13, lineHeight: 20}}>Tip! 
                        <Text style={{color: '#757575', fontSize: 13}}> 초보 엄마라면 추천 리스트를 바탕으로 나에게 맞는 출산준비물 리스트를 작성해 보세요.</Text>
                    </Text>
               </View>
            </View>
        </View>
    </View>
</Modal>
  )
}

export default Main