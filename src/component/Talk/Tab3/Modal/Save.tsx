import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Switch, Modal, Platform } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        paddingLeft: 15,
        paddingRight: 15,
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
        paddingLeft: 15,
        paddingRight: 15,
    },
    main3:{
        height: 360,
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
        height: 220,
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
const Main = ({navigation, modal6, setModal6, info}) => {

    const save = (e) => {
        e == 1 ? AsyncStorage.setItem('application', JSON.stringify(info)) : AsyncStorage.removeItem('application');
        setModal6(!modal6);
        navigation.goBack();
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modal6}
    onRequestClose={() => {
    setModal6(!modal6)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={[styles.modalContainer2, {height: 220}]}>
                <View style={styles.modalBox}>
                    <Text style={{fontSize: 16, paddingTop: 10}}>작성 중인 내용이 존재합니다.</Text>
                    <Text style={{fontSize: 16, paddingTop: 5}}>해당 내용을 임시저장하시겠습니까?</Text>
                </View>
                <View style={styles.modalBox}>
                    <TouchableOpacity style={styles.modal} onPress={()=>save(1)}>
                        <Text style={{color: 'white', fontSize: 16}}>네</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>save(0)}>
                        <Text style={{color: 'black', fontSize: 16}}>아니요</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
</Modal>
  )
}

export default Main