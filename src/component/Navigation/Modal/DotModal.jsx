import React, { useState } from 'react'
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
        justifyContent: 'flex-end',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '94%',
        borderRadius: 15,
        marginBottom: 20
    },
    main:{
        height: 62,
        backgroundColor: '#424242',
        borderRadius: 10,
        borderColor: '#757575',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer:{
        height: 62,
        backgroundColor: '#424242',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#757575',
        borderWidth: 1,
    }
})

const CheckBoxModal = ({modal, setModal, modal2, setModal2}) => {

  return (
    <Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal(!modal)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                       <TouchableOpacity style={styles.main} activeOpacity={1} onPress={()=>(setModal2(!modal2), setModal(!modal))}>
                            <Text style={{color: '#F23737', fontWeight: '600', fontSize: 20}}>삭제하기</Text>
                       </TouchableOpacity>
                       <View style={{height: 10}}></View>
                       <TouchableOpacity style={styles.footer} onPress={()=>setModal(!modal)} activeOpacity={1}>
                            <Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal