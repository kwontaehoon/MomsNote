import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox'

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
        width: '80%',
        height: 144,
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

const CheckBoxModal = ({modalVisible4, setModalVisible4}) => {

    const [isChecked, setChecked] = useState(false); // check box 선택시 체크 팝업에서의 check box

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible4}
    onRequestClose={() => {
    setModalVisible4(!modalVisible4)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={styles.modalContainer2}>
                <View style={styles.modalBox}><Text style={{fontSize: 16, paddingTop: 10}}>출산 리스트 공유 게시판에 등록되었습니다.</Text></View>
                <View style={styles.modalBox}>
                    <TouchableOpacity style={styles.modal} onPress={()=>setModalVisible4(!modalVisible4)}><Text style={{color: 'white', fontSize: 16}}>확인</Text></TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
    </Modal>
  )
}

export default CheckBoxModal