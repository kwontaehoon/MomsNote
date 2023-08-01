import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Checkbox from 'expo-checkbox'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Check from '.././../../../../public/assets/svg/Check.svg'

import { useSelector } from 'react-redux'
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux'
import { postBoardAppFlag } from '../../../../Redux/Slices/BoardAppFlagSlice'


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    container2:{
    },
    header:{
        height: 30
    },
    main:{
        padding: 15
    },
    mainBox:{
        marginBottom: 30,
    },
    mainBox2:{

    },
    textBox:{
        marginTop: 10,
        height: 52,
        paddingLeft: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#F5F5F5'
    },
    timerBox:{
        position: 'absolute',
        right: 95,
        bottom: 10,
        paddingTop: 8,
        paddingLeft: 10,
        paddingRight: 17,
        paddingBottom: 8,
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
    footer:{
        alignItems: 'center'
    },
    buttonBox:{
        width: '90%',
        height: 56,
        borderRadius: 5,
        backgroundColor: '#FEA100',
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

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const dispatch = useDispatch();

    const [isChecked, setChecked] = useState(Array.from({length: 3}, ()=>{ return false })); // check box

    const [SMSFlag, setSMSFlag] = useState({
        open: false,
        flag: 1 // 이미 인증했는지 검증
    }); // 본인인증 확인유무
    const [SMSNumber, setSMSNumber] = useState(); // SMS 번호
    const [SMSInputNumber, setSMSInputNumber] = useState(''); // 입력한 SMS 번호

    const appFlag = useSelector(state => { return state.boardAppFlag.data; });
    console.log('@@@@ appFlag: ', appFlag);

    const [modal, setModal] = useState(false);
    
    const [info, setInfo] = useState( // post info
        {
            memberName: '',
            tel: '',
            address: '',
            addressDetails: '',
            blog: '',
            insta: '',
            youtube: '',
        }
    );
    console.log('info: ', info);

    const [minutes, setMinutes] = useState(parseInt(3));
    const [seconds, setSeconds] = useState(parseInt(0));

    useEffect(()=>{
        const appflag = async() => {
            const async = await AsyncStorage.getItem('applicationFlag');
            console.log('@@@@ async: ', async);
            dispatch(postBoardAppFlag({experienceId: Number(async)}));
        }
        appflag();
    }, []);

    useEffect(()=>{
        const experienceId = async() => {
            const async = await AsyncStorage.getItem('applicationFlag');
            setInfo(appFlag.data);
        }
    //    setInfo(prvState => ({...prvState, address: route == undefined ? '' : route}));
       experienceId();
    }, [route, appFlag])

    useEffect(() => {
        const countdown = setInterval(() => {
          if (SMSFlag.open && parseInt(seconds) > 0) {
            setSeconds(parseInt(seconds) - 1);
          }
          if (parseInt(seconds) === 0) {
            if (parseInt(minutes) === 0) {
                clearInterval(countdown);
            } else {
              setMinutes(parseInt(minutes) - 1);
              setSeconds(59);
            }
          }
        }, 1000);
            return () => clearInterval(countdown);
      }, [minutes, seconds, SMSFlag]);

    const sms = async(e) => {
        setSMSFlag(prevState => ({...prevState, open: true}));

        e == '재요청' ? (setMinutes(3), setSeconds(0)) : SMSFlag.flag == 1 ? setModal3(!modal3) : ''

        try{
            const response = await axios({
                  method: 'post',
                  url: `https://momsnote.net/api/send/code?phone=${info.tel}`,
                });
                setSMSNumber(response.data.data);
            }catch(error){
              console.log('error: ', error);
            }
    }

    const certificate = () => {
        SMSNumber == SMSInputNumber ? (setModal(!modal), setSMSFlag(prevState => ({...prevState, open: false, flag: 1}))) : setModal2(!modal2);
        
    }

    const button = () => {
        switch(true){
            case SMSFlag.flag == 1 : return (<Text style={{fontWeight: '500'}} onPress={()=>(setSMSFlag(prevState => ({...prevState, open: false, flag: 0}), setInfo(prevState => ({...prevState, tel: ''}))))}>변경</Text>)
            case SMSFlag.open == true: return (<Text style={{fontWeight: '500'}}>재요청</Text>)
            case SMSFlag.open == false: return (<Text style={{fontWeight: '500'}}>인증요청</Text>)
        }
    }

    const submit = async() => {
        
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/user/update',
                headers: { 
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    memberName: info.memberName,
                    tel: info.tel,
                    addressDetails: info.addressDetails,
                    experienceId: '',
                    address: '',
                    blog: '',
                    insta: '',
                    youtube: ''
                }
            });
            navigation.goBack();
        }catch(error){
            console.log('체험단 신청 error: ', error);
        }
    }
    
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}></View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>이름</Text>
                    <TextInput style={styles.textBox} placeholder={'이름 입력'} value={info?.memberName} maxLength={8}
                        onChangeText={(e) => setInfo((prevState) => ({
                            ...prevState, memberName: e
                        }))}></TextInput>
                </View>
                <View style={[styles.mainBox, {marginBottom: SMSFlag.open ? 10 : 30}]}>

                    { SMSFlag.flag == 1 && SMSFlag.open == false ?<View style={[styles.timerBox, {right: 70}]}>
                         <Check fill='#4CAF50'/>
                    </View> : ''}

                    <Text style={{fontSize: 16, fontWeight: '500'}}>연락처</Text>
                    <TextInput style={styles.textBox} placeholder='휴대폰 번호 입력(-제외)' value={info?.tel} keyboardType='number-pad' maxLength={11}
                         onChangeText={(e) => setInfo((prevState) => ({...prevState, tel: e}))}>
                    </TextInput>
                    <TouchableOpacity style={styles.certificateBox} onPress={()=>( info.tel.length < 11 ? setModal7(!modal7) : sms('재요청'), setSMSFlag(prevState => ({...prevState, flag: 0})))}>
                        {button()}
                    </TouchableOpacity>
                </View>
                <View style={[styles.mainBox, {display: SMSFlag.open ? 'flex' : 'none'}]}>
                    <View style={styles.timerBox}>
                        <Text style={{color: '#0288D1', fontWeight: '500'}}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                    </View>
                    <TextInput style={[styles.textBox, {paddingLeft: SMSFlag.open ? 10 : 0}]} keyboardType='number-pad' placeholder='인증번호 입력' onChangeText={(e)=>setSMSInputNumber(e)}></TextInput>

                    {SMSInputNumber == '' ?
                    <View style={[styles.certificateBox, {backgroundColor: '#E0E0E0'}]}>
                        <Text style={{fontWeight: '500', color: 'white'}}>인증완료</Text>
                    </View>
                    :
                    <TouchableOpacity style={[styles.certificateBox, {backgroundColor: '#FEA100'}]} onPress={certificate}>
                    <Text style={{fontWeight: '500', color: 'white'}}>인증완료</Text>
                    </TouchableOpacity>}

                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>SNS 계정</Text>
                    <Text style={{color: '#757575', marginTop: 5}}>리뷰에 사용할 계정은 계정 아이디(네이버는 블로그 주소 아이디)을 입력해주세요.</Text>
                    <TextInput style={styles.textBox} placeholder='네이버 블로그' value={info?.blog}
                        onChangeText={(e) => setInfo((prevState) => ({
                            ...prevState, blog: e
                        }))}></TextInput>
                    <TextInput style={styles.textBox} placeholder='인스타그램' value={info?.insta}
                        onChangeText={(e) => setInfo((prevState) => ({ ...prevState, insta: e }))}>
                    </TextInput>
                    <TextInput style={styles.textBox} placeholder='유튜브' value={info?.youtube}
                        onChangeText={(e) => setInfo((prevState) => ({ ...prevState, youtube: e }))}>
                    </TextInput>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>배송지</Text>
                    <View>
                        <TouchableOpacity style={styles.textBox} activeOpacity={1} onPress={()=>navigation.navigate('주소 찾기2')}>
                            {info?.address == '' ? <Text>주소 검색하기</Text>
                            : <Text>{info?.address}</Text>}
                        </TouchableOpacity>
                        <View style={styles.postBox}><Icon name='right' size={15}/></View>
                    </View>
                    <TextInput style={styles.textBox} placeholder='상세주소 입력' value={info?.addressDetails} onChangeText={(e) => setInfo((prevState) => ({ ...prevState, addressDetails: e }))}></TextInput>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.buttonBox} onPress={()=>setModal(!modal)}>
                        <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>적용</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      );

  return (

    <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                    <StatusBar />
            </SafeAreaView>
          <SafeAreaView style={styles.container}>
            
            <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
            </FlatList>

            <Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal(!modal)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>참가하신 체험단 신청이 수정되었습니다.</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={()=>{setModal(!modal), submit()}}>
                                <Text style={{color: 'white', fontSize: 16}}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    </SafeAreaView>

</SafeAreaProvider>
    
  )
}

export default Withdraw