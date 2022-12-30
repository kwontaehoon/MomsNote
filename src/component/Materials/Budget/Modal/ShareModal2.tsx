import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Animated } from 'react-native'
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
        boardCategory: '출산리스트 공유',
        title: '',
        contents: '',
    })
    console.log('info: ', info);

    const animation = useRef(new Animated.Value(0)).current;

    const opacity_ani = () => {
        Animated.timing(animation, {
            toValue: 1,
            useNativeDriver: true,
            duration: 1500,
        }).start(()=>{
            Animated.timing(animation, {
                toValue: 0,
                useNativeDriver: true,
                duration: 1500,
            }).start();
        });
    }

    const submit = async() => {
        try{
            const response = await axios({
                method: 'post',
                headers: { 
                    'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzIyMDczODUsImV4cCI6MTY3NDc5OTM4NX0.LRECgH_NBe10ueCfmefEzEueIrYukBHnXoKRfVqIurQ', 
                    'Content-Type': 'application/json'
                  },
                url: 'https://momsnote.net/api/needs/share/save',
                data : info
        });
        console.log('response: ', response.data);
         }catch(error){
             console.log('출산공유리스트 axios error: ', error);
        }
    
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
                                <Animated.View style={[styles.noticeModal, {opacity: animation}]}>
                                    <View style={styles.notice}><Text style={{color: 'white', fontSize: 13, fontWeight: '500'}}>제목과 내용은 필수 항목입니다.</Text></View>
                                </Animated.View>
                                <TextInput style={styles.textInput} placeholder='글 제목' placeholderTextColor='#9E9E9E'  onChangeText={(e) => setInfo((prevState) => ({ ...prevState, title: e}))}></TextInput>
                                <TextInput style={[styles.textInput, {marginTop: 10, height: 200, paddingBottom: 140}]} placeholder='간단한 내용을 입력해주세요.' placeholderTextColor='#9E9E9E'
                                    onChangeText={(e) => setInfo((prevState) => ({ ...prevState, contents: e}))}>
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