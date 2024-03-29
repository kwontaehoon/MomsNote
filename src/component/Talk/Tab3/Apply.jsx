import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Platform, ActivityIndicator } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import Checkbox from 'expo-checkbox'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Check from '../../../../public/assets/svg/Check.svg'
import ArrowRight from '../../../../public/assets/svg/Arrow-Right.svg'
import ArrowBottom from '../../../../public/assets/svg/Arrow-Bottom.svg'
import Modal from './Modal/AuthComplete'
import Modal2 from './Modal/AuthFail'
import Modal3 from './Modal/AuthReady'
import Modal4 from './Modal/Cencel'
import Modal5 from './Modal/CencelConfirm'
import Modal6 from './Modal/Save'
import Modal7 from './Modal/PhoneNumber'
import Modal8 from './Modal/Complete'
import Modal9 from './Modal/TelCheck'
import SelectItem from './Modal/ItemSelect'
import { useSelector } from 'react-redux'
import {
    SafeAreaProvider
  } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux'
import { postBoardAppFlag } from '../../../Redux/Slices/BoardAppFlagSlice'



const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
    },
    container2:{
    },
    header:{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    inputBox:{
        marginTop: 10,
        borderWidth: 1,
        height: 36,
        marginBottom: 40,
        display: 'flex',
        justifyContent: 'center',
        borderColor: '#E6E6E6',
        position: 'relative'
    },
    textBox:{
        marginTop: 10,
        height: 52,
        paddingLeft: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#F5F5F5',
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

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const [isChecked, setChecked] = useState(Array.from({length: 3}, ()=>{ return false })); // check box

    const regExp = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g; // 특수문자 정규식
    const regNumber = /^[0-9]+$/; // 숫자 정규식


    const [SMSFlag, setSMSFlag] = useState({
        open: false,
        flag: 0 // 이미 인증했는지 검증
    }); // 본인인증 확인유무
    const [SMSNumber, setSMSNumber] = useState(null); // SMS 번호
    const [SMSInputNumber, setSMSInputNumber] = useState(''); // 입력한 SMS 번호

    const [telCheck, setTelCheck] = useState(null);

    const [experienceId, setExperienceId] = useState(route.params[1] == '신청하기' ? route.params[0].experienceId: '');

    const boardAppFlag = useSelector(state => { return state.boardAppFlag.data });

    const [appFlag, setAppFlag] = useState();
    const [modal, setModal] = useState(false); // 핸드폰 인증 완료
    const [modal2, setModal2] = useState(false); // 핸드폰 인증 실패
    const [modal3, setModal3] = useState(false); // 핸드폰 인증 이미 완료
    const [modal4, setModal4] = useState(false); // 취소
    const [modal5, setModal5] = useState(false); // 취소 확인
    const [modal6, setModal6] = useState(false); // 임시 저장
    const [modal7, setModal7] = useState(false); // 폰 넘버 갯수 11자이하
    const [modal8, setModal8] = useState(false); // 체험단 신청 완료
    const [modal9, setModal9] = useState(false); // 핸드폰 번호 중복
    const [selectItemModal, setSelectItemModal] = useState({
        open: false,
        itemName: '',
        itemCount: '',
        selectItem: '',
        selectCount: '',
    }); // 상품갯수 선택 모달
    
    const [info, setInfo] = useState( // post info
        {
            memberName: '',
            tel: '',
            address: '',
            addressDetails: '',
            experienceId: '',
            blog: '',
            insta: '',
            youtube: '',
        }
    );

    const dispatch = useDispatch();
    const [minutes, setMinutes] = useState(parseInt(3));
    const [seconds, setSeconds] = useState(parseInt(0));

    useEffect(()=>{
        const appFlag = async()=>{
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await axios({
                    method: 'get',
                    headers: { 
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                      },
                    url: 'https://momsnote.net/api/user/moreInfo',
                });
                setAppFlag(response.data.data);
            } catch (error) {

            }
        }
        appFlag();
    }, []);

    useEffect(()=>{
        const load = async() => {
            const async = await AsyncStorage.getItem('applicationFlag');
            dispatch(postBoardAppFlag({experienceId: Number(async)}));
            
            switch(true){
                case route.params == '신청 정보 불러오기': {
                    const asyncStorage = await AsyncStorage.getItem('application');
        
                    !asyncStorage ? '' : setInfo(JSON.parse(asyncStorage));
                } break;
                case typeof(route.params) == 'string': setInfo(prvState => ({...prvState, address: route.params})); break;
                default: !appFlag ? '' : setInfo(appFlag); break;
            }
        }
        load();
    }, [route, appFlag]);

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
            }
    }

    const certificate = () => {
        SMSNumber == SMSInputNumber ? (setModal(!modal), setSMSFlag(prevState => ({...prevState, open: false, flag: 1}))) : setModal2(!modal2);
        
    }

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
    const button = () => {
        switch(true){
            case SMSFlag.flag == 1 : return (<Text style={{fontWeight: '500'}} onPress={()=>(setSMSFlag(prevState => ({...prevState, open: false, flag: 0}), setInfo(prevState => ({...prevState, tel: ''}))))}>변경</Text>)
            case SMSFlag.open == true: return (<Text style={{fontWeight: '500'}}>재요청</Text>)
            case SMSFlag.open == false: return (<Text style={{fontWeight: '500'}}>인증요청</Text>)
        }
    }

    const check = async() => {
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/tel/check',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: {tel: info.tel}
            });
            setTelCheck(response.data);
        }catch(error){
        }
    }

    const submit = async() => {
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/application/regi',
                    headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: {
                    ...info, experienceId: experienceId, itemName: selectItemModal.itemName, itemAmount: selectItemModal.selectCount

                }
            });
            AsyncStorage.setItem('applicationFlag', `${info.experienceId}`);
            setModal8(!modal8);
        }catch(error){
        }
    }
    
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>신청 정보</Text>
                <TouchableOpacity style={styles.headerBox}><Icon name='close' size={20} onPress={()=>
                    info?.memberName == '' && info.tel == '' && info.blog == '' && info.youtube == '' && info.insta == '' &&
                    info?.address == '' && info.addressDetails == '' ? navigation.goBack() : setModal6(!modal6)
                }/>
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>이름</Text>
                    <TextInput style={styles.textBox} placeholder='이름 입력' value={info?.memberName} maxLength={8}
                        onChangeText={(e) => {
                            if(e !== '÷' && e.match(regExp) == null && e.match(regNumber) == null){
                                setInfo((prevState) => ({...prevState, memberName: e.replace(' ', '') }));
                            }
                        }}></TextInput>
                </View>
                <View style={[styles.mainBox, {marginBottom: SMSFlag.open ? 10 : 30}]}>

                    { SMSFlag.flag == 1 && SMSFlag.open == false ?
                    <View style={[styles.timerBox, {right: 70}]}>
                         <Check fill='#4CAF50'/>
                    </View> : ''}

                    <Text style={{fontSize: 16, fontWeight: '500'}}>연락처</Text>
                    <TextInput style={styles.textBox} placeholder='휴대폰 번호 입력(-제외)' value={info?.tel} keyboardType='number-pad' maxLength={11}
                         onChangeText={(e) => setInfo((prevState) => ({...prevState, tel: e}))}
                         onBlur={()=>check()}>
                    </TextInput>
                    <TouchableOpacity style={styles.certificateBox} onPress={()=>( info.tel.length < 11 ? setModal7(!modal7) : telCheck == 1 ? setModal9(!modal9) : sms('재요청'), setSMSFlag(prevState => ({...prevState, flag: 0})))}>
                        {button()}
                    </TouchableOpacity>
                </View>
                <View style={[styles.mainBox, {display: SMSFlag.open ? 'flex' : 'none'}]}>
                    <View style={styles.timerBox}>
                        <Text style={{color: '#0288D1', fontWeight: '500'}}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                    </View>
                    <TextInput style={[styles.textBox, {paddingLeft: SMSFlag.open ? 10 : 0}]} keyboardType='number-pad' placeholder='인증번호 입력'
                     onChangeText={(e)=>setSMSInputNumber(e)}></TextInput>

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
                    <Text style={{color: 'red', marginTop: 5, fontWeight: '500'}}>리뷰에 사용할 계정은 계정 아이디(네이버는 블로그 주소 아이디)을 입력해주세요.</Text>
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
                        <TouchableOpacity style={styles.textBox} activeOpacity={1} onPress={()=>navigation.navigate('주소 찾기')}>
                            {info?.address == '' ? <Text>주소 검색하기</Text>
                            : <Text>{info?.address}</Text>}
                        </TouchableOpacity>
                        <View style={styles.postBox}><ArrowRight fill={'black'}/></View>
                    </View>
                    <TextInput style={styles.textBox} placeholder='상세주소 입력' value={info?.addressDetails} onChangeText={(e) => setInfo((prevState) => ({ ...prevState, addressDetails: e }))}></TextInput>
                </View>
                
                {!route?.params?.itemName || route?.params?.itemName?.length == 0 ? '' : 
                <View>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>상품선택</Text>
                    <TouchableOpacity style={styles.inputBox} onPress={()=>setSelectItemModal({...selectItemModal, open: true, itemName: route?.params?.itemName, itemCount: route?.params?.itemAmount})}>
                        <Text style={{marginLeft: 10, color: '#A9B4B5', borderRadius: 20}}>{selectItemModal.selectItem == '' ? '상품을 선택해주세요.' : selectItemModal.selectItem}</Text>
                        <View style={{position: 'absolute', right: 10}}><ArrowBottom fill='black' /></View>
                    </TouchableOpacity>
                </View>}

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
                <View style={[styles.mainBox, {flexDirection: 'row', alignItems: 'center'}]}>
                    <TouchableOpacity style={{position: 'absolute', right: 15}} onPress={()=> navigation.navigate('체험단 유의사항')}><ArrowRight fill={'#BDBDBD'}/></TouchableOpacity>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked[2]}
                        onValueChange={()=>change(2)}
                        color={isChecked[2] ? '#FEB401' : undefined}/>
                    <Text style={{color: '#EF1E1E', fontWeight: '600'}}>[필독] 캠페인 유의사항 및 제 3자 제공에 동의합니다.</Text>
                </View>
                <View style={[styles.mainBox, {alignItems: 'center'}]}>
                    {(info.memberName.trim() == '' || info.tel.trim() == '' || info.address.trim() == '' || info.addressDetails.trim() == '' ||
                    (info.blog == '' && info.youtube == '' && info.insta == '') || SMSFlag.flag == 0 || !isChecked[0])
                    ?
                    <View style={styles.buttonBox}><Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>체험단 신청</Text></View>
                    : <TouchableOpacity style={[styles.buttonBox, {backgroundColor: '#FEA100'}]} onPress={submit}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>체험단 신청</Text>
                     </TouchableOpacity>}
                </View>
            </View>
        </View>
      );

  return boardAppFlag == '' || !info ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>  : (

    <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                    <StatusBar />
            </SafeAreaView>
            <SafeAreaView style={styles.container}>

            <Modal modal={modal} setModal={setModal}/>
            <Modal2 modal2={modal2} setModal2={setModal2} />
            <Modal3 modal3={modal3} setModal3={setModal3} />
            <Modal4 navigation={navigation} modal4={modal4} setModal4={setModal4} />
            <Modal5 modal5={modal5} setModal5={setModal5} />
            <Modal6 navigation={navigation} modal6={modal6} setModal6={setModal6} info={info} />
            <Modal7 modal7={modal7} setModal7={setModal7} />
            <Modal8 navigation={navigation} modal={modal8} setModal={setModal8} />
            <Modal9 modal={modal9} setModal={setModal9} />
            {!route?.params?.itemName || route?.params?.itemName?.length == 0 ? '' :<SelectItem modal={selectItemModal} setModal={setSelectItemModal}/>}
            

            <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
            </FlatList>
        </SafeAreaView>

</SafeAreaProvider>
    
  )
}

export default Withdraw