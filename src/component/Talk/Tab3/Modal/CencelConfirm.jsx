import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Switch, Modal, Platform } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'

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
        height: 160,
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
const Main = ({modal5, setModal5}) => {

  return (
    <Modal animationType="fade" transparent={true} visible={modal5} statusBarTranslucent={true}
    onRequestClose={() => {
    setModal5(!modal5)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={styles.modalContainer2}>
                <View style={styles.modalBox}><Text style={{fontSize: 16, paddingTop: 10}}>참가하신 체험단 신청이 취소되었습니다.</Text></View>
                <View style={styles.modalBox}>
                    <TouchableOpacity style={styles.modal} onPress={()=>setModal5(!modal5)}><Text style={{color: 'white', fontSize: 16}}>확인</Text></TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
    </Modal>
  )
}

export default Main