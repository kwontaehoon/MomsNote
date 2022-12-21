import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Checkbox from 'expo-checkbox'
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Calendar from '../../../public/assets/svg/Calendar.svg'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    container2:{
        padding: 15
    },
    header:{
        height: 30,
    },
    main:{
        height: 150,
    },
    textBox:{
        borderBottomWidth: 2,
        borderColor: '#EEEEEE',
        padding: 10,
    },
    main2:{
        height: 120,
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
        flexDirection: 'row',
    },
    main5Box2Sub:{
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
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

    // console.log('AsyncStorage: ', AsyncStorage.getItem());

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    console.log('route: ', route.params[0]);
    console.log('route: ', route.params[1]);

    const [isChecked, setChecked] = useState(Array.from({length: 4}, ()=>{return false})); // check box
    const [bottomColor, setBottomColor] = useState(Array.from({length: 4}, ()=>{return false})); // bottom color

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState({
        username: `${route.params[0]}_${route.params[1]}`,
        nickname: '',
        email: '',
        dueDate: '',
        babyName: '',
        provider: `${route.params[0]}`,
        providerId: `${route.params[1]}`,
        marketingFlag: '1'
    })
    console.log('info: ', info);

    const submit = async() => {
        await axios.post(`http://momsnote.net/signup`, {
            info: info
        })
    }

    const onChange = (event, selectedDate) => {

        const Year = selectedDate.getFullYear();
        const Month = selectedDate.getMonth()+1;
        const Date = selectedDate.getDate();

        setShow(false);
        setInfo((prevState) => ({ ...prevState, dueDate: `${Year}-${Month}-${Date}`}))
      };
    
    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
          setShow(true);
          // for iOS, add a button that closes the picker
        }
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
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}></View>
            <View style={styles.main}>
                <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>닉네임</Text>
                <Text style={{color: '#757575', marginBottom: 20}}>8글자 이내로 입력해주세요.(특수문자 제외)</Text>
                    <TextInput placeholder='닉네임 입력' style={[styles.textBox, {borderColor: bottomColor[0] ? '#FEB401' : '#EEEEEE'}]}
                    onFocus={()=>change(0)} onChangeText={(e) => setInfo((prevState) => ({ ...prevState, nickname: e}))}></TextInput>
            </View>
            <View style={styles.main2}>
                <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>이메일</Text>
                <TextInput placeholder='이메일 입력' style={[styles.textBox, {borderColor: bottomColor[1] ? '#FEB401' : '#EEEEEE'}]}
                onFocus={()=>change(1)} onChangeText={(e) => setInfo((prevState) => ({ ...prevState, email: e}))}></TextInput>
            </View>
            <View style={styles.main3}>
                <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>출산 예정일</Text>
                <View>
                    <TextInput placeholder='날짜 선택' style={[styles.textBox, {borderColor: bottomColor[2] ? '#FEB401' : '#EEEEEE'}]} editable={false}
                        onFocus={showDatepicker} value={info.dueDate}>
                    </TextInput>
                    <View style={styles.main3Box}><Calendar onPress={showDatepicker}/></View>
                </View>
            </View>
            <View style={styles.main4}>
                <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>태명</Text>
                <Text style={{color: '#757575', marginBottom: 20}}>8글자 이내로 입력해주세요.(특수문자 제외)</Text>
                <TextInput placeholder='태명 입력' style={[styles.textBox, {borderColor: bottomColor[3] ? '#FEB401' : '#EEEEEE'}]}
                onFocus={()=>change(3)} onChangeText={(e) => setInfo((prevState) => ({ ...prevState, babyName: e}))}></TextInput>
            </View>
            <View style={styles.main5}>
                <View style={styles.main5Box}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked[0]}
                        onValueChange={()=>change2(0)}
                        color={isChecked[0] ? '#FEB401' : undefined}/>
                    <Text>이용악관 전체동의</Text>
                </View>
                <View style={styles.main5Box2}>
                    <View style={styles.main5Box2Sub}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked[1]}
                            onValueChange={()=>change2(1)}
                            color={isChecked[1] ? '#FEB401' : undefined}/>
                        <Text>맘스노트 이용악관 동의(필수)</Text>
                    </View>
                    <View style={[styles.main5Box2Sub, {justifyContent: 'flex-end', paddingRight: 10, width: '10%'}]}><Icon name='angle-right' size={15} /></View>
                </View>
                <View style={styles.main5Box2}>
                    <View style={styles.main5Box2Sub}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked[2]}
                            onValueChange={()=>change2(2)}
                            color={isChecked[2] ? '#FEB401' : undefined}/>
                        <Text>개인정보 수집 이용 동의(필수)</Text>
                    </View>
                    <View style={[styles.main5Box2Sub, {justifyContent: 'flex-end', paddingRight: 10, width: '10%'}]}><Icon name='angle-right' size={15} /></View>
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
                    <View style={[styles.main5Box2Sub, {justifyContent: 'flex-end', paddingRight: 10, width: '10%'}]}><Icon name='angle-right' size={15} /></View>
                </View>
            </View>
            <View style={styles.footer}>
                {(isChecked[1] && isChecked[2]) || isChecked[0] ? <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#FEA100'}]} onPress={submit}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>완료</Text>
                </TouchableOpacity> : <View style={[styles.footerBox, {backgroundColor: '#E0E0E0'}]}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>완료</Text></View>}
            </View>
        </View>
      );

  return (
    <View style={styles.container}>
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