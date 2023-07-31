import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Platform } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"

import Bell from '../../../../public/assets/svg/Bell.svg'
import MyPage from '../../../../public/assets/svg/Mypage.svg'
import Icon2 from 'react-native-vector-icons/Feather'
import Note from '../../../../public/assets/svg/Note.svg'
import Home2 from '../../../../public/assets/svg/home2.svg'
import Forum from '../../../../public/assets/svg/forum.svg'
import Campaign from '../../../../public/assets/svg/campaign.svg'
import Baby from '../../../../public/assets/svg/Baby.svg'
import Close from '../.././../../public/assets/svg/Close.svg'
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
        bottom: 5,
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
        left: '20%',
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
const Main = ({modal, setModal, modalFlag}) => {

    const [isChecked, setIsChecked] = useState(false);
    const [recommendListCoachMark, setRecommendListCoachMark] = useState(false);
    console.log('recommentListCoarchMark: ', recommendListCoachMark, modalFlag);

    useEffect(()=>{
        const asyncFlag = async() => {
            const async = await AsyncStorage.getItem('recommendList');
            !async ? setRecommendListCoachMark(false) : setRecommendListCoachMark(true)
        }
        asyncFlag();
    }, []);

    const close = async() => {
        isChecked ? (AsyncStorage.setItem('coarchMarkHome', '1'), setModal(false)) : setModal(false);
      }

  return !modalFlag || !recommendListCoachMark ? '' :  (
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
                            <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>커뮤니티, 주수별 정보 등 다양한 정보를 얻을 수 있어요!</Text>
                        </View>
                        <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow3.png')} style={styles.image} resizeMode='contain'/></View>

                    </View>
                    <View style={styles.imageBox3Sub}>
                        <View style={{width: '20%', alignItems: 'center'}}><Forum /><Text style={{color: '#BDBDBD', fontSize: 13}}>맘스톡</Text></View>
                        <View style={{width: '20%',alignItems: 'center'}}><Baby /><Text style={{color: '#BDBDBD', fontSize: 13}}>D-280</Text></View>
                        <View style={{width: '20%',alignItems: 'center'}}><Home2 /><Text style={{color: '#FEA100', fontSize: 13}}>홈</Text></View>
                        <View style={{width: '20%',alignItems: 'center'}}><Note /><Text style={{color: '#BDBDBD', fontSize: 13}}>출산준비물</Text></View>
                        <View style={{width: '20%',alignItems: 'center'}}><Campaign /><Text style={{color: '#BDBDBD', fontSize: 13}}>맘스정보</Text></View>
                    </View>
                </View>

                    <View style={styles.header}>
                        <View style={styles.headerBar}>

                            <View style={styles.imageBox}>
                                <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow.png')} style={styles.image} resizeMode='contain'/></View>
                                <View style={styles.Bottom}>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>새로운 알림, 마이페이지 기능을 활용해 보세요!</Text>
                                </View>
                            </View>

                            <Bell style={{marginRight: 20}} />
                            <MyPage style={{marginRight: 5}} />
                        </View>
                    </View>

                    <View style={styles.main}>
                        <View style={styles.mainBox}></View>
                        <View style={styles.mainBox2}></View>
                    <View style={styles.mainBox3}>
                        <View style={styles.mainBox3Sub}>
                            
                            <TouchableOpacity style={styles.captureBox}>
                                <Icon2 name='download' size={22} style={{color: '#FE9000'}} />
                            </TouchableOpacity>

                                <View style={styles.imageBox2}>
                                    <View style={styles.Bottom}>
                                        <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>우리 아이의 모습을 저장할 수 있어요!</Text>
                                    </View>
                                    <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow2.png')} style={styles.image} resizeMode='contain'/></View>
                                </View>
                        </View>
                    </View> 
                </View>
                <View style={styles.main3}>
                    <View style={styles.main3Box}>
                        <View style={styles.main3Box2}></View>
                        <View style={[styles.main3Box2, {borderLeftWidth: 1, borderColor: '#EEEEEE',}]}>
                            <View style={[styles.contentBox, {justifyContent: 'center', alignItems: 'center'}]}>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.main4}>
                    <View style={styles.main4Box}></View>
                    <View style={styles.main4Box2}>
                    <View></View>
                </View>
                </View>
                </View>
            </View>
        </Modal>
  )
}

export default Main