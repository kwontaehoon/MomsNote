import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import axios from 'axios'

import Close from '../../../../../public/assets/svg/Close.svg'

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
        padding: 20,
    },
    header:{
        height: 50,
        alignItems: 'center',
    },
    closeBox:{
        position: 'absolute',
        right: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1
    },
    main:{
        marginBottom: 15
    },
    mainBox:{
        height: 44,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        paddingRight: 28,
        justifyContent: 'center'
    },
    priceBox:{
        position: 'absolute',
        right: 10,
    },
    footer:{
        height: 44,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        position: 'relative',
        zIndex: -999,
    },

})

const CheckBoxModal = ({modal6, setModal6}) => {

    const [info, setInfo] = useState({
        needsId: 0,
        itemPrice: 0,
    });

    console.log('구매수정 info: ', info);

    console.log('modal6: ', modal6);

    const edit = async() => {
        try{
            const response = await axios({
                method: 'post',
                headers: { 
                    'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzIyMDczODUsImV4cCI6MTY3NDc5OTM4NX0.LRECgH_NBe10ueCfmefEzEueIrYukBHnXoKRfVqIurQ', 
                    'Content-Type': 'application/json'
                },
                url: 'https://momsnote.net/api/needs/update/price',
                data : info
        });
        console.log('response: ', response.data);
         }catch(error){
             console.log('가격 수정 axios error: ', error);
        }
        setModal6(prevState=>({...prevState, open: false}));
    }

  return modal6.content == null ? <View></View> : (
    <Modal animationType="fade" transparent={true} visible={modal6.open} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal6(!modal6)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <KeyboardAvoidingView style={styles.modalContainer2} behavior='padding'>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.closeBox} onPress={()=>setModal6(prevState=>({...prevState, open: false}))}>
                                <Close />
                            </TouchableOpacity>
                            <Text style={{color: '#212121', fontSize: 18, fontWeight: '500'}}>가격 수정</Text>
                        </View>
                        <View style={styles.main}>
                            <View style={{marginBottom: 10}}><Text>{modal6.content.needsName}</Text></View>

                            <View style={styles.mainBox}>
                                <View style={styles.priceBox}><Text>원</Text></View>
                                <TextInput style={{fontWeight: '600'}} textAlign='right' placeholder={`${(modal6.content.itemPrice).toLocaleString()}`} placeholderTextColor={'black'}
                                    onChangeText={(e) => setInfo((prevState) => ({ ...prevState, needsId: modal6.content.needsId, itemPrice: Number(e)}))}
                                    value={info.itemPrice} keyboardType='number-pad'>
                                </TextInput>
                            </View>
                        </View>
                        
                            <TouchableOpacity style={[styles.footer, {backgroundColor: '#FEA100'}]} onPress={edit}>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>적용</Text>
                            </TouchableOpacity> 
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal