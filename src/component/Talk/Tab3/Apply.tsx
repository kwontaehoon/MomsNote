import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import Checkbox from 'expo-checkbox'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Modal from './Modal/AuthComplete'
import Modal2 from './Modal/AuthFail'
import Modal3 from './Modal/AuthReady'
import Modal4 from './Modal/Cencel'
import Modal5 from './Modal/CencelConfirm'
import Modal6 from './Modal/Save'


const styles = StyleSheet.create({
    container:{
        marginTop: getStatusBarHeight(),
        height: '100%',
        backgroundColor: 'white',
    },
    container2:{
    },
    header:{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerBox:{
        position: 'absolute',
        right: 0,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main:{
        padding: 15
    },
    mainBox:{
        marginBottom: 30,
    },
    textBox:{
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        marginTop: 10,
        height: 52,
        paddingLeft: 10,
        justifyContent: 'center'
    },
    certificateBox:{
        borderWidth: 1,
        borderColor: '#EEEEEE',
        position: 'absolute',
        right: 15,
        bottom: 10,
        borderRadius: 5,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
    },
    postBox:{
        position: 'absolute',
        right: 15,
        bottom: 15,
    },
    checkbox: {
        width: 18,
        height: 18,
        marginRight: 8,
        borderRadius: 3,
        borderColor: '#E0E0E0',
    },
    buttonBox:{
        width: '90%',
        height: 56,
        borderRadius: 5,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        height: 144,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15
    },
    modalBox:{
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal:{
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 3,
    },
})
const Withdraw = ({navigation, route}) => {

    console.log('route: ', route.params);
    const address = route.params;
    console.log('address: ', address);

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const [isChecked, setChecked] = useState(Array.from({length: 3}, ()=>{ return false })); // check box
    console.log('isChecked: ', isChecked);

    const [modal, setModal] = useState(false); // 핸드폰 인증 완료
    const [modal2, setModal2] = useState(false); // 핸드폰 인증 실패
    const [modal3, setModal3] = useState(false); // 핸드폰 인증 이미 완료
    const [modal4, setModal4] = useState(false); // 취소
    const [modal5, setModal5] = useState(false); // 취소 확인
    const [modal6, setModal6] = useState(false); // 임시 저장
    
    const [info, setInfo] = useState( // post info
        {
            applicationId: 0,
            memberName: '',
            tel: '',
            address: route.params,
            addressDetails: '',
            expreienceId: 0,
            blogUrl: '',
            instaUrl: '',
            youtubeUrl: '',
        }
    );
    console.log('info: ', info);

    useEffect(()=>{
        const load = async() => {
            const asyncStorage = await AsyncStorage.getItem('application');

            console.log('async: ', asyncStorage);

            asyncStorage == undefined ? '' : setInfo(JSON.parse(asyncStorage));
            
        }
        load();
    }, [])

    const change = (e) => { // 텍스트 밑줄 색상 변경
        let arr = [...isChecked];

        switch(true){
            case e === 0 && arr[e] === false: arr = Array.from({length: 3}, ()=>{return true}); setChecked(arr); break;
            case e === 0 && arr[e] === true: arr = Array.from({length: 3}, ()=>{return false}); setChecked(arr); break;
            case e !== 0: arr[0] = false; arr[e] = !arr[e]; setChecked(arr); break;
        }
        if(arr[1] === true && arr[2] === true){
            arr = Array.from({length: 3}, ()=>{return true});
            setChecked(arr);
        }
    }

    // const complete2 = () => {
    //     switch(true){
    //         case filter.filter(x => x===true).length === 0: setModal2Content('카테고리를 선택해주세요.'); break;
    //         case info.title === '': setModal2Content('제목을 입력해주세요.'); break;
    //         case info.content === '': setModal2Content('게시글 내용을 입력해주세요.'); break;
    //         default: submit(), navigation.goBack(); return;
    //     }
    //     setModalVisible2(!modalVisible2);
    // }
    
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>신청 정보</Text>
                <TouchableOpacity style={styles.headerBox}><Icon name='close' size={20} onPress={()=>
                    info.memberName == '' && info.tel == '' && info.blogUrl == '' && info.youtubeUrl == '' && info.instaUrl == '' &&
                    info.address == undefined && info.addressDetails == '' ? navigation.goBack() : setModal6(!modal6)
                }/>
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>이름</Text>
                    <TextInput style={styles.textBox} placeholder='이름 입력' value={info.memberName}
                        onChangeText={(e) => setInfo((prevState) => ({
                            ...prevState, memberName: e
                        }))}></TextInput>
                </View>
                <View>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>연락처</Text>
                    <TextInput style={styles.textBox} placeholder='휴대폰 번호 입력(-제외)' value={info.tel}
                         onChangeText={(e) => setInfo((prevState) => ({...prevState, tel: e}))}>
                    </TextInput>
                    <View style={styles.certificateBox}><Text style={{fontWeight: '500'}}>인증요청</Text></View>
                </View>
                <View style={styles.mainBox}>
                    <TextInput style={styles.textBox} placeholder='인증번호 입력'></TextInput>
                    <View style={styles.certificateBox}><Text style={{fontWeight: '500'}}>인증완료</Text></View>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>SNS 계정</Text>
                    <Text style={{color: '#757575', marginTop: 5}}>리뷰에 사용할 계정을 하나 이상 입력해주세요.</Text>
                    <TextInput style={styles.textBox} placeholder='네이버 블로그' value={info.blogUrl}
                        onChangeText={(e) => setInfo((prevState) => ({
                            ...prevState, blogUrl: e
                        }))}></TextInput>
                    <TextInput style={styles.textBox} placeholder='인스타그램' value={info.instaUrl}
                        onChangeText={(e) => setInfo((prevState) => ({ ...prevState, instaUrl: e }))}>
                    </TextInput>
                    <TextInput style={styles.textBox} placeholder='유튜브' value={info.youtubeUrl}
                        onChangeText={(e) => setInfo((prevState) => ({ ...prevState, youtubeUrl: e }))}>
                    </TextInput>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>배송지</Text>
                    <View>
                        <View style={styles.textBox}>
                            {address === undefined ? <Text>주소 검색하기</Text> : <Text>{address}</Text>}
                        </View>
                        <View style={styles.postBox}><Icon name='right' size={15} onPress={()=>navigation.navigate('주소 찾기')}/></View>
                    </View>
                    <TextInput style={styles.textBox} placeholder='상세주소 입력' value={info.addressDetails} onChangeText={(e) => setInfo((prevState) => ({ ...prevState, addressDetails: e }))}></TextInput>
                </View>
                <View style={[styles.mainBox, {flexDirection: 'row', borderBottomWidth: 1, height: 40, borderColor: '#EEEEEE', marginBottom: 15}]}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked[0]}
                    onValueChange={()=>change(0)}
                    color={isChecked[0] ? '#FEB401' : undefined}/>
                    <Text>전체동의</Text>
                </View>
                <View style={[styles.mainBox, {flexDirection: 'row',  marginBottom: 15}]}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked[1]}
                    onValueChange={()=>change(1)}
                    color={isChecked[1] ? '#FEB401' : undefined}/>
                    <Text style={{color: '#616161'}}>초상권 활용에 동의합니다.</Text>
                </View>
                <View style={[styles.mainBox, {flexDirection: 'row'}]}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked[2]}
                        onValueChange={()=>change(2)}
                        color={isChecked[2] ? '#FEB401' : undefined}/>
                    <Text style={{color: '#616161'}}>갬페인 유의사항 및 제 3자 제공에 동의합니다.</Text>
                    <View style={{position: 'absolute', right: 0, width: 20, height: '100%', justifyContent :'center'}}><Icon name='right' size={12} style={{color: '#616161'}}/></View>
                </View>
                <View style={[styles.mainBox, {alignItems: 'center'}]}>
                    {isChecked[0] ? <View style={[styles.buttonBox, {backgroundColor: '#FEA100'}]}><Text style={{fontSize: 18, color: 'white'}}>체험단 신청</Text></View>
                    : <View style={styles.buttonBox}><Text style={{fontSize: 18, color: 'white'}}>체험단 신청</Text></View>}
                </View>
            </View>
        </View>
      );

  return (
    <View style={styles.container}>

        <Modal modal={modal} setModal={setModal}/>
        <Modal2 modal2={modal2} setModal2={setModal2} />
        <Modal3 modal3={modal3} setModal3={setModal3} />
        <Modal4 navigation={navigation} modal4={modal4} setModal4={setModal4} />
        <Modal5 modal5={modal5} setModal5={setModal5} />
        <Modal6 navigation={navigation}modal6={modal6} setModal6={setModal6} info={info} />

        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} showsHorizontalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Withdraw