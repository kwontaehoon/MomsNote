import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Checkbox from 'expo-checkbox'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: 'white',
        position: 'relative'
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
        width: '50%',
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
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEA100',
        borderRadius: 3,
    }
})
const AddPage = () => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const [isChecked, setChecked] = useState(Array.from({length: 4}, ()=>{return false})); // check box
    const [bottomColor, setBottomColor] = useState(Array.from({length: 4}, ()=>{return false})); // bottom color
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

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
                    onFocus={()=>change(0)}></TextInput>
            </View>
            <View style={styles.main2}>
                <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>이메일</Text>
                <TextInput placeholder='이메일 입력' style={[styles.textBox, {borderColor: bottomColor[1] ? '#FEB401' : '#EEEEEE'}]}
                onFocus={()=>change(1)}></TextInput>
            </View>
            <View style={styles.main3}>
                <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>출산 예정일</Text>
                <View>
                    <TextInput placeholder='날짜 선택' style={[styles.textBox, {borderColor: bottomColor[2] ? '#FEB401' : '#EEEEEE'}]}
                    onFocus={()=>change(2)}></TextInput>
                    <View style={styles.main3Box}><Icon name='calendar' size={17} /></View>
                </View>
            </View>
            <View style={styles.main4}>
                <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>태명</Text>
                <Text style={{color: '#757575', marginBottom: 20}}>8글자 이내로 입력해주세요.(특수문자 제외)</Text>
                <TextInput placeholder='태명 입력' style={[styles.textBox, {borderColor: bottomColor[3] ? '#FEB401' : '#EEEEEE'}]}
                onFocus={()=>change(3)}></TextInput>
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
                    <View style={[styles.main5Box2Sub, {justifyContent: 'flex-end', paddingRight: 10}]}><Icon name='angle-right' size={15} /></View>
                </View>
                <View style={styles.main5Box2}>
                    <View style={styles.main5Box2Sub}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked[2]}
                            onValueChange={()=>change2(2)}
                            color={isChecked[2] ? '#FEB401' : undefined}/>
                        <Text>맘스노트 이용악관 동의(필수)</Text>
                    </View>
                    <View style={[styles.main5Box2Sub, {justifyContent: 'flex-end', paddingRight: 10}]}><Icon name='angle-right' size={15} /></View>
                </View>
                <View style={styles.main5Box2}>
                    <View style={styles.main5Box2Sub}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked[3]}
                            onValueChange={()=>change2(3)}
                            color={isChecked[3] ? '#FEB401' : undefined}/>
                        <Text>맘스노트 이용악관 동의(필수)</Text>
                    </View>
                    <View style={[styles.main5Box2Sub, {justifyContent: 'flex-end', paddingRight: 10}]}><Icon name='angle-right' size={15} /></View>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerBox}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>완료</Text>
                </View>
            </View>
        </View>
      );

  return (
    <View style={styles.container}>
       <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id}>
        </FlatList>
    </View>
  )
}

export default AddPage