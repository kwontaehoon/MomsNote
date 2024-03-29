import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'

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
        borderRadius: 15
    },
    modalBox:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
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

const CheckBoxModal = ({navigation, modalVisible4, setModalVisible4}) => {

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible4} statusBarTranslucent={true}
    onRequestClose={() => {
    setModalVisible4(!modalVisible4)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={styles.modalContainer2}>
                <View style={[styles.modalBox, {paddingTop: 25}]}><Text style={{fontSize: 16, textAlign: 'center', lineHeight: 25}}>출산 리스트 공유 게시판에 등록되었습니다.</Text></View>
                <View style={styles.modalBox}>
                    <TouchableOpacity style={styles.modal} onPress={()=>{setModalVisible4(!modalVisible4), navigation.navigate('맘스톡', '출산 리스트')}}>
                        <Text style={{color: 'white', fontSize: 16}}>확인</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
    </Modal>
  )
}

export default CheckBoxModal