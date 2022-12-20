import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

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
        height: 250,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    mainBox:{
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainBox2:{
        height: 70,
        padding: 20,
        justifyContent: 'center',
    },
    checkBox:{
        position: 'absolute',
        right: 20,
    }
})

const CheckBoxModal = ({modalVisible10, setModalVisible10}) => {

    const [filter, setFilter] = useState(false); // 체크, 폰트 색상
    console.log('filter: ', filter);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible10}
            onRequestClose={() => {
            setModalVisible10(!modalVisible10)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2]}>
                       <View style={styles.main}>
                            <View style={styles.mainBox}><Text style={{fontSize: 15}}>정렬</Text></View>
                            <TouchableOpacity style={styles.mainBox2} onPress={()=>{setFilter(!filter), setModalVisible10(!modalVisible10)}}>
                                <View style={styles.checkBox}><Icon name='check' size={20} style={{color: filter ? '#212121' : '#FE7000', display: filter ? 'none' : 'flex'}}/></View>
                                <Text style={{fontSize: 18, color: filter ? '#212121' : '#FE7000'}}>필수품목 순</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.mainBox2} onPress={()=>{setFilter(!filter), setModalVisible10(!modalVisible10)}}>
                                <View style={styles.checkBox}><Icon name='check' size={20} style={{color: filter ? '#FE7000' : '#212121', display: filter ? 'flex' : 'none'}}/></View>
                                <Text style={{fontSize: 18, color: filter ? '#FE7000' : '#212121'}}>구매 순</Text>
                            </TouchableOpacity>
                       </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal