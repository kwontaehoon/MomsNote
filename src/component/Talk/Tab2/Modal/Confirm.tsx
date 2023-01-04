import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native'
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

const NoticeModal = ({modal2, setModal2}) => {

  return (
    <Modal animationType="fade" transparent={true} visible={modal2}
            onRequestClose={() => {
            setModal2(!modal2)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={[styles.modalBox, {height: '45%'}]}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>수정 내용을 내 리스트에 적용할까요?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal}><Text style={{color: 'white', fontSize: 16}}>수정</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModal2(!modal2)}><Text style={{color: 'black', fontSize: 16}}>취소</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default NoticeModal