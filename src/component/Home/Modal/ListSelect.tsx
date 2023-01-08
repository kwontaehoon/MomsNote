import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Switch, Modal, Platform } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        padding: 20
    },
    modalBox:{
        height: 60,
        justifyContent: 'center'
    },
    modalBox2:{
        height: 44,
        borderWidth: 1,
        borderColor: '#FE7000',
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
    },


})
const Main = ({modal, setModal}) => {

    const click = async() => {
        await AsyncStorage.setItem('recommendList', '1');
        setModal(!modal);
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modal}
    onRequestClose={() => {
    setModal(!modal)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={styles.modalContainer2}>
               <View style={[styles.modalBox, {alignItems: 'center', justifyContent: 'flex-start', height: 50}]}>
                    <Text style={{fontSize: 16, fontWeight: '600'}}>원하는 출산 준비물 리스트를 선택해주세요.</Text>
               </View>
               <View style={styles.modalBox2}>
                    <Text style={{color: '#FE7000', fontSize: 15, fontWeight: '500'}} onPress={click}>실제맘 추천 리스트</Text>
               </View>
               <View style={styles.modalBox}>
                    <Text style={{fontSize: 15}}>많은 임산부들이 추천한 품목을 필수, 권장, 선택 항목으로 나눠서 알기 쉽게 보여준답니다.</Text>
               </View>
               <TouchableOpacity style={styles.modalBox2} onPress={click}>
                    <Text style={{color: '#FE7000', fontSize: 15, fontWeight: '500'}}>직접 작성</Text>
               </TouchableOpacity>
               <View style={styles.modalBox}>
                    <Text style={{fontSize: 15}}>카테고리만 기본 제공하며, 필요한 품목을 직접 작성할 수 있어요.</Text>
               </View>
               <View style={styles.modalBox}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#EF1E1E'}}>Tip! </Text>
                        <Text style={{color: '#757575'}}>초보 엄마라면 추천 리시트를 바탕으로 나에게</Text>
                    </View>
                    <Text style={{color: '#757575'}}>맞는 출산준비물 리스트를 작성해 보세요.</Text>
               </View>
            </View>
        </View>
    </View>
</Modal>
  )
}

export default Main