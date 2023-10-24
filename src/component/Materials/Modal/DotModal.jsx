import React from 'react'
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
        height: 144,
        marginBottom: 25,
        borderRadius: 15,
    },
    main:{
        height: 186,
        backgroundColor: '#424242',
        borderRadius: 10,
        borderColor: '#757575',
        borderWidth: 1,
    },
    mainBox:{
        height: '33.4%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
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

const CheckBoxModal = ({modalVisible5, setModalVisible5, modalVisible7, setModalVisible7, modalVisible8, setModalVisible8, modalVisible9, setModalVisible9}) => {

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible7} statusBarTranslucent={true}
            onRequestClose={() => {
            setModalVisible7(!modalVisible7)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2, {height: 250}]}>
                       <View style={styles.main}>
                            <TouchableOpacity style={styles.mainBox} onPress={()=>{setModalVisible7(!modalVisible7), setModalVisible8(!modalVisible8)}}><Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>품목 추가</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.mainBox} onPress={()=>{setModalVisible9(!modalVisible9), setModalVisible7(!modalVisible7)}}><Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>품목 삭제</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.mainBox} onPress={()=>{setModalVisible7(!modalVisible7), setModalVisible5(!modalVisible5)}}>
                                <Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>초기화</Text></TouchableOpacity>
                       </View>
                       <View style={{height: 10}}></View>
                       <TouchableOpacity style={styles.footer} onPress={()=>setModalVisible7(!modalVisible7)}>
                            <Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal