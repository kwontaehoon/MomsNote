import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Platform } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"

import Bell from '../../../../../public/assets/svg/Bell.svg'
import MyPage from '../../../../../public/assets/svg/Mypage.svg'
import Icon2 from 'react-native-vector-icons/Feather'
import Note from '../../../../../public/assets/svg/Note.svg'
import Home2 from '../../../../../public/assets/svg/home2.svg'
import Forum from '../../../../../public/assets/svg/forum.svg'
import Campaign from '../../../../../public/assets/svg/campaign.svg'
import Baby from '../../../../../public/assets/svg/Baby.svg'
import Close from '../../../.././../public/assets/svg/Close.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Checkbox from 'expo-checkbox';

const styles = StyleSheet.create({
    modalContainer:{
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.5)",
        shadowColor: "#000",
        elevation: 5,
        paddingTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
    },
    modalContainer2:{
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    modalBox:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modal:{
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 7,
    },
    header:{
        height: 55,
        justifyContent: 'center',
        padding: 17,
      },
    headerBar:{
        padding: 7,
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FEECB3',
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#FEA100'
    },
    imageBox:{
        width: 150,
        height: 150,
        position: 'absolute',
        left: -120,
        top: '50%',
    },
    imageBox2:{
        width: 150,
        height: 150,
        position: 'absolute',
        left: 20,
    },
    imageBox3:{
        width: '100%',
        position: 'absolute',
        top: 240,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBox3Sub:{
        width: '95%',
        padding: 5,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#FEA100'
    },
    imageBox4:{
        width: 150,
        height: 150,
        position: 'absolute',
        left: '40%',
        top: -120,
    },
    imageBox5:{
        width: 100,
        height: 100,
        position: 'absolute',
        left: 20,
        top: 50,
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 8,
        borderRadius: 3,
        marginLeft: 5
    },
    image:{
        width: 50,
        height: 50,
    },
    Top:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    Bottom:{
    },
    main:{
        height: 500,
        padding: 20,
    },
    mainBox:{
        height: 100,
        justifyContent: 'center',
    },
    mainBox2:{
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainBox3:{
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    mainBox3Sub:{
        width: 50,
        height: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderColor: '#FEA100',
        borderRadius: 10,
        backgroundColor: '#FEECB3',
    },
    captureBox:{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    DdayBox:{
        alignItems: 'flex-end',
    },
    main3:{
        height: 250,
        paddingTop: 40,
        paddingBottom: 40,
    },
    main3Box:{
        flexDirection: 'row',
        padding: 3,
    },
    main3Box2:{
        width: '50%',
        paddingLeft: 10,
        paddingRight: 10,

    },
    main4:{
        height: 300,
        paddingLeft: 10,
        paddingRight: 10,
    },
    main4Box:{
        height: '20%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    main4Box2:{
        height: 196,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
})
const Main = ({modal, setModal}) => {

    const [isChecked, setIsChecked] = useState(false);

    const close = async() => {
        isChecked ? (AsyncStorage.setItem('coarchMarkMaterialList', '1'), setModal(false)) : setModal(false);
      }

  return (
        <Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true}
            onRequestClose={() => {setModal(!modal)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>

                <View style={styles.imageBox5}>
                    <View style={[styles.Top, {alignItems: 'flex-start', padding: 5}]}><Close fill='white' onPress={close} /></View>
                        <View style={[styles.Bottom, {paddingTop: 10, flexDirection: 'row'}]}>
                        <Text style={{color: '#FEA100', fontSize: 15, fontWeight: '700'}}>다시 보지 않기</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={()=>setIsChecked(!isChecked)}
                            color={isChecked ? '#FEB401' : '#FEB401'}/>
                    </View>
                </View>

                <View style={styles.imageBox3}>
                    <View style={styles.imageBox4}>
                    
                        <View style={styles.Bottom}>
                            <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>꾸~욱 클릭하면 다른 맘의</Text>
                            <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>브랜드 품목을 내 리스트에</Text>
                            <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>담을 수 있어요!</Text>
                        </View>
                        <View style={styles.Top}><Image source={require('../../../../../public/assets/coachmark/arrow7.png')} style={styles.image} resizeMode='contain'/></View>

                    </View>
                    <View style={styles.imageBox3Sub}>
                        <View style={{width: '33%', alignItems: 'center'}}><Text style={{marginBottom: 10}}>품목</Text><Text style={{color: '#BDBDBD', fontSize: 13}}>양말</Text></View>
                        <View style={{width: '33%',alignItems: 'center'}}><Text style={{marginBottom: 10}}>브랜드</Text><Text style={{color: '#BDBDBD', fontSize: 13}}>몽디에스</Text></View>
                        <View style={{width: '33%',alignItems: 'center'}}><Text style={{marginBottom: 10}}>금액</Text><Text style={{color: '#BDBDBD', fontSize: 13}}>0원</Text></View>
                    </View>
                </View>

                </View>
            </View>
        </Modal>
  )
}

export default Main