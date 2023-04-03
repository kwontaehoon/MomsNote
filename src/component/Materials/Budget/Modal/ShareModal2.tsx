import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Animated, KeyboardAvoidingView, Platform } from 'react-native'
import axios from 'axios'
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
        width: '100%',
    },
    main:{
        backgroundColor: 'white',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        paddingBottom: 35,
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
        height: 50,
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

const CheckBoxModal = ({modalVisible3, setModalVisible3, modalVisible4, setModalVisible4}) => {

    const [info, setInfo] = useState({
        boardCategory: '출산리스트 공유',
        title: '',
        contents: '',
    })

    const animation = useRef(new Animated.Value(0)).current;

    const opacity_ani = () => {
        Animated.timing(animation, {
            toValue: 1,
            useNativeDriver: true,
            duration: 1000,
        }).start(()=>{
            Animated.timing(animation, {
                toValue: 0,
                useNativeDriver: true,
                duration: 1000,
            }).start();
        });
    }

    const submit = async() => {
        const token = await AsyncStorage.getItem('token');
        if(info.title == '' || info.contents == ''){
            opacity_ani()
        }else try{
                const response = await axios({
                    method: 'post',
                    headers: { 
                        'Authorization': `bearer ${token}`, 
                        'Content-Type': 'application/json'
                    },
                    url: 'https://momsnote.net/api/needs/share/save',
                    data : info
            });
            console.log('response: ', response.data);
            setModalVisible3(!modalVisible3);
            setModalVisible4(!modalVisible4);
            }catch(error){
                console.log('출산공유리스트 axios error: ', error);
            }
    }


  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible3} statusBarTranslucent={true}
            onRequestClose={() => {
            setModalVisible3(!modalVisible3)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <KeyboardAvoidingView style={styles.modalContainer2} behavior='padding'>

                       <View style={[styles.main, {paddingBottom: Platform.OS == 'ios' ? 35 : 0}]}>
                            <View style={styles.mainBox}><Text style={{fontSize: 15}}>출산 리스트 공유</Text></View>
                            <View style={styles.mainBox2}>
                                <Animated.View style={[styles.noticeModal, {opacity: animation}]}>
                                    <View style={styles.notice}><Text style={{color: 'white', fontSize: 13, fontWeight: '500'}}>제목과 내용은 필수 항목입니다.</Text></View>
                                </Animated.View>
                                <TextInput style={styles.textInput} placeholder='글 제목' placeholderTextColor='#9E9E9E'  onChangeText={(e) => setInfo((prevState) => ({ ...prevState, title: e}))} ></TextInput>
                                <TextInput style={[styles.textInput, {marginTop: 10, paddingTop: 15, height: 200}]} textAlignVertical={'top'} placeholder='간단한 내용을 입력해주세요.' placeholderTextColor='#9E9E9E' multiline={true}
                                    onChangeText={(e) => setInfo((prevState) => ({ ...prevState, contents: e}))}>
                                </TextInput>
                            </View>
                            <TouchableOpacity style={styles.footer} onPress={submit}>
                                <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>공유하기</Text>
                            </TouchableOpacity>
                       </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal