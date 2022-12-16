import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios'

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
        width: '100%',
        borderRadius: 15,
    },
    main:{
        height: 470,
        backgroundColor: 'white',
        borderRadius: 15,
    },
    mainBox:{
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainBox2:{
        padding: 15,
    },
    textInput:{
        height: 60,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        paddingLeft: 15,
        borderRadius: 3,
    },
    noticeModal:{
        position: 'absolute',
        bottom: 10,
        left: 15,
        width: '100%',
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notice:{
        width: '100%',
        height: 44,
        backgroundColor: '#212121CC',
        justifyContent: 'center',
        paddingLeft: 15,
        borderRadius: 5,
    },
    footer:{
        backgroundColor: '#FEA100',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56
    },
})

const CheckBoxModal = ({modalVisible3, setModalVisible3}) => {

    const [info, setInfo] = useState({
        title: '',
        content: ''
    })

    const submit = async() => {
        console.log('a');
        info.title.length === 0 && info.content.length === 0 ? 'animation' : 
        await axios.post(`http://192.168.1.140:4000/post/test`, {
            info: info
        })
       
    }


  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible3}
            onRequestClose={() => {
            setModalVisible3(!modalVisible3)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2]}>
                       <View style={styles.main}>
                            <View style={styles.mainBox}><Text style={{fontSize: 15}}>출산 리스트 공유</Text></View>
                            <View style={styles.mainBox2}>
                                <View style={styles.noticeModal}>
                                    <View style={styles.notice}><Text style={{color: 'white', fontSize: 13, fontWeight: '500'}}>제목과 내용은 필수 항목입니다.</Text></View>
                                </View>
                                <TextInput style={styles.textInput} placeholder='글 제목' placeholderTextColor='#9E9E9E'  onChangeText={(e) => setInfo((prevState) => ({ ...prevState, title: e}))}></TextInput>
                                <TextInput style={[styles.textInput, {marginTop: 10, height: 200, paddingBottom: 140}]} placeholder='간단한 내용을 입력해주세요.' placeholderTextColor='#9E9E9E'
                                    onChangeText={(e) => setInfo((prevState) => ({ ...prevState, content: e}))}>
                                </TextInput>
                            </View>
                            <TouchableOpacity style={styles.footer} onPress={submit}>
                                <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>공유하기</Text>
                            </TouchableOpacity>
                       </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal