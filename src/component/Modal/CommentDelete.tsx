import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox'
import { postComment } from '../../Redux/Slices/CommentSlice'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'

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
        paddingTop: 20
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
        marginBottom: 10,
    },
})

const CheckBoxModal = ({modal7, setModal7, info, commentsId}) => {

    const dispatch = useDispatch();

    const CommentDelete = async() => {
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                  method: 'post',
                  url: 'https://momsnote.net/api/comments/delete',
                  headers: { 
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
                  data: { commentsId: commentsId[1] }
                });
                console.log('댓글 삭제 response: ', response.data);
            }catch(error){
              console.log('error: ', error);
            }
            dispatch(postComment({
                count: 1,
                page: 1,
                boardId: info[0].boardId
            }))
            setModal7(!modal7);
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modal7} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal7(!modal7)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, lineHeight: 25, textAlign: 'center'}}>정말로 삭제하시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={CommentDelete}>
                                <Text style={{color: 'white', fontSize: 16}}>삭제</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModal7(!modal7)}>
                                <Text style={{fontSize: 16}}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal