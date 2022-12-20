import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Switch, Modal, Platform } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'
import Close from '../../../../../public/assets/svg/Close.svg'

const styles = StyleSheet.create({
    modalContainer:{
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
        width: '100%',
        height: '100%',
        margin: 50,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '90%',
        height: 560,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15,
        paddingLeft: 25,
        paddingRight: 25,
    },
    header:{
        height: '18%',
        justifyContent: 'center',
    },
    closeBox:{
        position: 'absolute',
        right: 20,
    },
    main:{
        height: '64%',
    },
    mainBox:{
        height: '16.6%',
        justifyContent: 'center'
    },
    mainBox2:{
        height: '16.6%',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        paddingLeft: 20,
    },
    addBox:{
        position: 'absolute',
        right: 0,
        borderWidth: 1,
        paddingLeft: 12,
        paddingTop: 4,
        paddingRight: 12,
        paddingBottom: 4,
        borderRadius: 4,
        borderColor: '#EEEEEE'
    },
    footer:{
        height: '18%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    footerBox:{
        width: '100%',
        backgroundColor: '#E0E0E0',
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
const Main = ({modalVisible3, setModalVisible3}) => {

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible3}
        onRequestClose={() => {setModalVisible3(!modalVisible3)}}>
        <View style={styles.modalContainer}>
            <View style={styles.modalView}>
                <View style={styles.modalContainer2}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible3(!modalVisible3)}><Close /></TouchableOpacity>
                        <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 3}}>컨텐츠 URL 등록</Text>
                        <Text>본인의 해당 SNS 링크를 입력해주세요.</Text>
                    </View>
                    <View style={styles.main}>
                        <View style={styles.mainBox}>
                            <View style={styles.addBox}><Text>추가+</Text></View>
                            <Text style={{fontWeight: '600'}}>인스타그램</Text>
                        </View>
                        <TextInput style={styles.mainBox2} placeholder='URL주소입력'></TextInput>
                        <View style={styles.mainBox}>
                            <View style={styles.addBox}><Text>추가+</Text></View>
                            <Text style={{fontWeight: '600'}}>네이버 블로그</Text>
                        </View>
                        <TextInput style={styles.mainBox2} placeholder='URL주소입력'></TextInput>
                        <View style={styles.mainBox}>
                            <View style={styles.addBox}><Text>추가+</Text></View>
                            <Text style={{fontWeight: '600'}}>유튜브</Text>
                        </View>
                        <TextInput style={styles.mainBox2} placeholder='URL주소입력'></TextInput>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.footerBox}>
                            <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>등록 완료</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
  )
}

export default Main