import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import DropDownPicker from 'react-native-dropdown-picker'

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
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15,
        padding: 20,
    },

})

const ModalFlatList = () => {

    const [open, setOpen] = useState(false);

    const DATA = [
        {
            id: '0',
            title: '산모 용품',
        },
        {
            id: '1',
            title: '수유 용품',
        },
        {
            id: '2',
            title: '위생 용품',
        },
        {
            id: '3',
            title: '목욕 용품',
        },
        {
            id: '4',
            title: '침구류',
        },
        {
            id: '5',
            title: '아기 의류',
        },
        {
            id: '6',
            title: '외출 용품',
        },
        {
            id: '7',
            title: '가전 용품',
        }
    ];

    const renderItem = ({ item }) => (
        <View style={{width: 100, height: 100, borderWidth: 1,}}><Text>gg</Text></View>
    );

    console.log('open: ', open);
  return (
    <View>
        <View><Text onPress={()=>{setOpen(!open)}}>모달창 띄우기</Text></View>
    
    <Modal animationType="fade" transparent={true} visible={open}
            onRequestClose={() => {
            setOpen(!open)}}>

                

            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                <View style={{position: 'absolute', backgroundColor: 'green', width: 300, height: 300, top: 20, left: 20, zIndex: 999}}>
                    <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
                </View>
                    <View style={[styles.modalContainer2, {height: 294}]}>
                      
                    </View>
                </View>
            </View>
        </Modal>
        </View>
  )
}

export default ModalFlatList