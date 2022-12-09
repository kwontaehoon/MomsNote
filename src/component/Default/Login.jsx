import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Slick from 'react-native-slick'
import { getStatusBarHeight } from "react-native-status-bar-height"
import { WithLocalSvg } from "react-native-svg"
import kakao from '../../../public/assets/svg/kakao.svg'
import apple from '../../../public/assets/svg/apple.svg'
import google from '../../../public/assets/svg/google.svg'
import Logo from '../../../public/assets/svg/Logo.svg'


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
        padding: 20,
    },
    header:{
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer:{
        height: '30%',
        alignItems: 'center',
    },
    footerBox:{
        width: '90%',
        height: 52,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: '#EEEEEE',
        borderWidth: 1, 
    },
    iconBox:{
        position: 'absolute',
        left: 0,
        width: 52,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const Main = () => {

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <WithLocalSvg width={230} height={112} asset={Logo}/>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#FEE500'}]}>
                <View style={styles.iconBox}><WithLocalSvg width={22} height={20} asset={kakao}/></View>
                <Text style={{color: '#212121', fontWeight: '400'}}>카카오톡으로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#FFFFFF'}]}>
                <View style={styles.iconBox}><WithLocalSvg width={22} height={20} asset={google}/></View>
                <Text style={{color: '#212121', fontWeight: '400'}}>Google로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#000000'}]}>
                <View style={styles.iconBox}><WithLocalSvg width={22} height={20} asset={apple}/></View>
                <Text style={{color: 'white', fontWeight: '400'}}>Apple로 시작하기</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Main