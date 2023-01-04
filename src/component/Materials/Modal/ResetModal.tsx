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
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
    },
    modal:{
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 7,
        borderColor: '#FE7000',
        borderWidth: 1,
    },
    modalBox:{
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox2:{
        height: 110,
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
})

const NoticeModal = ({modalVisible5, setModalVisible5, modalVisible6, setModalVisible6}) => {

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible5}
            onRequestClose={() => {
            setModalVisible5(!modalVisible5)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10, color: '#212121', fontWeight: '600'}}>원하는 출산준비물 리스트를 선택해주세요.</Text>
                        </View>
                        <View style={styles.modalBox2}>
                            <TouchableOpacity style={styles.modal} onPress={()=>(setModalVisible5(!modalVisible5), setModalVisible6(!modalVisible6))}>
                                <Text style={{color: '#FE7000', fontSize: 15, fontWeight: '500'}}>실제맘 추천 리스트</Text>
                            </TouchableOpacity>
                            <Text style={{lineHeight: 20}}>많은 임산부들이 추천한 품목을 필수, 권장, 선택 항목으로 나눠서 알기 쉽게 보여준답니다.</Text>
                        </View>
                        
                             
                        <View style={styles.modalBox2}>
                            <TouchableOpacity style={styles.modal} onPress={()=> setModalVisible5(!modalVisible5)}><Text style={{color: '#FE7000', fontSize: 16, fontWeight: '500'}}>직접 작성</Text></TouchableOpacity>
                            <Text style={{lineHeight: 20}}>카테고리만 기본 제공하며, 필요한 품목을 직접 작성할 수 있어요.</Text>
                        </View>

                        <View style={styles.modalBox2}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#EF1E1E'}}>Tip! </Text>
                                <Text style={{color: '#757575'}}>초보엄마라면 추천 리스트를 바탕으로 나에게</Text>
                            </View>
                            <Text style={{color: '#757575'}}>맞는 출산준비물 리스트를 작성해 보세요.</Text>
                            <TouchableOpacity style={[styles.modal, {borderColor: '#EEEEEE', marginTop: 10}]} onPress={()=> setModalVisible5(!modalVisible5)}><Text style={{fontSize: 15, fontWeight: '500'}}>취소</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default NoticeModal