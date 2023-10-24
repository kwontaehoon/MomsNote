import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native'
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
        margin: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '80%',
        height: 220,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15
    },
    modalBox:{
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal:{
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 3,
    },
})

const NoticeModal = ({modal2, setModal2}) => {

    const submit = async() => {
        const token = await AsyncStorage.getItem('token');
        try{
            await axios({
                method: 'post',
                url: 'https://momsnote.net/api/needs/add/brand',
                headers: { 
                    'Authorization': `bearer ${token}`,  
                    'Content-Type': 'application/json'
                  },
                data: {
                  needsId: modal2.content.needsId,
                  needsBrandId: modal2.content.needsBrandId,
                  itemName: modal2.content.itemName,
                  itemPrice: modal2.content.itemPrice,
                  needsDataId: modal2.content.needsId,
                  itemBrand: modal2.content.itemBrand,
                }
            });
            }catch(error){
            }
    
        try{
          await axios({
              method: 'post',
              url: 'https://momsnote.net/api/needs/buy/needs',
              headers: { 
                'Authorization': `bearer ${token}`,  
                'Content-Type': 'application/json'
              },
              data: {
                needsBrandId: modal2.content.needsBrandId,
                needsId: modal2.content.needsId
              }
          });
          }catch(error){
          }
          setModal2({...modal2, open: false, content: '', flag: 'edit'});
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modal2.open} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal2({open: false})}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={[styles.modalBox, {height: '45%'}]}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>해당 브랜드로 수정하시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={()=>submit()}><Text style={{color: 'white', fontSize: 16}}>적용</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModal2({...modal2, open: false})}><Text style={{color: 'black', fontSize: 16}}>취소</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default NoticeModal