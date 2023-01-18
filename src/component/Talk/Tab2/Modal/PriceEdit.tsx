import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import First from '../../Modal/First'

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
        height: 220,
    },
    header:{
        height: '25%',
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

    },
    mainBox:{
        height: 44,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        paddingRight: 15,
    },
    footer:{
        height: 44,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        position: 'relative',
        zIndex: -999
    },

})

const CheckBoxModal = ({modal6, setModal6, setModal3}) => {

    const [info, setInfo] = useState({
        category: '카테고리 선택(필수)',
        grade: '추가',
        needsName: ''
    });

    console.log('modal6: ', modal6);

  return modal6.content == null ? <View></View> : (
    <Modal animationType="fade" transparent={true} visible={modal6.open}
            onRequestClose={() => {
            setModal6(!modal6)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.closeBox} onPress={()=>setModal6(prevState=>({...prevState, open: false}))}><Icon name='close' size={24}/></TouchableOpacity>
                            <Text style={{color: '#212121', fontSize: 18, fontWeight: '500'}}>가격 수정</Text>
                        </View>
                        <View style={styles.main}>
                            <View style={{marginBottom: 10}}><Text>{modal6.content.needsName}</Text></View>
                            <TextInput style={styles.mainBox} textAlign='right' placeholder={`${(modal6.content.itemPrice).toLocaleString()} 원`} placeholderTextColor={'black'}
                                onChangeText={(e) => setInfo((prevState) => ({ ...prevState, needsName: e}))}></TextInput>
                        </View>
                        
                            <TouchableOpacity style={[styles.footer, {backgroundColor: '#FEA100'}]} onPress={()=>{console.log('zz')}}>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>적용</Text>
                            </TouchableOpacity> 
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal