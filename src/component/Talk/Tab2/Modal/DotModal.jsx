import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { postMaterial } from '../../../../Redux/Slices/MaterialSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        marginBottom: 25
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

const CheckBoxModal = ({modal, setModal}) => {

    const dispatch = useDispatch();

    const delete2 = async() => {
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/needs/cancel/buy',
                headers: { 
                  'Authorization': `bearer ${token}`, 
                  'Content-Type': 'application/json'
                },
                data: { needsId: modal.content.needsId }
                });
            }catch(error){
        }
        dispatch(postMaterial({
            order: 'need'
        }));
        setModal(prevState => ({...prevState, open: false}));
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modal.open} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal(prevState => ({...prevState, open: true}))}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                       <TouchableOpacity style={styles.main} activeOpacity={1} onPress={delete2}>
                            <Text style={{color: '#F23737', fontWeight: '600', fontSize: 20}}>품목 삭제</Text>
                       </TouchableOpacity>
                       <View style={{height: 10}}></View>
                       <TouchableOpacity style={styles.footer} onPress={()=>setModal(prevState => ({...prevState, open: false}))} activeOpacity={1}>
                            <Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal