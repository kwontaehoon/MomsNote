import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    header:{
        height: '10%',
        flexDirection: 'row'
    },
    headerBox:{
        width: '50%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    main:{
        height: '40%',
        borderWidth: 1,
        padding: 10,
    },
    main2:{
        height: '40%',
        borderWidth: 1,
        padding: 10,
    }
})
const InquiryDetail = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={[styles.headerBox, {paddingLeft: 10}]}>
                <Text style={{color: '#757575'}}>대기중</Text>
            </View>
            <View style={[styles.headerBox, {paddingRight: 10, alignItems: 'flex-end'}]}>
                <Text style={{color: '#9E9E9E'}}>2022.11.01 14:00</Text>
            </View>
        </View>
        <View style={styles.main}>
            <View><Text>문의 제목입니다.</Text></View>
            <View><Text>문의 내용입니다.</Text></View>
        </View>

        <View style={styles.header}>
            <View style={[styles.headerBox, {paddingLeft: 10}]}>
                <Text style={{color: '#757575'}}>대기중</Text>
            </View>
            <View style={[styles.headerBox, {paddingRight: 10, alignItems: 'flex-end'}]}>
                <Text style={{color: '#9E9E9E'}}>2022.11.01 14:00</Text>
            </View>
        </View>
        <View style={styles.main}>
            <View><Text>문의 제목입니다.</Text></View>
            <View><Text>문의 내용입니다.</Text></View>
        </View>
    </View>
  )
}

export default InquiryDetail