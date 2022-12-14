import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import Checkbox from 'expo-checkbox'
import axios from 'axios'

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
        justifyContent: 'center'
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
    }


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

    const [isChecked, setChecked] = useState(Array.from({length: 3}, ()=>{return false})); // check box
    console.log('isChecked: ', isChecked);
    const [info, setInfo] = useState( // post info
        {
            name: '',
            phoneNumber: '',
            blogUrl: '',
            instaUrl: '',
            youtubeUrl: '',
            address: '',
        }
    );
    console.log('info: ', info);


    const submit = async() => {
        await axios.post(`http://192.168.1.140:4000/post/test`, {
            info: info
        })
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
    
    
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>신청 정보</Text>
                <View style={styles.headerBox}><Icon name='close' size={20} onPress={()=>navigation.goBack()}/></View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>이름</Text>
                    <TextInput style={styles.textBox} placeholder='이름 입력'
                        onChangeText={(e) => setInfo((prevState) => ({
                            ...prevState, name: e
                        }))}></TextInput>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>연락처</Text>
                    <TextInput style={styles.textBox} placeholder='휴대폰 번호 입력(-제외)'
                         onChangeText={(e) => setInfo((prevState) => ({
                            ...prevState, phoneNumber: e
                        }))}></TextInput>
                    <View style={styles.certificateBox}><Text style={{fontWeight: '500'}}>인증요청</Text></View>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>SNS 계정</Text>
                    <Text style={{color: '#757575', marginTop: 5}}>리뷰에 사용할 계정을 하나 이상 입력해주세요.</Text>
                    <TextInput style={styles.textBox} placeholder='네이버 블로그'
                        onChangeText={(e) => setInfo((prevState) => ({
                            ...prevState, blogUrl: e
                        }))}></TextInput>
                    <TextInput style={styles.textBox} placeholder='인스타그램'
                        onChangeText={(e) => setInfo((prevState) => ({
                            ...prevState, instaUrl: e
                        }))}></TextInput>
                    <TextInput style={styles.textBox} placeholder='유튜브'
                        onChangeText={(e) => setInfo((prevState) => ({
                            ...prevState, youtubeUrl: e
                        }))}></TextInput>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>배송지</Text>
                    <View>
                        <View style={styles.textBox}>
                            {address === undefined ? <Text>주소 검색하기</Text> : <Text>{address}</Text>}
                        </View>
                        <View style={styles.postBox}><Icon name='right' size={15} onPress={()=>navigation.navigate('주소 찾기')}/></View>
                    </View>
                    <TextInput style={styles.textBox} placeholder='상세주소 입력'></TextInput>
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
                    <View style={styles.buttonBox}><Text style={{fontSize: 18, color: 'white'}}>체험단 신청</Text></View>
                </View>
            </View>
        </View>
      );

  return (
    <View style={styles.container}>
       <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} showsHorizontalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Withdraw