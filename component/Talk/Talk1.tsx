import React from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop: getStatusBarHeight(),
        borderWidth: 2,
    },
    header:{
        height: '12%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerBox:{
        position: 'absolute',
        right: 0,
        height: '100%',
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox:{
        borderWidth: 1,
        width: '33.3%',
        height: 40,
    },
    main:{
        borderWidth: 1,
        height: '88%',
    }
})
const Talk1 = () => {

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.headerBox}>
            <View style={styles.iconBox}></View>
            <View style={styles.iconBox}></View>
            <View style={styles.iconBox}></View>
        </View>
            <View>
                <Text>맘스 톡</Text>
            </View>
        </View>
        <View style={styles.main}>
            <View></View>
        </View>
    </View>
  )
}

export default Talk1