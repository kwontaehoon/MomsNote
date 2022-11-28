import React from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: 'white',
        position: 'relative'
    },
    header:{
        height: '3%',
        padding: 15,
    },
    main:{
        height: '20%',
        padding: 15,
    },
    main2:{
        height: '20%',
        padding: 15,
    },
    main3:{
        height: '20%',
        padding: 15,
    },
    main4:{
        height: '20%',
        padding: 15,
    },
    main5:{
        height: '3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer:{
        height: '8%',
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
       
    },
    footerBox:{
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEA100',
    }
})
const InquiryDetail = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.main}>
            <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>닉네임</Text>
            <Text style={{color: '#757575', marginBottom: 20}}>8글자 이내로 입력해주세요.(특수문자 제외)</Text>
            <TextInput placeholder='이름' style={{borderBottomWidth: 1, borderColor: '#757575', padding: 5}}></TextInput>
        </View>
        <View style={styles.main2}>
            <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>이메일</Text>
            <Text style={{color: '#757575', marginBottom: 20}}>이메일 정보는 변경이 불가합니다.</Text>
            <TextInput style={{backgroundColor: '#EEEEEE', padding: 5}}></TextInput>
        </View>
        <View style={styles.main3}>
            <Text style={{fontWeight: 'bold', marginBottom: 20, fontSize: 16}}>출산 예정일</Text>
            <TextInput style={{borderBottomWidth: 1, borderColor: '#757575', padding: 5}}></TextInput>
        </View>
        <View style={styles.main4}>
            <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 16}}>태명</Text>
            <Text style={{color: '#757575', marginBottom: 20}}>8글자 이내로 입력해주세요.(특수문자 제외)</Text>
            <TextInput placeholder='태명' style={{borderBottomWidth: 1, borderColor: '#757575', padding: 5}}></TextInput>
        </View>
        <View style={styles.main5}>
            <TouchableOpacity style={{borderBottomWidth: 1}}><Text>회원탈퇴</Text></TouchableOpacity>
        </View>
        <View style={styles.footer}>
            <View style={styles.footerBox}><Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>적용</Text></View>
        </View>
    </View>
  )
}

export default InquiryDetail