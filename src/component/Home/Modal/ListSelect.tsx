import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, BackHandler } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { postNeedsCounting } from '../../../Redux/Slices/NeedsCountingSlice'
import { postNeedsCountingSelf } from '../../../Redux/Slices/NeedsCountingSelfSlice'

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
    counting:{
        position: 'absolute',
        right: 15,
    }
})
const Main = ({navigation, modal, setModal}) => {

    const dispatch = useDispatch();
    const reccount = useSelector(state => { return state.needsCounting.data; });
    const selfcount = useSelector(state => { return state.needsCountingSelf.data; });

    useEffect(()=>{
        dispatch(postNeedsCounting({type: '추천'}));
        dispatch(postNeedsCountingSelf({type: '직접'}))
    }, []);

    const rec = async() => {
        AsyncStorage.removeItem('materialFlag');
        AsyncStorage.setItem('recommendList', 'rec');
        navigation.navigate('출산 준비물');
    }

    const self = async() => {
        AsyncStorage.setItem('materialFlag', 'self');
        AsyncStorage.setItem('recommendList', 'self')
        navigation.navigate('출산 준비물');
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true} hardwareAccelerated
        onRequestClose={() => {
    setModal(!modal)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={styles.modalContainer2}>
               <View style={[styles.modalBox, {justifyContent: 'flex-start'}]}>
                    <Text style={{fontSize: 15, textAlign: 'center', lineHeight: 20}}>출산 준비물 리스트를 생성합니다. 실제 맘들이 추천한 리스트로 보시겠어요?</Text>
               </View>
               <TouchableOpacity style={styles.modalBox2} onPress={rec}>
                    <View style={styles.counting}><Text>{reccount.data}</Text></View>
                    <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>네, 추천 리스트로 보여주세요.</Text>
               </TouchableOpacity>
               <View style={styles.modalBox}>
                    <Text style={{fontSize: 15, lineHeight: 20}}>많은 임산부들이 추천한 품목을 필수, 권장, 선택 항목으로 나눠서 알기 쉽게 보여줘요!</Text>
               </View>
               <TouchableOpacity style={styles.modalBox2} onPress={self}>
                    <View style={styles.counting}><Text>{selfcount.data}</Text></View>
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