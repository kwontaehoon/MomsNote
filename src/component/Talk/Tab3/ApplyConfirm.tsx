import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Check from '.././../../../public/assets/svg/Check.svg'

import {
    SafeAreaProvider,
  } from 'react-native-safe-area-context';


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
    mainBox2:{
        borderWidth: 1,
    },
    textBox:{
        marginTop: 10,
        height: 52,
        paddingLeft: 10,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5'
    },
    certificateBox:{
        position: 'absolute',
        right: 15,
        bottom: 15,
    },
    buttonBox:{
        width: '90%',
        height: 56,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
})
const Withdraw = ({navigation}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const [SMSFlag, setSMSFlag] = useState({
        open: false,
        flag: 0 // 이미 인증했는지 검증
    }); // 본인인증 확인유무
    
    const submit = async() => {
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/application/delete',
                headers: { 
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {}
            });
        }catch(error){
            console.log('체험단 신청 취소 error: ', error);
        }
    }
    
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>신청 정보</Text>
                <TouchableOpacity style={styles.headerBox}>
                    <Icon name='close' size={20} onPress={()=> navigation.goBack()}/>
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>이름</Text>
                    <View style={styles.textBox}><Text>이름입력</Text></View>
                </View>
                <View style={[styles.mainBox, {marginBottom: SMSFlag.open ? 10 : 30}]}>

                    <Text style={{fontSize: 16, fontWeight: '500'}}>연락처</Text>
                    <View style={styles.textBox}>
                        <Text>연락처 입력</Text>
                    </View>
                    <TouchableOpacity style={styles.certificateBox}>
                        <Check fill={'green'}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>SNS 계정</Text>
                    <Text style={{color: '#757575', marginTop: 5}}>리뷰에 사용할 계정을 하나 이상 입력해주세요.</Text>
                    <View style={styles.textBox}><Text>블로그 입력</Text></View>
                    <View style={styles.textBox}><Text>인스타 입력</Text></View>
                    <View style={styles.textBox}><Text>유튜브 입력</Text></View>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>배송지</Text>
                    <View>
                        <View style={styles.textBox}><Text>주소 입력</Text></View>
                    </View>
                    <View style={styles.textBox}><Text>상세주소 입력</Text></View>
                </View>
                
                <View style={[styles.mainBox, {alignItems: 'center'}]}>
                    <View style={styles.buttonBox}><Text style={{fontSize: 18}}>신청 취소</Text></View>
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
        </SafeAreaView>

</SafeAreaProvider>
    
  )
}

export default Withdraw