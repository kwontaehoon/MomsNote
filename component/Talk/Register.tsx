import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getStatusBarHeight } from "react-native-status-bar-height"

const styles = StyleSheet.create({
    container:{
        marginTop: getStatusBarHeight(),
        borderWidth: 2,
        height: '89%',
    },
    header:{
        height: '10%',
        borderWidth: 1,
        flexDirection: 'row',
    },
    headerBox:{
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header2:{
        height: '8%',
        backgroundColor: '#FEECB3',
        flexDirection: 'row',
    },
    header2Box:{
        width: '75%',
        padding: 5,
        flexDirection: 'row'
    },
    profileBox:{
        borderWidth: 1,
        width: '17%',
        borderRadius: 999,
    },
    infoBox:{
        width: '83%',
        justifyContent: 'center',
        paddingLeft: 8,
    },
    header2Box2:{
        width: '25%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main:{
        height: '16%',
        borderWidth: 1,
        flexDirection: 'row',
    },
    mainBox:{
        borderWidth: 1,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraBox:{
        borderWidth: 1,
        borderColor: 'grey',
        width: '70%',
        height: '70%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainBox2:{
        borderWidth: 1,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main2:{
        height: '10%',
        flexDirection: 'row',
    },
    main2Box:{
        width: '85%',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    main2Box2:{
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main3:{
        height: '56%',
        borderWidth: 1,
    },
    main3TitleBox:{
        borderWidth: 1,
        height: '20%',
    },
    main3ContentBox:{
        borderWidth: 1,
        height: '80%',
    },

})
const Register = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={[styles.headerBox, {width: '20%'}]}><Text>취소</Text></View>
            <View style={[styles.headerBox, {width: '60%'}]}><Text style={{fontSize: 25}}>맘스톡 등록</Text></View>
            <View style={[styles.headerBox, {width: '20%'}]}><Text>완료</Text></View>
        </View>
        <View style={styles.header2}>
            <View style={styles.header2Box}>
                <View style={styles.profileBox}></View>
                <View style={styles.infoBox}><Text style={{fontSize: 20, fontWeight : 'bold'}}>별똥이맘</Text></View>
            </View>
            <View style={styles.header2Box2}>
                <View><Text>임신 몇주차</Text></View>
            </View>
        </View>
        <View style={styles.main}>
            <View style={styles.mainBox}>
                <View style={styles.cameraBox}>
                    <Icon name='camera' size={20} />
                    <Text>0/8</Text>
                </View>
            </View>
            <View style={styles.mainBox2}>
                <Text>이미지 파일은 최대 7개,  동영상 파일은 최대 1개까지 등록이 가능합니다.</Text>
            </View>
        </View>
        <View style={styles.main2}>
            <View style={styles.main2Box}><Text>카테고리 선택</Text></View>
            <View style={styles.main2Box2}><Icon name='user' size={20}/></View>
        </View>
        <SafeAreaView style={styles.main3}>
            <TextInput style={styles.main3TitleBox} ></TextInput>
            <TextInput style={styles.main3ContentBox}></TextInput>
        </SafeAreaView>
    </View>
  )
}

export default Register