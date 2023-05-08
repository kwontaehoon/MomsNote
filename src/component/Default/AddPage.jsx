import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native'
import Checkbox from 'expo-checkbox'
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import Modal from './Modal/Calendar'
import Modal2 from './Modal/Calendar2'
import Calendar from '../../../public/assets/svg/Calendar.svg'
import ArrowRight from '../../../public/assets/svg/Arrow-Right.svg'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    container2:{
        padding: 15
    },
    main:{
        height: 170,
    },
    textBox:{
        borderBottomWidth: 2,
        borderColor: '#EEEEEE',
        padding: 10,
        justifyContent: 'center',
    },
    emailcon:{
        position: 'absolute',
        right: 15,
        borderRadius: 999,
        backgroundColor: '#FEB401'
    },
    main3:{
        height: 120,
    },
    main3Box:{
        position: 'absolute',
        right: 0,
        width: 50,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 888,
    },
    main4:{
        height: 170,
    },
    main5:{
        height: 200,
    },
    main5Box:{
        width: '100%',
        height: '34%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#F5F5F5',
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 8,
        borderRadius: 3,
        borderColor: '#E0E0E0',
      },
    main5Box2:{
        width: '100%',
        height: '20%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    main5Box2Sub:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowBox:{
        position: 'absolute',
        right: 10,
        borderRadius: 20

        
    },
    footer:{
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    footerBox:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    }
})
const AddPage = ({navigation, route}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const [isChecked, setChecked] = useState(Array.from({length: 4}, ()=>{return false})); // check box
    const [bottomColor, setBottomColor] = useState(Array.from({length: 4}, ()=>{return false})); // bottom color
    const [marketingFlag, setMarketingFlag] = useState({
        marketingFlag: 0
    });
    const [nickNameCheck, setNickNameCheck] = useState(null); // 닉네임 중복 체크

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState({
        username: `${route.params[0]}_${route.params[1]}`,
        nickname: '',
        email: route.params[2],
        dueDate: '',
        babyName: '',
        provider: `${route.params[0]}`,
        providerId: typeof(route.params[1]) == 'number' ? `${route.params[1]}` : route.params[1],
    });

    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);

    const submit = async() => {
        const result = {...info, ...marketingFlag};
        console.log('result: ', result);

        AsyncStorage.setItem('user', JSON.stringify(info));

        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/signup',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: result
            });
            const decoded = jwtDecode(response.data.token);
            AsyncStorage.setItem('userId', String(decoded.id));
            AsyncStorage.setItem('token', response.data.token);

            try{
                const response2 = await axios({
                    method: 'get',
                    headers: { 
                      'Authorization': `bearer ${response.data.token}`, 
                      'Content-Type': 'application/json'
                    },
                    url: 'https://momsnote.net/api/main/data',
                });

                AsyncStorage.setItem('user', JSON.stringify(response2.data.data));
                navigation.reset({routes: [{name: "main"}]});

                }catch(error){
                    console.log('user axios error: ', error);
                    return undefined;
                }
            }catch(error){
                console.log('회원가입 error:', error);
            }
    }

    const onChange = (event, selectedDate) => {

        const Year = selectedDate.getFullYear();
        let Month = selectedDate.getMonth()+1;
        Month < 10 ? Month = `0${String(Month)}` : '';
        let Date = selectedDate.getDate();
        Date < 10 ? Date = `0${String(Date)}` : '';

        switch(true){
            case moment(selectedDate).diff(moment(), 'day') > 280: setShow(false); setModal(!modal); break;
            case moment(selectedDate).diff(moment(), 'day') < 0: setShow(false); setModal2(!modal2); break;
            default: setShow(false); setInfo((prevState) => ({ ...prevState, dueDate: `${Year}-${Month}-${Date}`}));
        }
      };
    
    const showMode = (currentMode) => {
        if (Platform.OS === 'ios') {
          setShow(true);
          // for iOS, add a button that closes the picker
        }else setShow(true);

        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };

    const change = (e) => { // 텍스트 밑줄 색상 변경
        let arr = Array.from({length: 4}, ()=>{return false});
        arr[e] = true;
        setBottomColor(arr);
    }
    const change2 = (e) => { // check box 색상 변경
        let arr = [...isChecked];

        switch(true){
            case e === 0 && arr[e] === false: arr = Array.from({length: 4}, ()=>{return true}); setChecked(arr); break;
            case e === 0 &&  arr[e] === true: arr = Array.from({length: 4}, ()=>{return false}); setChecked(arr); break;
            case e !== 0: arr[0] = false; arr[e] = !arr[e]; setChecked(arr); break;
        }
        if(arr[1] === true && arr[2] === true && arr[3] === true){
            arr = Array.from({length: 4}, ()=>{return true});
            setChecked(arr);
        }

        e == 3 && isChecked[3] ? setMarketingFlag(prevState => ({...prevState, marketingFlag: 0})) : setMarketingFlag(prevState => ({...prevState, marketingFlag: 1}));
    }
    const check = async(e) => {
        try{
            const response = await axios({
                method: 'post',
                headers: { 
                    'Content-Type': 'application/json'
                  },
                url: 'https://momsnote.net/api/nickname/check',
                data: {nickname: e}
            });
            setNickNameCheck(response.data);
            }catch(error){
                console.log('check error: ', error);
                return undefined;
            }
        }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.main}>
                <View style={{position: 'absolute', bottom: 0, height: 50, display: nickNameCheck == 1 ? 'flex' : 'none'}}>
                    <Text style={{paddingLeft: 5, color: 'red'}}>중복된 닉네임 입니다.</Text>
                </View>
                <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>닉네임</Text>
                    <Text style={{color: '#757575', marginBottom: 20}}>8글자 이내로 입력해주세요.</Text>
                    <View>
                        <TextInput placeholder='닉네임 입력' style={[styles.textBox, {borderColor: nickNameCheck == 1 ? 'red' : bottomColor[0] ? '#FEB401' : '#EEEEEE'}]} maxLength={8}
                            onFocus={()=>change(0)}
                            value={info.nickname}
                            onChangeText={(e)=>{
                                check(e);
                                setInfo(prevState => ({...prevState, nickname: e.replace(' ', '')}));
                            }}
                            onBlur={()=>check()}>
                        </TextInput>
                    </View>
            </View>
            <View style={styles.main3}>
                <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>출산 예정일</Text>
                <View>
                    <TextInput placeholder='날짜 선택' style={[styles.textBox, {borderColor: bottomColor[2] ? '#FEB401' : '#EEEEEE'}]} editable={false}
                        onFocus={showDatepicker} value={info.dueDate}>
                    </TextInput>
                    <TouchableOpacity onPress={showDatepicker} style={styles.main3Box}><Calendar /></TouchableOpacity>
                </View>
            </View>
            <View style={styles.main4}>
                <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>태명</Text>
                <Text style={{color: '#757575', marginBottom: 20}}>8글자 이내로 입력해주세요.</Text>
                    <TextInput placeholder='태명 입력' style={[styles.textBox, {borderColor: bottomColor[3] ? '#FEB401' : '#EEEEEE'}]} maxLength={8}
                    value={info.babyName}
                    onFocus={()=>change(3)}
                    onChangeText={(e) => { setInfo((prevState) => ({ ...prevState, babyName: e})); }}>
                    </TextInput>
            </View>
            <View style={styles.main5}>
                <View style={styles.main5Box}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked[0]}
                        onValueChange={()=>change2(0)}
                        color={isChecked[0] ? '#FEB401' : undefined}/>
                    <Text style={{fontWeight: '600', fontSize: 16}}>이용악관 전체동의</Text>
                </View>
                <View style={styles.main5Box2}>
                    <TouchableOpacity style={styles.arrowBox} onPress={()=>navigation.navigate('이용약관')}><ArrowRight fill={'#BDBDBD'}/></TouchableOpacity>
                    <View style={styles.main5Box2Sub}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked[1]}
                            onValueChange={()=>change2(1)}
                            color={isChecked[1] ? '#FEB401' : undefined}/>
                        <Text>맘스노트 이용악관 동의(필수)</Text>
                    </View>
                </View>
                <View style={styles.main5Box2}>
                    <TouchableOpacity style={styles.arrowBox} onPress={()=>navigation.navigate('개인정보처리방침')}><ArrowRight fill={'#BDBDBD'}/></TouchableOpacity>
                    <View style={styles.main5Box2Sub}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked[2]}
                            onValueChange={()=>change2(2)}
                            color={isChecked[2] ? '#FEB401' : undefined}/>
                        <Text>개인정보 수집 이용 동의(필수)</Text>
                    </View>
                </View>
                <View style={styles.main5Box2}>
                    <View style={styles.main5Box2Sub}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked[3]}
                            onValueChange={()=>change2(3)}
                            color={isChecked[3] ? '#FEB401' : undefined}/>
                        <Text>마케팅정보 메일, SNS 수신동의(선택)</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
            {(isChecked[1] && isChecked[2] && info.nickname !== '' && info.babyName !== '' && info.dueDate !== '' && nickNameCheck == 0)
                ?
                <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#FEA100'}]} onPress={submit}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>완료</Text>
                </TouchableOpacity> : <View style={[styles.footerBox, {backgroundColor: '#E0E0E0'}]}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>완료</Text></View>}
            </View>
        </View>
      );

  return route.params == undefined ? <View></View> : (
    <View style={styles.container}>

        <Modal modal={modal} setModal={setModal} show={show} setShow={setShow}/>
        <Modal2 modal={modal2} setModal={setModal2} show={show} setShow={setShow} />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
       <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default AddPage