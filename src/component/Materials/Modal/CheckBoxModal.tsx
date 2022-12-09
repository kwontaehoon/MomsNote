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
        borderRadius: 15,
    },
      modalBox:{
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
      modalBoxSub:{
        flexDirection: 'row',
        paddingLeft: 30,
        height: '20%',
        alignItems: 'center',
    },
      modal:{
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 7,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 3,
        marginRight: 5,
        borderColor: '#E0E0E0',
      },
})

const CheckBoxModal = ({modalVisible, setModalVisible}) => {

    const [isChecked, setChecked] = useState(false); // check box 선택시 체크 팝업에서의 check box

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2, {height: 326}]}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 18, paddingTop: 10}}>선택하신 품목을 구매 완료로</Text>
                            <Text style={{fontSize: 18, paddingTop: 3}}>체크 하시겠습니까?</Text>
                            <Text style={{fontSize: 14, paddingTop: 10, color: '#757575'}}>구매 완료 시 출산준비리스트 구매율로 합산되어</Text>
                            <Text style={{fontSize: 14, color: '#757575'}}>다른 사용자들의 구매에 도움이 됩니다.</Text>
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
                            <TouchableOpacity style={styles.modal}><Text style={{color: 'white', fontSize: 16}}>구매 완료</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModalVisible(!modalVisible)}><Text style={{color: 'black', fontSize: 16}}>취소</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal