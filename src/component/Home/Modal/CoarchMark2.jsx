import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native'

import Close from '../.././../../public/assets/svg/Close.svg'
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        borderRadius: 15,
        padding: 20,
    },
    modalBox:{
        justifyContent: 'center',
        padding: 10,
        height: 55
    },
    modalBox2:{
        height: 50,
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#FE7000',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: 'yellow'
    },
    imageBox:{
        height: 100,
        position: 'absolute',
        left: 20,
        top: 50,
    },
    imageBox2:{
        height: 100,
        position: 'absolute',
        left: '40%',
        top: -140,
    },
    imageBox3:{
        height: 100,
        position: 'absolute',
        left: '20%',
        top: 50,
    },
    imageBox4:{
        position: 'absolute',
        left: '10%',
        right: '10%',
        bottom: 100,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: 'yellow',
        borderRadius: 10,
        padding: 10,
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
    star:{
        position: 'absolute'
    },
    Bottom:{
    },


})
const Main = ({navigation, modal, setModal, setModal2, modalFlag}) => {

    const [isChecked, setIsChecked] = useState(false);
    const [list, setList] = useState();

    useEffect(()=>{
        const list = async() =>{
            const materialList = await AsyncStorage.getItem('recommendList');
            console.log('materialList: ', materialList);
            setList(materialList);
        }
        list();
    }, []);

    const close = async() => {
        isChecked ? (AsyncStorage.setItem('coarchMarkHome2', '1'), setModal(false)) : (AsyncStorage.setItem('coarchMarkHome2', '1'), setModal(false))
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true}
        onRequestClose={() => {
    setModal(!modal)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>

                    <View style={[styles.modalContainer2, {position: 'absolute', backgroundColor: 'white', opacity: 0.5}]}>
                        <View style={[styles.modalBox, { justifyContent: 'flex-start' }]}>
                            <Text style={{ fontSize: 15, textAlign: 'center', lineHeight: 20 }}>출산 준비물 리스트를 생성합니다. 실제 맘들이 추천한 리스트로 보시겠어요?</Text>
                        </View>
                        <TouchableOpacity style={styles.modalBox2}>
                            <View style={styles.counting}><Text></Text></View>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>네, 추천 리스트로 보여주세요.</Text>
                        </TouchableOpacity>
                        <View style={styles.modalBox}>
                            <Text style={{ fontSize: 15, lineHeight: 20 }}>많은 임산부들이 추천한 품목을 필수, 권장, 선택 항목으로 나눠서 알기 쉽게 보여줘요!</Text>
                        </View>
                        <TouchableOpacity style={styles.modalBox2}>
                            <View style={styles.counting}><Text></Text></View>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>아니요, 직접 작성할게요.</Text>
                        </TouchableOpacity>
                        <View style={styles.modalBox}>
                            <Text style={{ fontSize: 15, lineHeight: 20 }}>카테고리만 기본 제공하며, 필요한 품목을 직접 작성할 수 있어요.</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <Text style={{ color: '#EF1E1E', fontSize: 13, lineHeight: 20 }}>Tip!
                                <Text style={{ color: '#757575', fontSize: 13 }}> 초보 엄마라면 추천 리스트를 바탕으로 나에게 맞는 출산준비물 리스트를 작성해 보세요.</Text>
                            </Text>
                        </View>
                    </View>

                <View style={styles.imageBox}>
                    <View style={[styles.Top, {alignItems: 'flex-start', padding: 5}]}><Close fill='white' onPress={close}/></View>
                        <View style={[styles.Bottom, {paddingTop: 10, flexDirection: 'row'}]}>
                        <Text style={{color: '#FEA100', fontSize: 15, fontWeight: '700'}}>다시 보지 않기</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={()=>setIsChecked(!isChecked)}
                            color={isChecked ? '#FEB401' : '#FEB401'}/>
                    </View>
                </View>

                            <View style={styles.imageBox4}>
                                <View style={styles.Bottom}>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>*선배맘들이 알려주는 출산준비물 리스트는</Text>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>대형 검색 포털사의 검색량, 구매량, 리뷰량 등의</Text>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>빅데이터를 분석한 결과로 협찬이 아닌</Text>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>실제 소비자 데이터에 기반된 정보입니다.</Text>
                                </View>
                            </View>

            <View style={styles.modalContainer2}>
               <View style={[styles.modalBox, {justifyContent: 'flex-start'}]}>
                    <Text style={{fontSize: 15, textAlign: 'center', lineHeight: 20}}></Text>
               </View>
               <TouchableOpacity style={styles.modalBox2}>

                            <View style={styles.imageBox2}>
                            <View style={[styles.star, {left: 10, top: -18}]}><Image source={require('../../../../public/assets/coachmark/star.png')} style={{width: 25, height: 25}} resizeMode='contain'/></View>
                            <View style={styles.star}><Image source={require('../../../../public/assets/coachmark/star.png')} style={{width: 25, height: 25}} resizeMode='contain'/></View>
                                <View style={styles.Bottom}>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>선배맘들의 선호도가</Text>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>높은 품목과 브랜드를</Text>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>빅데이터로 추천받아</Text>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>효율적으로 작성할 수 있어요!!</Text>
                                </View>
                                <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow13.png')} style={styles.image} resizeMode='contain'/></View>
                            </View>

                    <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>네, 추천 리스트로 보여주세요.</Text>
               </TouchableOpacity>
               <View style={styles.modalBox}>
                    <Text style={{fontSize: 15, lineHeight: 20}}></Text>
               </View>
               <TouchableOpacity style={styles.modalBox2}>

                            <View style={styles.imageBox3}>
                            <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow14.png')} style={styles.image} resizeMode='contain'/></View>
                                <View style={styles.Bottom}>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>품목이 작성되지 않은</Text>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>빈 리스트가 생성되어 하나하나</Text>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>직접 작성할 수 있어요!</Text>
                                </View>
                            </View>

                    <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>아니요, 직접 작성할게요.</Text>
               </TouchableOpacity>
               <View style={styles.modalBox}>
                    <Text style={{fontSize: 15, lineHeight: 20}}></Text>
               </View>
               <View style={styles.modalBox}>
                    <Text style={{color: '#EF1E1E', fontSize: 13, lineHeight: 20}}>
                        <Text style={{color: 'rgba(0,0,0,0.5)', fontSize: 13,}}></Text>
                    </Text>
               </View>
            </View>
        </View>
    </View>
</Modal>
  )
}

export default Main