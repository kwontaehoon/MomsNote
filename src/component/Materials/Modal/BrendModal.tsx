import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'
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
        width: '90%',
        height: 144,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15
    },
    header:{
        borderWidth: 1,
        height: '15%',
        justifyContent: 'center',
        padding: 15,
    },
    closeBox:{
        position: 'absolute',
        right: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 10
    },
    main:{
        borderWidth: 1,
        height: '50%',
    },
    mainBox:{
        height: 120,
        borderWidth: 1,
    },
    footer:{
        borderWidth: 1,
        height: '35%',
        backgroundColor: '#EEEEEE',
        padding: 15,
    },
    footerBox:{
        justifyContent: 'center',
        height: '25%',
    },
    resetBox:{
        position: 'absolute',
        right: 0,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    footerBox2:{
        flexDirection: 'row',
        height: '30%',
    },
    textInput:{
        width: '47%',
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 2,
    },
    footerBox3:{
        backgroundColor: '#FEA100',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        height: 52,
        marginTop: 10,
    },
    footerBox4:{
        borderWidth: 1,
        height: '10%',
    },
})

const Main = ({modalVisible2, setModalVisible2, navigation}) => {

    console.log('modal: ', modalVisible2);
    const DATA = [
        {
          id: '0',
          title: '산모용품 (0/13)',
          color: '#FFADAD',
          icon: 'material1'
        },
        {
          id: '1',
          title: '수유용품 (0/13)',
          color: '#FFADAD'
        },
        {
          id: '2',
          title: '위생용품 (0/13)',
          color: '#FFADAD'
        },
        {
            id: '3',
            title: '위생용품 (0/13)',
            color: '#FFADAD'
        },
        {
            id: '4',
            title: '위생용품 (0/13)',
            color: '#FFADAD'
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.mainBox}>
           
        </View>
    );

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible2}
        onRequestClose={() => {
        setModalVisible2(!modalVisible2)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={[styles.modalContainer2, {height: 626}]}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible2(!modalVisible2)}><Icon name='close' size={24}/></TouchableOpacity>
                    <Text style={{color: '#212121', fontSize: 18, fontWeight: '700'}}>브랜드 선택</Text>
                    <Text style={{color: '#212121'}}>수유브라 Best</Text>
                </View>
                <View style={styles.main}>
                    <FlatList data={DATA} renderItem={renderItem}
                        keyExtractor={item => item.id}>
                    </FlatList>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerBox}>
                        <View style={styles.resetBox}>
                            <Text style={{marginRight: 5}}>초기화</Text>
                            <Icon2 name='refresh' size={22}/>
                        </View>
                        <Text style={{color: '#212121', fontSize: 16, fontWeight: '700'}}>브랜드 추가</Text>
                    </View>
                    <View style={styles.footerBox2}>
                        <TextInput style={styles.textInput} placeholder='브랜드명/제품명'></TextInput>
                        <View style={{width: '6%'}}></View>
                        <TextInput style={styles.textInput} placeholder='가격(원)'></TextInput>
                    </View>
                    <TouchableOpacity style={styles.footerBox3}><Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>적용</Text></TouchableOpacity>
                    <View style={styles.footerBox4}></View>
                </View>
            </View>
        </View>
    </View>
</Modal>
  )
}

export default Main