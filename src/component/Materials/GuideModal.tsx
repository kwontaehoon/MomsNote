import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, Image } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'
import drugs from '../../../public/assets/drugs.png'

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
        width: '90%',
        height: 144,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15,
        padding: 20,
    },
    container2:{

    },
    header:{
        borderWidth: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBox:{
        position: 'absolute',
        right: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 10
    },
    header2:{
        height: 140,
        borderWidth: 1,
    },
    main:{
        borderWidth: 1,
        height: 250,
    },
    mainBox:{
        borderWidth: 1,
        height: 125,
    },
    footer:{
        borderWidth: 1,
        height: 300,
        backgroundColor: '#EEEEEE',
        padding: 15,
    },
})

const Main = ({modalVisible4, setModalVisible4, navigation}) => {

    const DATA = [
        {
          id: '0',
          title: '산모용품 (0/13)',
          color: '#FFADAD',
          icon: 'material1'
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible4(!modalVisible4)}><Icon name='close' size={24}/></TouchableOpacity>
                <Text style={{color: '#212121', fontSize: 18, fontWeight: '700'}}>영양제</Text>
            </View>
            <View style={styles.header2}>
                <Text>이미지</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{color: '#212121', fontWeight: '700'}}>제품설명</Text>
                    <Text></Text>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{color: '#212121', fontWeight: '700'}}>구매 팁</Text>
                    <Text></Text>
                </View>
            </View>
            <View style={styles.footer}>
        
            </View>
        </View>
        
      );

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible4}
        onRequestClose={() => {
        setModalVisible4(!modalVisible4)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={[styles.modalContainer2, {height: 626}]}>
                <FlatList data={DATA} renderItem={renderItem}
                    keyExtractor={item => item.id}>
                </FlatList>
            </View>
        </View>
    </View>
</Modal>
  )
}


export default Main