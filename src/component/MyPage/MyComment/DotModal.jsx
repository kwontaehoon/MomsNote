import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

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
        marginBottom: 25,
    },
    main:{
        height: 124,
        backgroundColor: '#424242',
        borderRadius: 10,
        justifyContent: 'center'
    },
    mainBox:{
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#757575',
    },
    footer:{
        height: 62,
        backgroundColor: '#424242',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }
})

const CheckBoxModal = ({modal, setModal}) => {

    const commentDelete = async() => {
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                  method: 'post',
                  url: 'https://momsnote.net/api/comments/delete',
                  headers: { 
                    'Authorization': `bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                  data: { commentsId: modal.commentsId }
                });
            }catch(error){
            }
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modal.open} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal(prevState=>({...prevState, open: false}))}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                    <View style={[styles.main, {height: 62}]}>
                    <TouchableOpacity style={[styles.mainBox, {borderColor: '#424242'}]} onPress={()=>{commentDelete(); setModal({...modal, open: false});}}>
                        <Text style={{color: '#F23737', fontSize: 20}}>삭제하기</Text>
                    </TouchableOpacity>
                </View>
                        <View style={{height: 10}}></View>
                        <TouchableOpacity style={styles.footer} onPress={()=>setModal(prevState=>({...prevState, open: false}))} activeOpacity={0.7}>
                            <Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal