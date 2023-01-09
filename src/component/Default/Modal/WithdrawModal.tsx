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

const NoticeModal = ({modal, setModal}) => {

  return (
    <Modal animationType="fade" transparent={true} visible={modal}
            onRequestClose={() => {
            setModal(!modal)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>회원탈퇴가 완료되었습니다.</Text>
                            <Text style={{fontSize: 16, paddingTop: 5}}>맘스노트를 이용해주셔서 감사합니다.</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={()=>setModal(!modal)}>
                              <Text style={{color: 'white', fontSize: 16}}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default NoticeModal