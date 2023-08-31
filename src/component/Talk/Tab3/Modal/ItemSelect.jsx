import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Close from '../../../../../public/assets/svg/Close.svg'
import Check from '../../../../../public/assets/svg/Check.svg'

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'flex-end',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2: {
        width: '100%',
    },
    main: {
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    mainBox: {
        padding: 20,
        position: 'relative',
        flexDirection: 'row',
    },
    mainBox2: {
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkBox: {
        marginRight: 10,
        borderRadius: 20,
        padding: 3,
    }
})

const CheckBoxModal = ({ modal, setModal }) => {

    console.log('## modal: ', modal);

    const itemName = modal.itemName.split('|');
    const itemCount = modal.itemCount.split('|');

    const [filter, setFilter] = useState(Array.from({length: itemName?.length}, () => false)); // 체크, 폰트 색상

    const complete = async (e) => {
        
    }

    return (
        <Modal animationType="slide" transparent={true} visible={modal.open} statusBarTranslucent={true}
            onRequestClose={() => {
                setModal({ ...modal, open: false })
            }}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.main}>
                            <View style={styles.mainBox}>
                                <Text style={{ fontSize: 20, fontWeight: '600', flex: 1 }}>상품선택</Text>
                                <Close fill='black' onPress={() => setModal({ ...modal, open: false })} />
                            </View>
                            {itemName.map((x, index) => {
                                return (
                                    <View key={index} style={styles.mainBox2} onPress={() => complete(0)}>
                                        <TouchableOpacity style={[styles.checkBox, {backgroundColor: !filter[index] ? '#E6E6E6' : '#FE7000'}]} 
                                        onPress={()=>{
                                            const arr = Array.from({length: itemName?.length}, ()=>false);
                                            arr[index] = !arr[index];
                                            setFilter(arr);
                                            setModal({...modal, open: false, selectItem: itemName[index]});
                                        }}>
                                            <Icon name="check" size={16} style={{color: !filter[index] ? 'white' : 'white'}} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ fontSize: 18, color: !filter[index] ? '#212121' : '#FE7000' }}
                                        onPress={()=>{
                                            const arr = [...filter];
                                            arr[index] = !arr[index];
                                            setFilter(arr);
                                            setModal({...modal, open: false, selectItem: itemName[index]});
                                        }}><Text>{x}</Text></TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CheckBoxModal