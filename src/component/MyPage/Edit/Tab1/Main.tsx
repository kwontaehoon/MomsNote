import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios'

import Calendar from '../../../../../public/assets/svg/Calendar.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
    },
    container2:{

    },
    main:{
        padding: 20,
        paddingTop: 40,
    },
    mainBox:{
        height: 140,
    },
    textBox:{
        borderBottomWidth: 2,
        borderColor: '#EEEEEE',
        padding: 10,
    },
    mainBox2:{
        height: 100,
    },
    mainBox3:{
        height: 100,
    },
    main3Box:{
        position: 'absolute',
        right: 0,
        width: 50,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainBox4:{
        height: 130,
    },
    mainBox5:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitBox:{
        borderBottomWidth: 1,
        borderColor: '#757575',
    },
    footer:{
        alignItems: 'center',
    },
    footerBox:{
        width: '90%',
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEA100',
        borderRadius: 4,
    }
})


const Talk1 = ({navigation, application}: any) => {

    console.log('application : ', application);

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        }
    ];

    const [info, setInfo] = useState({
        username: '',
        nickname: '',
        email: '',
        dueDate: '',
        babyName: '',
        provider: '',
        providerId: '',
    });
    console.log('내 정보 수정 info: ', info);

    const [bottomColor, setBottomColor] = useState(Array.from({length: 4}, ()=>{return false})); // bottom color

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(()=>{
        const userInfo = async() => {
            const user = await AsyncStorage.getItem('user');
            const a = JSON.parse(user);
            console.log('a: ', a);
            setInfo(JSON.parse(user));
        }
        userInfo();
    }, []);

    const submit = async() => {

        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({ 
                  method: 'post',
                  url: 'https://momsnote.net/api/account/update',
                  headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                  data: {
                    nickname: `${info.nickname}`,
                    dueDate: `${info.dueDate}`,
                    babyName: `${info.babyName}`
                  }
                });
                console.log('response: ', response.data);
                await AsyncStorage.setItem('user', JSON.stringify(info));
            }catch(error){
              console.log('댓글 작성 error: ', error);
            }
    }

    const onChange = (event, selectedDate) => {

        const Year = selectedDate.getFullYear();
        let Month = selectedDate.getMonth()+1;
        Month < 10 ? Month = `0${String(Month)}` : '';
        let Date = selectedDate.getDate();
        Date < 10 ? Month = `0${String(Date)}` : '';

        setShow(false);
        setInfo((prevState) => ({ ...prevState, dueDate: `${Year}-${Month}-${Date}`}));

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
    
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>닉네임</Text>
                    <Text style={{color: '#757575', marginBottom: 20}}>8글자 이내로 입력해주세요.(특수문자 제외)</Text>
                        <TextInput placeholder='닉네임 입력' style={[styles.textBox, {borderColor: bottomColor[0] ? '#FEB401' : '#EEEEEE'}]}
                        value={info.nickname} onFocus={()=>change(0)}
                        onChangeText={(e) => {
                            let regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$÷×￦%&\'\"\\\(\=]/gi;
                            regExp.test(e) ? (e = e.substring(0, e.length - 1), setInfo((prevState) => ({ ...prevState, nickname: e}))) : setInfo((prevState) => ({ ...prevState, nickname: e}));
                        }}></TextInput>
                </View>
                <View style={styles.mainBox2}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>이메일</Text>
                    <TextInput placeholder='이메일 입력' style={[styles.textBox, {borderColor: bottomColor[1] ? '#FEB401' : '#EEEEEE'}]}
                    value={info.email} onFocus={()=>change(1)} onChangeText={(e) => setInfo((prevState) => ({ ...prevState, email: e}))}></TextInput>
                </View>
                <View style={styles.mainBox3}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>출산 예정일</Text>
                    <View>
                        <TextInput placeholder='날짜 선택' style={[styles.textBox, {borderColor: bottomColor[2] ? '#FEB401' : '#EEEEEE'}]} editable={false}
                        value={info.dueDate} onFocus={()=>change(2)}></TextInput>
                        <TouchableOpacity style={styles.main3Box} onPress={showDatepicker}><Calendar /></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.mainBox4}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>태명</Text>
                    <Text style={{color: '#757575', marginBottom: 20}}>8글자 이내로 입력해주세요.(특수문자 제외)</Text>
                    <TextInput placeholder='태명 입력' style={[styles.textBox, {borderColor: bottomColor[3] ? '#FEB401' : '#EEEEEE'}]}
                    value={info.babyName} onFocus={()=>change(3)}
                    onChangeText={(e) => {
                        let regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$÷×￦%&\'\"\\\(\=]/gi;
                        regExp.test(e) ? (e = e.substring(0, e.length - 1), setInfo((prevState) => ({ ...prevState, babyName: e}))) : setInfo((prevState) => ({ ...prevState, babyName: e}));
                    }}></TextInput>
                </View>
                <View style={styles.mainBox5}>
                    <View style={styles.exitBox}><Text style={{color: '#757575'}} onPress={()=>navigation.navigate('회원탈퇴')}>회원탈퇴</Text></View>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBox} onPress={submit}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>적용</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

  return (
    <View style={[styles.container, {height: application == null ? '100%' : '90.5%'}]}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
       <FlatList data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}>
        </FlatList>
     </View>
  )
}

export default Talk1