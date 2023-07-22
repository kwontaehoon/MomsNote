import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Image } from 'react-native'
import axios from 'axios'
import { WebView } from 'react-native-webview';

import Arrow_Right from '../../../../public/assets/svg/Arrow-Right.svg'
import Reset from '../../../../public/assets/svg/Reset.svg'
import Crown from '../../../../public/assets/svg/crown.svg'
import Crown2 from '../../../../public/assets/svg/crown2.svg'
import Crown3 from '../../../../public/assets/svg/crown3.svg'
import Close from '../../../../public/assets/svg/Close.svg'
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
        width: '90%',
        borderRadius: 15,
        height: 640,
        overflow: 'hidden',
    },
    imageBox:{
        position: 'absolute',
        left: 20,
        top: 50,
        zIndex: 999
    },
    imageBox2:{
        position: 'absolute',
        left: -80,
        top: -70,
    },
    imageBox3:{
        height: 100,
        position: 'absolute',
        left: '27%',
        top: -70,
        flexDirection: 'row'
    },
    imageBox4:{
        height: 100,
        position: 'absolute',
        left: '25%',
        bottom: -20,
        flexDirection: 'row',
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 8,
        borderRadius: 3,
        marginLeft: 5,
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
    header:{
        height: '13%',
        justifyContent: 'center',
        padding: 20,
    },
    closeBox:{
        position: 'absolute',
        right: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 10
    },
    main:{
        height: '50%',
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainBox:{
        height: 95,
        flexDirection: 'row',
    },
    mainBoxSub:{
        width: '33.4%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer:{
        height: '37%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    footerBox:{
        justifyContent: 'center',
        height: '25%',
    },
    resetBox:{
        position: 'absolute',
        right: 0,
        zIndex: 999,
        alignItems: 'center',
        flexDirection: 'row',
    },
    footerBox2:{
        flexDirection: 'row',
        height: '27%',
        paddingBottom: 15,
    },
    textInput:{
        width: '47%',
        justifyContent: 'center',
        borderRadius: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#FEA100'
    },
    footerBox3:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        height: 52,
    },
    footerBox4:{
        marginTop: 15,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#FEA100',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
})

const Main = ({modal, setModal, modal6, setModal6, setModalVisible2}) => {

    const DATA = [
        {
            id: '1',
            brandName: '마더스베이비',
            productName: 'v웹 코튼 수유 브라',
            price: 89900
        },{
            id: '2',
            brandName: '세컨스킨',
            productName: 'v웹 코튼 수유 브라',
            price: 89900
        },{
            id: '3',
            brandName: '뉴니끄',
            productName: 'v웹 코튼 수유 브라',
            price: 89900
        },{
            id: '4',
            brandName: '마더피아',
            productName: 'v웹 코튼 수유 브라',
            price: 89900
        }
    ]
    const [isChecked, setIsChecked] = useState(false);
    const [info, setInfo] = useState(); // 브랜드 lists
    const [selectBrand, setSelectBrand] = useState({
        needsId: null,
        needsBrandId: 0,
        itemName: '',
        itemPrice: 0,
        needsDataId: null,
        itemBrand: '',
    });

    const close = async() => {
        isChecked ? (AsyncStorage.setItem('coarchMarkMaterialModal', '1'), setModal(!modal), setModal6(!modal6), setModalVisible2(true)) : (setModal(!modal), setModal6(!modal6), setModalVisible2(true));
      }

    const renderItem = ({ item, index }) => (
        <View style={styles.mainBox}>
            <View style={[styles.mainBoxSub, {width: '24%'}]}>
                {/* {crown(index)} */}
            </View>
            <TouchableOpacity>
                <Text style={{fontWeight: '500', marginBottom: 3}}></Text>
                <Text style={{marginBottom: 3, color: '#757575'}} ellipsizeMode='tail' numberOfLines={1}></Text>
                <Text></Text>
            </TouchableOpacity>
            <View style={[styles.mainBoxSub, {width: '36%', alignItems: 'flex-end'}]}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
                    <Text></Text>
                    <Text></Text>
                </View>
                
                <TouchableOpacity>
                    <Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );

  return (
    <Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true}
        onRequestClose={() => {
        setModal(!modal)}}>
        <KeyboardAvoidingView behavior='height' style={styles.modalContainer}>
            <View style={styles.modalView}>

            <View style={styles.imageBox}>
                    <View style={[styles.Top, {alignItems: 'flex-start', padding: 5}]}><Close fill='white' onPress={close}/></View>
                        <View style={[styles.Bottom, {paddingTop: 10, flexDirection: 'row'}]}>
                        <Text style={{color: '#FEA100', fontSize: 15, fontWeight: '700'}}>다시 보지 않기</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={()=>{setIsChecked(!isChecked)}}
                            color={isChecked ? '#FEB401' : '#FEB401'}/>
                    </View>
                </View>

                <View style={styles.modalContainer2}>

                    <View style={styles.header}>
                        <TouchableOpacity style={styles.closeBox}  onPress={()=>setModal(!modal)}>
                                
                        </TouchableOpacity>
                        <Text></Text>
                        <Text></Text>
                    </View>
                    <View style={styles.main}>

                    <View style={styles.mainBox}>
                        <View style={[styles.mainBoxSub, {width: '24%'}]}>
                            {/* {crown(index)} */}
                        </View>
                        <TouchableOpacity style={[styles.mainBoxSub, {width: '40%', alignItems: 'flex-start'}]}>
                            <Text style={{fontWeight: '500', marginBottom: 3}}></Text>
                            <Text style={{marginBottom: 3, color: '#757575'}} ellipsizeMode='tail' numberOfLines={1}></Text>
                            <Text style={{color: '#9E9E9E'}}>구매 344건</Text>
                        </TouchableOpacity>
                        <View style={[styles.mainBoxSub, {width: '36%', alignItems: 'flex-end'}]}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
                                <Text style={{fontSize: 16, fontWeight: '600', marginRight: 5}}></Text>
                                <Text></Text>
                            </View>
                            
                            <View style={{flexDirection: 'row', backgroundColor: 'white', padding: 5, borderRadius: 10,
                            borderStyle: 'dashed', borderWidth: 2, borderColor: '#FEA100'}}>

                            <View style={styles.imageBox2}>
                                <View style={styles.Bottom}>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>브랜드별 최저가</Text>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>확인이 가능해요!</Text>
                                </View>
                                <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow7.png')} style={styles.image} resizeMode='contain'/></View>
                            </View>

                                <Text style={{fontWeight: '600', fontSize: 13, color: '#FEA100'}}>최저가 보기</Text>
                                <Arrow_Right fill='#FEA100' width={16} height={16}/>
                            </View>
                        </View>
                    </View>

                        <FlatList data={DATA} renderItem={renderItem}
                            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
                        </FlatList>

                    </View>
                    <View style={styles.footer}>
                        <View style={styles.footerBox}>
                            <TouchableOpacity></TouchableOpacity>
                            <Text></Text>
                        </View>
                        <View style={styles.footerBox2}>

                            <View style={styles.imageBox3}>
                                <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow10.png')} style={{width: 30, height: 30}} resizeMode='contain'/></View>
                                <View style={styles.Bottom}>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>찾는 브랜드가 없다면</Text>
                                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>직접 입력하세요!</Text>
                                </View>
                                <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow11.png')} style={{width: 30, height: 30}} resizeMode='contain'/></View>
                            </View>

                            <View style={styles.textInput}>
                                <TextInput placeholder='브랜드명(필수)' value={selectBrand.itemBrand} numberOfLines={1}  style={{paddingLeft: 10}} editable={false}
                                    onChangeText={(e) => setSelectBrand(prevState => ({ ...prevState, itemBrand: e}))}>   
                                </TextInput>
                            </View>

                            <View style={{width: '6%'}}></View>

                            <View style={styles.textInput}>
                                <TextInput placeholder='제품명(필수)' value={selectBrand.itemName} numberOfLines={1} style={{paddingLeft: 10}} editable={false}
                                    onChangeText={(e) => setSelectBrand(prevState => ({...prevState, itemName: e}))}>
                                </TextInput>
                                </View>
                            </View> 
                        <TouchableOpacity style={styles.footerBox3}></TouchableOpacity>
                        <View style={styles.footerBox4}>
                            <Text style={{color: 'grey'}}>#마더스베이비</Text>
                            <Text style={{color: 'grey'}}>#세컨스킨</Text>
                            <Text style={{color: 'grey'}}>#뉴니끄</Text>
                            <Text style={{color: 'grey'}}>#마더피아</Text>
                            <Text style={{color: 'grey'}}>#와코르</Text>
                        </View>
                    </View>
                    
                </View>
                    <View style={styles.imageBox4}>
                        <View style={[styles.Bottom, {paddingTop: 20}]}>
                            <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>브랜드 클릭 시</Text>
                            <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700'}}>자동입력이 돼요!</Text>
                        </View>
                        <View style={[styles.Top, {justifyContent: 'flex-start'}]}><Image source={require('../../../../public/assets/coachmark/arrow12.png')} style={{width: 30, height: 30}} resizeMode='contain'/></View>
                    </View>
            </View>
        </KeyboardAvoidingView>
    </Modal>
  )
}

export default Main