import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { postMaterial } from '../../../Redux/Slices/MaterialSlice'
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
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
      modalContainer2:{
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20
    },
      modalBox:{
        justifyContent: 'center',
        alignItems: 'center',
    },
      modalBoxSub:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
      modal:{
        backgroundColor: '#FEA100',
        width: '100%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 3,
        marginRight: 5,
        borderColor: '#E0E0E0',
      },
})

const CheckBoxModal = ({modalVisible, setModalVisible, filter}) => {

    const dispatch = useDispatch();
    const [isChecked, setChecked] = useState(false); // check box 선택시 체크 팝업에서의 check box

    const purchase = async() =>{
      const token = await AsyncStorage.getItem('token');

      isChecked ? AsyncStorage.setItem('materialPurchase', '1') : AsyncStorage.removeItem('materialPurchase');
      try{
        const response = await axios({
            method: 'post',
            url: 'https://momsnote.net/api/needs/buy/needs',
            headers: { 
              'Authorization': `bearer ${token}`, 
              'Content-Type': 'application/json'
            },
            data: {
              needsBrandId: modalVisible.needsBrandId == null ? 0 : modalVisible.needsBrandId,
              needsId: modalVisible.needsId
            }
        });
        }catch(error){
            console.log('출산준비물 구매 error:', error);
        }
        dispatch(postMaterial({ order: filter}));
        setModalVisible(prevState => ({...prevState, open: false}));
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible.open} statusBarTranslucent={true}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}>
                            <View style={{paddingLeft: 20, paddingRight: 20}}><Text style={{fontSize: 18, paddingTop: 10, textAlign: 'center', lineHeight: 25}}>선택하신 품목을 구매 완료로 체크 하시겠습니까?</Text></View>
                            <Text style={{fontSize: 14, paddingTop: 10, color: '#757575', lineHeight: 20, textAlign: 'center'}}>구매 완료 시 출산준비리스트 구매율로 합산되어 다른 사용자들의 구매에 도움이 됩니다.</Text>
                        </View>
                        <View style={styles.modalBoxSub}>
                                <View>
                                <Checkbox
                                  style={styles.checkbox}
                                  value={isChecked}
                                  onValueChange={setChecked}
                                  color={isChecked ? '#2196F3' : undefined}/>
                                </View>
                                <Text style={{color: '#424242'}}>다시 표시하지 않겠습니다.</Text>
                          </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={purchase}><Text style={{color: 'white', fontSize: 16}}>구매 완료</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModalVisible(prevState => ({...prevState, open: false}))}>
                              <Text style={{color: 'black', fontSize: 16}}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal