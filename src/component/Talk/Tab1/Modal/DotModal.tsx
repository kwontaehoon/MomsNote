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
        justifyContent: 'flex-end',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '94%',
        borderRadius: 15,
    },
    main:{
        height: 144,
        backgroundColor: '#424242',
        borderRadius: 10,
    },
    mainBox:{
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#757575'
    
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

const CheckBoxModal = ({modal, setModal}) => {

  return (
    <Modal animationType="slide" transparent={true} visible={modal}
            onRequestClose={() => {
            setModal(!modal)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2, {height: 250}]}>
                       <View style={styles.main}>
                            <TouchableOpacity style={styles.mainBox}><Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>차단하기</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.mainBox}><Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>신고하기</Text></TouchableOpacity>
                       </View>
                       <View style={{height: 10}}></View>
                       <TouchableOpacity style={styles.footer} onPress={()=>setModal(!modal)}>
                            <Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal