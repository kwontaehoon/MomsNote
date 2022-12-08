import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '91%',
        backgroundColor: 'white',
    },
    container2:{

    },
    main:{
        height: 620,
        padding: 20,
        paddingTop: 40,
    },
    mainBox:{
        height: 150,
    },
    textBox:{
        borderBottomWidth: 2,
        borderColor: '#EEEEEE',
        padding: 10,
    },
    mainBox2:{
        height: 120,
    },
    mainBox3:{
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
    mainBox4:{
        height: 130,
    },
    mainBox5:{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitBox:{
        borderBottomWidth: 1,
        borderColor: '#757575',
    },

    footer:{
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
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


const Talk1 = ({navigation}: any) => {

    const [isChecked, setChecked] = useState(Array.from({length: 4}, ()=>{return false})); // check box
    const [bottomColor, setBottomColor] = useState(Array.from({length: 4}, ()=>{return false})); // bottom color

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        }
    ];

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
                        onFocus={()=>change(0)}></TextInput>
                </View>
                <View style={styles.mainBox2}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>이메일</Text>
                    <TextInput placeholder='이메일 입력' style={[styles.textBox, {borderColor: bottomColor[1] ? '#FEB401' : '#EEEEEE'}]}
                    onFocus={()=>change(1)}></TextInput>
                </View>
                <View style={styles.mainBox3}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>출산 예정일</Text>
                    <View>
                        <TextInput placeholder='날짜 선택' style={[styles.textBox, {borderColor: bottomColor[2] ? '#FEB401' : '#EEEEEE'}]}
                        onFocus={()=>change(2)}></TextInput>
                        <View style={styles.main3Box}><Icon name='calendar' size={17} /></View>
                    </View>
                </View>
                <View style={styles.mainBox4}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>태명</Text>
                    <Text style={{color: '#757575', marginBottom: 20}}>8글자 이내로 입력해주세요.(특수문자 제외)</Text>
                    <TextInput placeholder='태명 입력' style={[styles.textBox, {borderColor: bottomColor[3] ? '#FEB401' : '#EEEEEE'}]}
                    onFocus={()=>change(3)}></TextInput>
                </View>
                <View style={styles.mainBox5}>
                    <View style={styles.exitBox}><Text style={{color: '#757575'}} onPress={()=>navigation.navigate('회원탈퇴')}>회원탈퇴</Text></View>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerBox}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>적용</Text>
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

export default Talk1