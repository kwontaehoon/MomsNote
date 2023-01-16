import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Animated } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import moment from 'moment'

import Back from '../../../../public/assets/svg/Back.svg'
import More from '../../../../public/assets/svg/More.svg'
import Share from '../../../../public/assets/svg/Share.svg'

const styles = StyleSheet.create({
    container:{
        height: '96%',
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
    },
    header:{
        height: 60,
        justifyContent: 'center',
        padding: 20,
    },
    headerBar:{
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    header2:{
        flexDirection: 'row',
        height: 70,
        alignItems: 'flex-end',
        paddingLeft: 20,
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
    },
    profileBox:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
    },
    infoBox:{
        height: 42,
        marginLeft: 7,
    },
    main:{
    },
    mainBox:{
        height: 70,
        padding: 20,
    },
    mainBox2:{
        padding: 20,
    },
    mainBox2ImageBox:{
        height: 400,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainBox2ImageBox2:{
        height: 150,
        flexDirection: 'row',
        padding: 10,
    },
    image:{
        width: '95%',
        height: '95%',
        borderRadius: 4,
    },
    image2:{
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
    imageBox:{
        width: '31%',
        height: 114,
        borderRadius: 4,
        margin: 5,
    },
    mainBox3:{
        height: 50,
        flexDirection: 'row',
        borderColor: '#F5F5F5',
        borderBottomWidth: 1,
    },
})
const Talk1Sub = ({navigation, route}) => {

    const info = [route.params];
    console.log('info: ', info);

    const date = new Date();
    console.log('date: ', date);

    const ImageBox = () => {

        switch(info[0].savedName.split('|').length){
            case 1: return(
                <TouchableOpacity style={styles.mainBox2ImageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                    <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image}/>
                </TouchableOpacity>
            )
            case 2: return(
                <View style={styles.mainBox2ImageBox2}>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[1]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                </View>
            )
            case 3: return(
                <View style={styles.mainBox2ImageBox2}>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <View style={styles.imageBox}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[1]}`}} style={styles.image2}/>
                    </View>
                    <View style={styles.imageBox}>
                        <Image source={{uri: `https://reactnative.dev/img/tiny_logo.png`}} style={styles.image2}/>
                    </View>
                </View>
            )
            default: return(
                <View style={styles.mainBox2ImageBox2}>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리')}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <View style={styles.imageBox}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[1]}`}} style={styles.image2}/>
                    </View>
                    <View style={styles.imageBox}>
                        <Image source={{uri: `https://reactnative.dev/img/tiny_logo.png`}} style={styles.image2}/>
                        <View style={{position: 'absolute', top: '40%', left: '40%'}}><Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>+{info[0].savedName.split('|').length-3}</Text></View>
                    </View>
                </View>
            )
        }
    }

    const renderItem = ({ item }) => (
        <View>
            <View style={styles.header}>
                <Back onPress={()=>navigation.goBack()}/>
                <View style={styles.headerBar}>
                    <Share style={{marginRight: 12}}/>
                    <More />
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 3}}>{item.title}</Text>
                    <Text>일정: {moment(item.boardDate).format("YY.MM.DD")}</Text>
                </View>
                <View style={styles.mainBox2}>
                    <Text style={{lineHeight: 20}}>{item.contents}</Text>
                </View>
                {item.savedName === null ? '' : ImageBox()}
            </View>
        </View>
      );


  return (
    <View style={styles.container}>
        <FlatList data={info} renderItem={renderItem}
            keyExtractor={item => item.id}>
        </FlatList>
    </View>
  )
}

export default Talk1Sub