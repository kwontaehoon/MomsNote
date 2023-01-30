import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native'

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
        marginBottom: 7,
    },
})

const NoticeModal = ({modal, setModal}) => {

  return modal.buttonCount == 1 ?(
    <Modal animationType="fade" transparent={true} visible={modal.open} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal(!modal)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>{modal.content[0]}</Text>
                            <Text>{modal.content[1]}</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={()=>setModal(!modal)}><Text style={{color: 'white', fontSize: 16}}>확인</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
  ):
  <Modal animationType="fade" transparent={true} visible={modal.open} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal(!modal)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>{modal.content[0]}</Text>
                            <Text style={{fontSize: 16, paddingTop: 5}}>{modal.content[1]}</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={()=>setModal((prevState) => ({...prevState, open: false}))}><Text style={{color: 'white', fontSize: 16}}>확인</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModal((prevState) => ({...prevState, open: false}))}><Text style={{fontSize: 16}}>취소</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
}

export default NoticeModal